package main

import (
	"sync"

	"github.com/wesleyklop/icpt/go/v2/internal/pkg/input"
)

func main() {
	wg := sync.WaitGroup{}

	data := input.AskForInput()
	results := make(chan input.Result, 5)

	for _, inp := range data {
		wg.Add(1)
		go func(inp input.Input) {
			defer wg.Done()
			results <- inp.Validate()
		}(inp)
	}
	// Wait for the goroutines to finish, then close the channel and print the results
	wg.Wait()
	close(results)

	for result := range results {
		if result.Valid {
			println(result.Unit, "is valid")
		} else {
			println(result.Unit, "is invalid")
		}
	}
}
