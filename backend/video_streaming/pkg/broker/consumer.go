package broker

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/izveigor/TRUE-TECH-HACK/pkg/config"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/pb"
	"github.com/segmentio/kafka-go"
	"google.golang.org/protobuf/proto"
)

var reader *kafka.Reader

func InitReader(kafkaBrokerUrls []string, clientId string, topic string) (r *kafka.Reader, err error) {
	fmt.Println(topic)
	config := kafka.ReaderConfig{
		Brokers:         kafkaBrokerUrls,
		Topic:           topic,
		MinBytes:        10e3,
		MaxBytes:        10e6,
		MaxWait:         1 * time.Second,
		ReadLagInterval: -1,
	}

	r = kafka.NewReader(config)
	reader = r
	return r, nil
}

func SaveSegment(filename string, content []byte) {
	var pathToFile string = filepath.Join(config.Config.VideoDirectory, filename)
	fmt.Println(pathToFile)
	if _, err := os.Stat(pathToFile); errors.Is(err, os.ErrNotExist) {
		err := ioutil.WriteFile(pathToFile, content, 0644)
		fmt.Println("!!!")
		if err != nil {
			panic(err)
		}
	}
}

func Listen() {
	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatal("error while receiving message: %s", err.Error())
			continue
		}

		key := string(m.Key)
		fmt.Println(key)
		value := m.Value

		if err != nil {
			log.Fatal("error while receiving message: %s", err.Error())
			continue
		}

		fmt.Printf("message at topic/partition/offset %v/%v/%v: %s\n", m.Topic, m.Partition, m.Offset, string(value))

		fmt.Println("QWEQE")
		switch key {
		case "SegmentResponse":
			var result pb.SegmentResponse
			err := proto.Unmarshal(value, &result)
			if err != nil {
				log.Fatal("error: cannot deserialize data")
			}
			SaveSegment(result.GetFilename(), result.GetSegment())
		case "VideoMetadataResponse":
			var result pb.VideoMetadataResponse
			err := proto.Unmarshal(value, &result)
			if err != nil {
				log.Fatal("error: cannot deserialize data")
			}
			SaveSegment(result.GetFilename(), result.GetVideoMetadata())
		default:
			continue
		}
	}
}
