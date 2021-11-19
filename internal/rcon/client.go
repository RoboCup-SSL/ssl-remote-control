package rcon

import (
	"bufio"
	"crypto/rsa"
	"github.com/RoboCup-SSL/ssl-remote-control/internal/sslnet"
	"github.com/pkg/errors"
	"log"
	"net"
	"sync"
	"time"
)

type Client struct {
	address       string
	team          string
	privateKey    *rsa.PrivateKey
	conn          net.Conn
	reader        *bufio.Reader
	token         string
	connected     bool
	active        bool
	ReplyConsumer func(*ControllerToRemoteControl)
	mutex         sync.Mutex
}

func NewClient(address string, team string, privateKey *rsa.PrivateKey) (c *Client) {
	c = new(Client)
	c.address = address
	c.team = team
	c.privateKey = privateKey
	c.ReplyConsumer = func(*ControllerToRemoteControl) {}
	return
}

func (c *Client) Start() {
	c.active = true
	go c.run()
}

func (c *Client) Stop() {
	c.active = false
	if err := c.conn.Close(); err != nil {
		log.Printf("Could not close connection: %v", err)
	}
}

func (c *Client) run() {
	for c.active {
		conn, err := net.Dial("tcp", c.address)
		if err != nil {
			log.Println("could not connect to game-controller at ", c.address)
			time.Sleep(1 * time.Second)
			continue
		}
		c.conn = conn
		c.reader = bufio.NewReaderSize(conn, 1)
		log.Printf("Connected to game-controller at %v", c.address)

		if err := c.register(); err != nil {
			log.Print("Failed to register: ", err)
			time.Sleep(1 * time.Second)
			continue
		}

		stateRequest := RemoteControlToController_GET_STATE
		for {
			reply, err := c.SendRequest(&RemoteControlToController{
				Msg: &RemoteControlToController_Request_{
					Request: stateRequest,
				},
			})
			if err != nil {
				log.Print("Failed to send request: ", err)
				break
			}
			c.ReplyConsumer(reply)
			time.Sleep(500 * time.Millisecond)
		}

		if err := c.conn.Close(); err != nil {
			log.Printf("Could not close connection: %v", err)
		}
		time.Sleep(1 * time.Second)
	}
}

func (c *Client) register() error {
	reply := ControllerToRemoteControl{}
	if err := sslnet.ReceiveMessage(c.reader, &reply); err != nil {
		return errors.Wrap(err, "Failed receiving controller reply")
	}
	if reply.GetControllerReply().NextToken == nil {
		return errors.New("Missing next token")
	}

	registration := RemoteControlRegistration{}
	registration.Team = new(Team)
	*registration.Team = Team(Team_value[c.team])
	if c.privateKey != nil {
		registration.Signature = &Signature{Token: reply.GetControllerReply().NextToken, Pkcs1V15: []byte{}}
		registration.Signature.Pkcs1V15 = Sign(c.privateKey, &registration)
	}
	log.Print("Sending registration")
	if err := sslnet.SendMessage(c.conn, &registration); err != nil {
		return errors.Wrap(err, "Failed sending registration")
	}
	log.Print("Sent registration, waiting for reply")
	reply = ControllerToRemoteControl{}
	if err := sslnet.ReceiveMessage(c.reader, &reply); err != nil {
		return errors.Wrap(err, "Failed receiving controller reply")
	}
	if reply.GetControllerReply().StatusCode == nil || *reply.GetControllerReply().StatusCode != ControllerReply_OK {
		reason := ""
		if reply.GetControllerReply().Reason != nil {
			reason = *reply.GetControllerReply().Reason
		}
		return errors.Errorf("Registration rejected: %s", reason)
	}
	log.Printf("Successfully registered as %v", c.team)
	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}
	return nil
}

func (c *Client) SendRequest(request *RemoteControlToController) (*ControllerToRemoteControl, error) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	if c.privateKey != nil {
		request.Signature = &Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = Sign(c.privateKey, request)
	}

	if err := sslnet.SendMessage(c.conn, request); err != nil {
		return nil, errors.Wrapf(err, "Failed sending request: %v", request)
	}

	reply := ControllerToRemoteControl{}
	if err := sslnet.ReceiveMessage(c.reader, &reply); err != nil {
		return nil, errors.Wrap(err, "Failed receiving controller reply")
	}

	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}

	return &reply, nil
}
