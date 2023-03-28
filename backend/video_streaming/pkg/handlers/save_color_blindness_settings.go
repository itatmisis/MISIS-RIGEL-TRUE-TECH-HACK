package handlers

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/postgres"
)

type ColorBlindnessSettings struct {
	ColorBlindnessType string  `json:"color_blindness_type"`
	Degree             float64 `json:"degree"`
}

func SaveColorBlindnessSettings(c *gin.Context) {
	var token string = strings.Split(c.Request.Header.Get("Authorization"), ":")[1]
	var newColorBlindnessSettings ColorBlindnessSettings
	if err := c.BindJSON(&newColorBlindnessSettings); err != nil {
		return
	}

	postgres.UpdateColorBlindnessSettings(token, newColorBlindnessSettings.ColorBlindnessType, newColorBlindnessSettings.Degree)
	c.Writer.WriteHeader(200)
}
