package main

func Map[T any, R any](list []T, fn func(item T) R) []R {
	out := make([]R, len(list))
	for idx, val := range list {
		out[idx] = fn(val)
	}
	return out
}

func main() {

}
