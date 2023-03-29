package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/broker"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/config"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/handlers"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/pb"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/postgres"
	"google.golang.org/protobuf/proto"
)

var (
	http_server  = config.Config.Host + ":" + strconv.Itoa(config.Config.HttpPort)
	hls_server   = config.Config.Host + ":" + strconv.Itoa(config.Config.HlsPort)
	kafka_server = config.Config.KafkaVideoHost + ":" + strconv.Itoa(config.Config.KafkaVideoPort)
)

func run_http_server() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(gin.Logger())
	router.POST(config.Config.Prefix+"/save_color_blindness_settings", handlers.SaveColorBlindnessSettings)
	router.POST(config.Config.Prefix+"/save_epilepsy_settings", handlers.SaveEpilepsySettings)
	router.Run(http_server)
}

func run_hls_server() {
	http.Handle("/", HLSMiddleware(http.FileServer(http.Dir("./"+config.Config.VideoDirectory))))
	fmt.Printf("Starting server on %v\n", config.Config.HlsPort)
	log.Printf("Serving %s on HTTP port: %v\n", config.Config.VideoDirectory, config.Config.HlsPort)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", config.Config.HlsPort), nil))
}

func GetColorBlindnessType(colorBlindness string) pb.ColorBlindnessType {
	var result pb.ColorBlindnessType
	switch colorBlindness {
	case "protanopia":
		result = pb.ColorBlindnessType_PROTANOPIA
	case "deuteranopia":
		result = pb.ColorBlindnessType_DEUTERANOPIA
	case "tritanopia":
		result = pb.ColorBlindnessType_TRITANOPIA
	}

	return result
}

func HLSMiddleware(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var token string = "1" // strings.Split(r.Header.Get("Authorization"), ":")[1]
		urls := strings.Split(r.URL.Path, "/")
		file := strings.Split(urls[len(urls)-1], ".")
		filename, extension := file[0], file[1]

		if extension == "ts" {
			filename_without_numbers, string_number := filename[:len(filename)-5], filename[len(filename)-4:]
			fmt.Println(":FFF:", filename_without_numbers, string_number)
			number, err := strconv.Atoi(string_number)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				return
			}

			settings := postgres.GetSettings(token)
			var taskType pb.TaskType
			var colorBlindnessType pb.ColorBlindnessType

			if settings.HaveEpilepsy && settings.ColorBlindnessType != "" {
				taskType = pb.TaskType_EPILEPSY_AND_COLOR_BLINDNESS
				colorBlindnessType = GetColorBlindnessType(settings.ColorBlindnessType)
			} else if settings.ColorBlindnessType != "" {
				taskType = pb.TaskType_COLOR_BLINDNESS
				colorBlindnessType = GetColorBlindnessType(settings.ColorBlindnessType)
			} else if settings.HaveEpilepsy {
				taskType = pb.TaskType_EPILEPSY
			} else {
				taskType = pb.TaskType_NOTHING
			}

			if settings.ColorBlindnessType != "" {
				buffer, err := proto.Marshal(&pb.SegmentRequest{
					Filename:           filename + "." + extension,
					Number:             int64(number),
					TaskType:           taskType,
					ColorBlindnessType: &colorBlindnessType,
				})
				if err != nil {
					w.WriteHeader(http.StatusBadRequest)
					return
				}
				go broker.Push(context.TODO(), "SegmentRequest", buffer)
			} else {
				buffer, err := proto.Marshal(&pb.SegmentRequest{
					Filename: filename + "." + extension,
					Number:   int64(number),
					TaskType: taskType,
				})
				if err != nil {
					w.WriteHeader(http.StatusBadRequest)
					return
				}
				go broker.Push(context.TODO(), "SegmentRequest", buffer)
			}
		} else if extension == "m3u8" {
			buffer, err := proto.Marshal(&pb.VideoMetadataRequest{
				Filename: filename + "." + extension,
			})
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			go broker.Push(context.TODO(), "VideoMetadataRequest", buffer)
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		h.ServeHTTP(w, r)
	}
}

func main() {
	if _, err := os.Stat(config.Config.VideoDirectory); errors.Is(err, os.ErrNotExist) {
		if err := os.Mkdir(config.Config.VideoDirectory, os.ModePerm); err != nil {
			log.Fatal(err)
		}
	}

	postgres.Init()
	postgres.Migrate()
	broker.InitReader([]string{kafka_server}, config.Config.KafkaVideoGroupId, config.Config.KafkaVideoReceivingTopic)
	broker.InitWriter([]string{kafka_server}, config.Config.KafkaVideoGroupId, config.Config.KafkaVideoProcessingTopic)

	go broker.Listen()
	go run_http_server()
	go run_hls_server()

	for {
	}
}
