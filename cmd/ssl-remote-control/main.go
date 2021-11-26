package main

import (
	"flag"
	"github.com/RoboCup-SSL/ssl-remote-control/internal/rcon"
	"github.com/RoboCup-SSL/ssl-remote-control/internal/server"
	"github.com/RoboCup-SSL/ssl-remote-control/internal/sslnet"
	"github.com/gobuffalo/packr"
	"log"
	"net/http"
)

var address = flag.String("address", ":8083", "The address on which the UI and API is served, default: :8083")
var refereeAddress = flag.String("refereeAddress", "224.5.23.1:10003", "The multicast address of the referee (GC), default: 224.5.23.1:10003")
var remoteControlAddress = flag.String("remoteControlAddress", "localhost:10011", "Address to connect to")
var autoDetectHost = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var team = flag.String("team", "YELLOW", "The team to control, either YELLOW or BLUE")

func main() {
	flag.Parse()

	privateKey := rcon.LoadPrivateKey(*privateKeyLocation)

	c := rcon.NewClient(*team, privateKey)
	s := server.NewServer(c)
	c.ReplyConsumer = s.Publish

	if *autoDetectHost {
		go detectHostAndRun(c)
	} else {
		c.Start(*remoteControlAddress)
	}

	setupUi()

	// serve the bidirectional web socket
	http.HandleFunc("/api/control", s.WsHandler)

	if err := http.ListenAndServe(*address, nil); err != nil {
		log.Fatal(err)
	}
}

func detectHostAndRun(c *rcon.Client) {
	log.Print("Trying to detect host based on incoming referee messages...")
	if host, err := sslnet.DetectHost(*refereeAddress); err != nil {
		log.Fatal("Failed to detect host: ", err)
	} else {
		log.Print("Detected game-controller host: ", host)
		detectedAddress := sslnet.GetConnectionString(*remoteControlAddress, host)
		c.Start(detectedAddress)
	}
}

func setupUi() {
	box := packr.NewBox("../../dist")
	http.Handle("/", http.FileServer(box))
	if box.Has("index.html") {
		log.Printf("UI is available at http://%v", *address)
	} else {
		log.Print("Backend-only version started. Run the UI separately or get a binary that has the UI included")
	}
}
