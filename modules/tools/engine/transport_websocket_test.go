package engine

import (
	"fmt"
	_ "github.com/golang/glog"
	"github.com/gorilla/websocket"
	. "github.com/onsi/ginkgo"
	"net"
	"net/http"
	"net/http/httptest"
	"net/url"
	"time"
)

func __websocket_client(urlstr string) error {

	u, err := url.Parse(urlstr)
	if err != nil {
		return err
	}

	fmt.Printf("connect to host %s\n", u.Host)

	netConn, err := net.Dial("tcp", u.Host)
	if err != nil {
		return err
	}

	defer netConn.Close()

	headers := map[string][]string{
		"Accept-Encoding": {"gzip, deflate"},
		"Accept-Language": {"en-us"},
		"Connection":      {"keep-alive"},
	}

	wsConn, _, err := websocket.NewClient(netConn, u, headers, 1024, 1024)
	if err != nil {
		return err
	}

	for i := 0; i < 10; i++ {
		time.Sleep(30)
		if err := wsConn.WriteMessage(websocket.TextMessage, []byte("sdfsdfsdfs")); err != nil {
			return err
		} else {
			fmt.Printf("write count %d\n", i)
		}
	}

	return wsConn.Close()
}

type _websocket_example_handler struct {
}

func (t _websocket_example_handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//ServeHTTP(ResponseWriter, *Request)
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}

	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	go func() {
		time.Sleep(100)

		if err := wsConn.Close(); err != nil {
			fmt.Printf("close error %s", err.Error())
			return
		}
	}()

	for i := 0; i < 11; i++ {
		fmt.Printf("begin read count %d\n", i)
		_, _, err := wsConn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		} else {
			fmt.Printf("read count %d\n", i)
		}
	}
}

func _tWebsocketClose() {
	server := httptest.NewServer(_websocket_example_handler{})
	defer server.Close()

	fmt.Println("listen on ", server.URL)

	if err := __websocket_client(server.URL); err != nil {
		Fail(err.Error())
	}
}

var _ = Describe("transport", func() {
	Describe("websocket", func() {
		It("close", _tWebsocketClose)
	})
})
