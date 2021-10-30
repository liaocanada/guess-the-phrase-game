package main

import (
    "fmt"
    "log"
	"os"
    "net/http"
)

func phrase(w http.ResponseWriter, r *http.Request) {
	printerFactsUrl := os.Getenv("COMP4000PORT_SERVICE_HOST") + ":" + os.Getenv("COMP4000PORT_SERVICE_PORT") + "/printerfacts";
	resp, err := http.Get(printerFactsUrl);
	if err != nil {
		fmt.Fprintf(w, "Error getting printer facts: %v", err);
		return;
	}

    fmt.Fprint(w, resp)
}

func main() {
    http.HandleFunc("/phrase", phrase);
    http.Handle("/", http.FileServer(http.Dir("./public")));
    log.Fatal(http.ListenAndServe(":8080", nil));
}
