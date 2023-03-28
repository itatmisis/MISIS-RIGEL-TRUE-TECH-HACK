package postgres

import (
	"gorm.io/gorm"
)

type Settings struct {
	gorm.Model
	UUID               string `gorm:"primaryKey"`
	ColorBlindnessType string
	Degree             float64
	HaveEpilepsy       bool
}
