package rcon

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/pem"
	"google.golang.org/protobuf/proto"
	"io/ioutil"
	"log"
)

// LoadPrivateKey loads a private RSA key from the given location
func LoadPrivateKey(privateKeyLocation string) *rsa.PrivateKey {
	if privateKeyLocation != "" {
		privateKey := ReadPrivateKey(privateKeyLocation)
		if privateKey != nil {
			log.Print("Found private key")
			return privateKey
		} else {
			log.Print("No private key available")
		}
	}
	return nil
}

// ReadPrivateKey reads a private RSA key from the given location, exiting on errors
func ReadPrivateKey(privateKeyLocation string) *rsa.PrivateKey {
	b, err := ioutil.ReadFile(privateKeyLocation)
	if err != nil {
		log.Fatal("Could not find private key at ", privateKeyLocation)
	}
	p, _ := pem.Decode(b)
	if p.Type != "RSA PRIVATE KEY" {
		log.Fatal("Private key type is wrong: ", p.Type)
	}
	privateKey, err := x509.ParsePKCS1PrivateKey(p.Bytes)
	if err != nil {
		log.Fatal(err)
	}
	return privateKey
}

// Sign creates a signature of the given message with the given key
func Sign(privateKey *rsa.PrivateKey, message proto.Message) []byte {
	messageBytes, err := proto.Marshal(message)
	if err != nil {
		log.Fatal(err)
	}
	hash := sha256.New()
	hash.Write(messageBytes)
	d := hash.Sum(nil)
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, d)
	if err != nil {
		log.Fatal(err)
	}
	return signature
}
