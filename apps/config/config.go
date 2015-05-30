package config

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"log"
	"os"
	"path"
)

func loadConfig(result interface{}, confdir, filename string) error {
	var (
		content []byte
		err     error
	)
	filename = path.Join(confdir, filename)
	log.Printf("load config from file %s\n", filename)
	if content, err = ioutil.ReadFile(filename); err != nil {
		return err
	}

	if err = json.Unmarshal(content, result); err != nil {
		return err
	}
	return nil
}

func loadMultiConfig(result interface{}, config_directory string, suffix ...string) error {
	log.Printf("config directory: %s\n", config_directory)

	if err := loadConfig(result, config_directory, "config.json"); err != nil {
		return err
	}

	for _, x := range suffix {
		if err := loadConfig(result, config_directory, "config."+x+".json"); err != nil {
			return err
		}
	}

	if bytes, err := json.Marshal(result); err != nil {
		return err
	} else {
		log.Printf("current config: %s\n", string(bytes))
	}
	return nil
}

func LoadConfig(result interface{}, config_directory string, suffix ...string) error {
	var err error

	if len(config_directory) == 0 { //func arguments

		// command line or environment variable
		if config_directory = confdir; len(config_directory) == 0 {

			//current directory
			if config_directory, err = os.Getwd(); err != nil {
				return err
			}
		}
	}

	if len(suffix) > 0 { // func arguments
		return loadMultiConfig(result, config_directory, suffix...)
	}

	if len(product) == 0 { //command line or environment variable
		return loadMultiConfig(result, config_directory, product)
	}

	return loadMultiConfig(result, config_directory, product)
}

var (
	confdir string
	product string
)

func init() {
	if confdir = os.Getenv("confdir"); len(confdir) == 0 { // environment variable
		confdir = "./conf" //default value
	}

	if product = os.Getenv("product"); len(product) == 0 { // environment variable
		product = "unittest" //default value
	}

	flag.StringVar(&confdir, "config", confdir, "config directory")
	flag.StringVar(&confdir, "c", confdir, "config directory (shorthand)")

	flag.StringVar(&product, "product", product, "product environment")
	flag.StringVar(&product, "p", product, "product environment (shorthand)")
}

func ReadConfig(result interface{}) {
	log.Println("current config", confdir, product)
	if err := LoadConfig(result, ""); err != nil {
		panic(err)
	}
}
