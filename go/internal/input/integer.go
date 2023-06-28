package input

import "fmt"

func GetUserInput(message string) int {
	for {
		fmt.Print(message)
		var input int
		if _, err := fmt.Scan(&input); err == nil {
			return input
		}
		fmt.Println("Invalid input. Please enter a valid integer.")
	}
}
