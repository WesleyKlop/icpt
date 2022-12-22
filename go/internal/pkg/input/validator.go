package input

type Result struct {
	Unit  string
	Valid bool
}

func ValidateYear(year int) bool {
	return year >= 0 && year <= 9999
}

func ValidateMonth(month int) bool {
	return month >= 1 && month <= 12
}

func isLeapYear(year int) bool {
	return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}

func ValidateDay(day int, month int, year int) bool {
	if day < 1 || day > 31 {
		return false
	}

	if month == 2 {
		if isLeapYear(year) {
			return day <= 29
		}

		return day <= 28
	}

	if month == 4 || month == 6 || month == 9 || month == 11 {
		return day <= 30
	}

	return true
}

func ValidateHour(hour int) bool {
	return hour >= 0 && hour <= 23
}

func ValidateMinute(minute int) bool {
	return minute >= 0 && minute <= 59
}
