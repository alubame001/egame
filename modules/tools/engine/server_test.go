package engine

import (
	"net/http"
	"testing"
)

func TestNewId(t *testing.T) {
	var (
		//engineIO EngineIO
		request http.Request
	)
	request.RemoteAddr = "178.1.2.3:123"
	if id, err := generateId(&request); err != nil {
		t.Error(err)
	} else {
		t.Log(id)
	}
}
