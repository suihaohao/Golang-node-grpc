package main

import (
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"time"

	"context"
	pb "go-frontend/proto"
)
const (
	
	address    = "localhost:50053"
)

func main() {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Errorf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewSvgServiceClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	res, err := c.GetSvgCaptcha(ctx, &pb.GetSvgCaptchaReq{Ip:"192.168.1.5"})
	log.Println(res, err)
}
