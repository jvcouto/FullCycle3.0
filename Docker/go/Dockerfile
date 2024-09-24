FROM golang:1.23 AS builder

WORKDIR /app

RUN go mod init example/hello

COPY ./hello.go .
RUN go build -v ./...

CMD ["app"]


FROM scratch
COPY --from=builder /app/hello .
CMD ["./hello"]



