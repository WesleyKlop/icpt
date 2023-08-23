package main

import (
	"flag"
	"log/slog"
	"os"
	"sync"
	"sync/atomic"
)

var amount = flag.Int("amount", 42, "how high to count")

func init() {
	flag.Parse()
	if amount == nil {
		slog.Error("Invalid amount given")
		os.Exit(1)
	}
}

func main() {
	counter := atomic.Int32{}

	wg := sync.WaitGroup{}
	wg.Add(*amount)
	for i := 0; i < *amount; i++ {
		go func() {
			counter.Add(1)
			wg.Done()
		}()
	}

	wg.Wait()
	slog.Info("Done!", "count", counter.Load())
}
