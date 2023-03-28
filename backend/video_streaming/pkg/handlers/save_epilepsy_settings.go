package handlers

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/izveigor/TRUE-TECH-HACK/pkg/postgres"
)

type EpilepsySettings struct {
	HaveEpilepsy bool `json:"have_epilepsy"`
}

func SaveEpilepsySettings(c *gin.Context) {
	var token string = strings.Split(c.Request.Header.Get("Authorization"), ":")[1]
	var newEpilepsySettings EpilepsySettings
	if err := c.BindJSON(&newEpilepsySettings); err != nil {
		return
	}

	postgres.UpdateEpilepsySettings(token, newEpilepsySettings.HaveEpilepsy)
	c.Writer.WriteHeader(200)
}
