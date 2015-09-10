package engine

import (
	"bytes"
	"crypto/sha1"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

// 根据请求，生成唯一id
func generateId(r *http.Request) (string, error) {
	text := fmt.Sprintf("%s.%X", r.RemoteAddr, time.Now().UnixNano())
	hash := sha1.Sum([]byte(text))

	buf := bytes.NewBuffer(nil)
	encoder := base64.NewEncoder(base64.URLEncoding, buf)
	defer (func() {
		if err := encoder.Close(); err != nil {
			log.Printf("close encoding error", err)
		}
	})()

	if _, err := encoder.Write(hash[:]); err != nil {
		return "", err
	}
	return buf.String(), nil
}

func newLogger(prefix string) *log.Logger {
	return log.New(os.Stdout, prefix+" ", log.LstdFlags|log.Lshortfile)
}
