package input

import "fmt"

func GetUserInput(message string) int {
	for {
		fmt.Print(message)
		var input int
		_, err := fmt.Scan(&input)
		if err == nil {
			return input
		}
		fmt.Println("Invalid input. Please enter a valid integer.")
	}
}
