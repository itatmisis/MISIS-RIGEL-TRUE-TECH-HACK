package broker

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/config"
)

var Producer = kafka.NewProducer(&kafka.ConfigMap{
	"bootstrap.servers": config.VideoProcessingHost + ":" + config.VideoProcessingPort,
	"client.id":         socket.gethostname(),
	"acks":              "all",
})

func getMessage() {

}
