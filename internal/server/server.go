package server

import (
	"github.com/RoboCup-SSL/ssl-remote-control/internal/rcon"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/encoding/protojson"
	"log"
	"net/http"
)

type Server struct {
	connections []*ServerConnection
	rconClient  *rcon.Client
}

type ServerConnection struct {
	conn       *websocket.Conn
	marshaler  protojson.MarshalOptions
	rconClient *rcon.Client
}

func NewServer(rconClient *rcon.Client) (s *Server) {
	s = new(Server)
	s.connections = []*ServerConnection{}
	s.rconClient = rconClient
	return
}

// newServerConnection creates a new connection between server and UI client
func newServerConnection(rconClient *rcon.Client, conn *websocket.Conn) (s *ServerConnection) {
	s = new(ServerConnection)
	s.conn = conn
	s.marshaler.EmitUnpopulated = true
	s.rconClient = rconClient
	return
}

// Publish publishes the state to all connected clients
func (a *Server) Publish(state *rcon.ControllerToRemoteControl) {
	for _, serverConn := range a.connections {
		serverConn.publishState(state)
	}
}

// WsHandler handles incoming web socket connections
func (a *Server) WsHandler(w http.ResponseWriter, r *http.Request) {
	u := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(*http.Request) bool { return true },
	}

	conn, err := u.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	serverConn := newServerConnection(a.rconClient, conn)
	a.connections = append(a.connections, serverConn)
	defer a.disconnect(serverConn)
	log.Println("UI Client connected")

	a.listenForMessages(conn)
}

func (s *ServerConnection) publishState(state *rcon.ControllerToRemoteControl) {
	b, err := s.marshaler.Marshal(state)
	if err != nil {
		log.Println("Marshal error:", err)
	}

	err = s.conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Could not write message to api client:", err)
	}
}

func (a *Server) disconnect(conn *ServerConnection) {
	err := conn.conn.Close()
	if err != nil {
		log.Println("Could not disconnect from websocket conn: ", err)
	}
	for i, c := range a.connections {
		if c == conn {
			a.connections = append(a.connections[:i], a.connections[i+1:]...)
			break
		}
	}
	log.Println("UI Client disconnected")
}

func (a *Server) listenForMessages(conn *websocket.Conn) {
	for {
		messageType, b, err := conn.ReadMessage()
		if err != nil || messageType != websocket.TextMessage {
			log.Println("Could not read message: ", err)
			return
		}

		a.handleNewMessage(b)
	}
}

func (a *Server) handleNewMessage(b []byte) {
	in := &rcon.RemoteControlToController{}
	err := protojson.Unmarshal(b, in)
	if err != nil {
		log.Println("Could not read input:", string(b), err)
		return
	}

	reply, err := a.rconClient.SendRequest(in)
	if err != nil {
		log.Println("Failed to send request: ", err)
	}
	a.Publish(reply)
}
