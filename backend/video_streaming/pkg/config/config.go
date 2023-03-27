package config

import (
	"os"
	"strings"

	"github.com/spf13/viper"
)

type ConfigType struct {
	VideoReceivingTopic string `mapstructure:"VIDEO_RECEIVING_TOPIC"`
	VideoProcessingHost string `mapstructure:"VIDEO_PROCESSING_HOST"`
	VideoProcessingPort string `mapstructure:"VIDEO_PROCESSING_PORT"`

	PostgresHost     string `mapstructure:"POSTGRES_HOST"`
	PostgresPort     int    `mapstructure:"POSTGRES_PASSWORD"`
	PostgresPassword string `mapstructure:"POSTGRES_PASSWORD"`
	PostgresUser     string `mapstructure:"POSTGRES_USER"`
	PostgresDb       string `mapstructure:"POSTGRES_DB"`

	VideoDirectory string `mapstructure:"VIDEO_DIRECTORY"`
	Host           string `mapstructure:"HOST"`
	HttpPort       int    `mapstructure:"HTTP_PORT"`
	HlsPort        int    `mapstructure:"HLS_PORT"`
	Prefix         string `mapstructure:"PREFIX"`
}

func LoadConfig() (c *ConfigType) {
	if !strings.HasSuffix(os.Args[0], ".test") {
		viper.SetConfigName("prod")
		viper.AddConfigPath("./pkg/config/envs")
	} else {
		if !strings.HasSuffix(os.Args[0], "db.test") {
			viper.AddConfigPath("../../config/envs")
		} else {
			viper.AddConfigPath("../config/envs")
		}
		viper.SetConfigName("test")
	}

	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	if err := viper.Unmarshal(&c); err != nil {
		panic(err)
	}

	return
}

var Config *ConfigType = LoadConfig()
