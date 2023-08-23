package main

import (
	"context"
	"log/slog"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	counter := 0

	deadline := time.After(11 * time.Second)
	ticker := time.NewTicker(2 * time.Second)
loop:
	for {
		select {
		case <-ctx.Done():
			slog.Info("Recv signal", "err", ctx.Err())
			break loop
		case <-ticker.C:
			counter++
			slog.Info("Tick", "count", counter)
		case <-deadline:
			slog.Warn("Deadline reached, abort")
			break loop
		}
	}

	slog.Info("Done", "count", counter)
}
