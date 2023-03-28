package postgres

import (
	"fmt"
	"log"
	"strconv"

	"github.com/izveigor/TRUE-TECH-HACK/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Instance *gorm.DB
var dbError error

func Init() {
	Instance, dbError = gorm.Open(postgres.New(postgres.Config{
		DSN: fmt.Sprintf("postgres://%v:%v@%v:%v/%v?sslmode=disable",
			config.Config.PostgresUser,
			config.Config.PostgresPassword,
			config.Config.PostgresHost,
			strconv.Itoa(config.Config.PostgresPort),
			config.Config.PostgresDb),
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})

	if dbError != nil {
		panic("failed to connect database")
	}

	log.Println("Connected to Database!")
}

func Migrate() {
	Instance.AutoMigrate(&Settings{})
	log.Println("Database Migration Completed!")
}
