package main

import (
	"flag"
	"github.com/golang/glog"
	"log"
	"net/http"
	//"os"
	. "tools/engine"
)

func onConnection(client *Client) {
	client.MessageCallback = func(c *Client, message []byte) {
		c.WriteString("pong")
	}
}

func main() {
	flag.Parse()
	glog.Info("Prepare to repel boarders")

	http.HandleFunc("/test/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	var engineIO EngineIO

	engineIO.Init(Config{
		PingTimeout:   60000,
		PingInterval:  5000,
		AllowUpgrades: true,
		Transports:    []string{"polling", "websocket"},
	}, onConnection)

	defer engineIO.Close()

	http.Handle("/engine.io/", &engineIO)

	var handler = http.StripPrefix("/public/", http.FileServer(http.Dir("./src/tools/engine/public")))
	http.Handle("/public/", handler)

	server := &http.Server{Addr: ":12345"}
	//server.ErrorLog = log.New(os.Stdout, "http", log.Lshortfile) //func New(out io.Writer, prefix string, flag int) *Logger

	if err := server.ListenAndServe(); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
