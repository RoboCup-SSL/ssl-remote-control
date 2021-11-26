package sslnet

import (
	"log"
	"net"
	"strings"
)

// DetectHost reads the network address from a multicast message by joining the given multicast group and waiting for
// some data before reading the source IP and returning it.
func DetectHost(address string) (string, error) {
	addr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		return "", err
	}
	conn, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		return "", err
	}
	defer func(conn *net.UDPConn) {
		err := conn.Close()
		if err != nil {
			log.Println("Could not close connection: ", err)
		}
	}(conn)
	_, udpAddr, err := conn.ReadFromUDP([]byte{0})
	if err != nil {
		return "", err
	}
	return udpAddr.IP.String(), nil
}

// GetConnectionString extracts the port from the given address and constructs a new connection string with the host
// The resulting format is "host:port".
func GetConnectionString(address string, host string) string {
	parts := strings.Split(address, ":")
	return host + ":" + parts[1]
}
