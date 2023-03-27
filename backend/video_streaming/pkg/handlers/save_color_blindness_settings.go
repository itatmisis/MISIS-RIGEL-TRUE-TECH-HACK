package handlers

import "net/http"

type ColorBlindnessSettings struct {
	ColorBlindnessType string  `json:"color_blindness_type"`
	Degree             float64 `json:"degree"`
}

func save_color_blindness_settings(c *gin.Context) {
	c.IndentedJSON(http.StatusOK)
}
