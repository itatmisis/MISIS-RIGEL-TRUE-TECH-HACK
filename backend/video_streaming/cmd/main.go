package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/config"
)

const http_server = config.Host + ":" + strconv.Itoa(config.HttpPort)
const hls_server = config.Host + ":" + strconv.Itoa(config.HlsPort)

func run_http_server() {
	router := gin.Default()
	router.POST(config.Prefix + "/save_color_blindness_settings")
	router.POST(config.Prefix + "/save_epilepsy_settings")
	router.Run(http_server)
}

func run_hls_server() {
	http.Handle("/", addHeaders(http.FileServer(http.Dir(config.VideoDirectory))))
	fmt.Printf("Starting server on %v\n", config.HlsPort)
	log.Printf("Serving %s on HTTP port: %v\n", config.VideoDirectory, config.HlsPort)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}

func addHeaders(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		h.ServeHTTP(w, r)
	}
}

func main() {
	go run_http_server()
	go run_hls_server()
}
