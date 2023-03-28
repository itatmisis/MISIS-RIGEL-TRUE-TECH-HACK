package postgres

func UpdateColorBlindnessSettings(UUID string, ColorBlindnessType string, Degree float64) {
	Instance.Model(&Settings{}).Where("UUID = ?", UUID).Updates(map[string]interface{}{"ColorBlindnessType": ColorBlindnessType, "Degree": Degree})
}

func UpdateEpilepsySettings(UUID string, HaveEpilepsy bool) {
	Instance.Model(&Settings{}).Where("UUID = ?", UUID).Update("HaveEpilepsy", HaveEpilepsy)
}

func CreateSettings(settings *Settings) {
	Instance.Create(&settings)
}

func UUIDExists(UUID string) bool {
	var exists bool
	err := Instance.Model(&Settings{}).Where("UUID = ?", UUID).Find(&exists)
	if err != nil {
		return false
	}
	return exists
}

func GetSettings(UUID string) Settings {
	var result Settings
	Instance.Model(&Settings{UUID: UUID}).First(&result)
	return result
}
