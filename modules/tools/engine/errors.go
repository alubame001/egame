package engine

import (
	"encoding/json"
	"net/http"
)

const (
	_UNKNOWN_TRANSPORT    = 0
	_UNKNOWN_SID          = 1
	_BAD_HANDSHAKE_METHOD = 2
	_BAD_REQUEST          = 3
)

var (
	_MESSAGES = map[int]string{
		_UNKNOWN_TRANSPORT:    "Transport unknown",
		_UNKNOWN_SID:          "Session ID unknown",
		_BAD_HANDSHAKE_METHOD: "Bad handshake method",
		_BAD_REQUEST:          "Bad request",
	}
)

type errorCode struct {
	Id int
}

func (e *errorCode) Error() string {

	if message, ok := _MESSAGES[e.Id]; ok {
		return message
	}

	return "error: " + string(e.Id)
}

func NewErr(id int) error {
	return &errorCode{id}
}

func errorReply(w http.ResponseWriter, err error) {
	errorResult(w, err)
}

func errorResult(w http.ResponseWriter, err error) {
	var result map[string]interface{}

	switch inst := err.(type) {
	case *errorCode:
		result = map[string]interface{}{"code": inst.Id, "message": inst.Error()}
		break
	case error:
		result = map[string]interface{}{"code": -1, "message": inst.Error()}
		break
	}

	if bytes, err := json.Marshal(result); err != nil {
		http.Error(w, "json marshal error", http.StatusInternalServerError)
	} else {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(bytes)
	}
}
