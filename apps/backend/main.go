package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("debug line here")
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
    })

    http.ListenAndServe(":8080", nil)
}


// func tryThis() {
// 	// Simulate sending events (you can replace this with real data)
//     story := Story{ ID: 1, TargetLanguage: "hello world"}
// 	fmt.Println("debug line here")

//     jsonData, err := json.Marshal(story)

//     if err != nil {
// 		fmt.Println("Error marshalling JSON:", err)
// 		return
// 	}

//     fmt.Println(string(jsonData))
// }