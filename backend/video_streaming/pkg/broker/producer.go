package broker

import (
	"context"
	"time"

	"github.com/segmentio/kafka-go"
)

var writer *kafka.Writer

func InitWriter(kafkaBrokerUrls []string, clientId string, topic string) (w *kafka.Writer, err error) {
	dialer := &kafka.Dialer{
		Timeout:  10 * time.Second,
		ClientID: clientId,
	}

	config := kafka.WriterConfig{
		Brokers:      kafkaBrokerUrls,
		Topic:        topic,
		Balancer:     &kafka.LeastBytes{},
		Dialer:       dialer,
		WriteTimeout: 10 * time.Second,
		ReadTimeout:  10 * time.Second,
	}
	w = kafka.NewWriter(config)
	writer = w
	return w, nil
}

func Push(parent context.Context, key string, value []byte) (err error) {
	message := kafka.Message{
		Key:   []byte(key),
		Value: value,
		Time:  time.Now(),
	}
	return writer.WriteMessages(parent, message)
}
