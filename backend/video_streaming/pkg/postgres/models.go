package main

import (
	"github.com/izveigor/TRUE-TECH-HACK/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Settings struct {
	gorm.Model
	UUID               string
	ColorBlindnessType string
	Degree             float64
	haveEpilepsy       bool
}

func init() *gorm.DB {
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "user=" + config.PostgresUser + "password=" + config.PostgresPassword + "dbname=" + config.PostgresDb + "port=" + config.PostgresPort + "sslmode=disable TimeZone=Asia/Shanghai",
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&Settings{})

	return db
}

var DB = init()

func update_color_blindness_settings() {
	DB.Model(&Settings).Updates(Settings{})
}

func update_epilepsy_settings() {

}
