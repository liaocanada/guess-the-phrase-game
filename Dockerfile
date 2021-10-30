FROM golang:1.16-alpine
EXPOSE 8080
COPY . .
RUN go build server.go -o ./server
CMD [ "./server" ]
