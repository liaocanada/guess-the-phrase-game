package main

import (
    "fmt"
    "log"
	"os"
	"io/ioutil"
    "net/http"
	s "strings"
	"regexp"
)

func phrase(w http.ResponseWriter, r *http.Request) {
	printerFactsUrl := "http://" + os.Getenv("COMP4000PORT_SERVICE_HOST") + ":" + os.Getenv("COMP4000PORT_SERVICE_PORT") + "/printerfacts";
	resp, err := http.Get(printerFactsUrl);
	if err != nil {
		fmt.Fprintf(w, "Error getting printer facts: %v", err);
		return;
	}

	defer resp.Body.Close();
	bodyBytes, err := ioutil.ReadAll(resp.Body);
	if err != nil {
		fmt.Fprintf(w, "Error getting printer facts: %v", err);
		return;
	}

	phrase := processPhrase(string(bodyBytes))

    fmt.Fprint(w, phrase);
}

func processPhrase(phrase string) string {
	phrase = (s.Split(phrase, ": ")[1]);
	phrase = (s.Split(phrase, ".")[0]);

	nonLetterSpace := regexp.MustCompile(`[^a-zA-Z ]`);
	phrase = nonLetterSpace.ReplaceAllString(phrase, "");
	return phrase;
}

func main() {
    http.HandleFunc("/phrase", phrase);
    http.Handle("/", http.FileServer(http.Dir("./public")));
    log.Fatal(http.ListenAndServe(":8080", nil));
}
