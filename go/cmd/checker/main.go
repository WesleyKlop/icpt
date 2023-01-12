package main

import (
	"fmt"
	"sync"

	"github.com/wesleyklop/icpt/go/v2/internal/pkg/input"
)

func main() {
	data := input.AskForInput()
	results := make(chan input.Result, len(data))

	wg := sync.WaitGroup{}

	wg.Add(len(data))
	for _, inp := range data {
		go func(inp input.Input) {
			defer wg.Done()
			results <- inp.Validate()
		}(inp)
	}
	wg.Wait()

	close(results)

	for result := range results {
		if result.Valid {
			fmt.Println(result.Unit, "is valid")
		} else {
			fmt.Println(result.Unit, "is invalid")
		}
	}
}
