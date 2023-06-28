package main

import (
	"fmt"
)

func main() {
	size := 3
	noCopy := make([]*int, 0, size)
	withCopy := make([]*int, 0, size)

	for i := 0; i < size; i++ {
		cp := i
		noCopy = append(noCopy, &i)
		withCopy = append(withCopy, &cp)
	}
	fmt.Printf("Direct:  %v\n", noCopy)
	fmt.Printf("Copying: %v\n", withCopy)
}
