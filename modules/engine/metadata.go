package engine

import (
	"log"
	"os"
)

type Metadata struct {
	Id string

	_config Config
	_log    *log.Logger
}

func (t *Metadata) Init(id string, config Config) {
	t.Id = id
	t._config = config

	t._log = log.New(os.Stdout, "engine.client."+id+" ",
		log.LstdFlags|log.Lshortfile)
}
