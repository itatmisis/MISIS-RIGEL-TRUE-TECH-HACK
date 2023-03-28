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
	config := kafka.ReaderConfig{
		Brokers:         kafkaBrokerUrls,
		Topic:           topic,
		MinBytes:        10e3,
		MaxBytes:        57671680,
		MaxWait:         1 * time.Second,
		ReadLagInterval: -1,
	}

	r = kafka.NewReader(config)
	reader = r
	return r, nil
}

func SaveSegment(filename string, content []byte) {
	var pathToFile string = filepath.Join(config.Config.VideoDirectory, filename)
	if _, err := os.Stat(pathToFile); errors.Is(err, os.ErrNotExist) {
		err := ioutil.WriteFile(pathToFile, content, 0644)
		if err != nil {
			fmt.Println(err)
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

		value := m.Value

		if err != nil {
			log.Fatal("error while receiving message: %s", err.Error())
			continue
		}

		var result pb.Response
		err = proto.Unmarshal(value, &result)
		if err != nil {
			log.Fatal("error: cannot deserialize data")
		}
		SaveSegment(result.GetFilename(), result.GetVideo())
	}
}
