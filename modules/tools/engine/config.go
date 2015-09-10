package engine

import (
	"net/http"
	"time"
)

type Config struct {
	PingTimeout       time.Duration `json:"pingTimeout,omitempty"`
	PingInterval      time.Duration `json:"pingInterval,omitempty"`
	Transports        []string      `json:"transports,omitempty"`
	AllowUpgrades     bool          `json:"allowUpgrades,omitempty"`
	PerMessageDeflate bool          `json:"perMessageDeflate,omitempty"`
	HttpCompression   bool          `json:"httpCompression,omitempty"`
	MaxConnection     int
	AllowRequest      func(r *http.Request) error
	Cookie            string
	NewId             func(r *http.Request) string
}

// var (
// 	_gConfig Config
// )

// func init() {

// }
