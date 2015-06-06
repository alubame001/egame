package config

type _Db struct {
	Url string
	Driver string
}

type _Settings struct {
	Db map[string]_Db
}

var Settings _Settings
