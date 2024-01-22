# Web Interface SSH (WISSH)
## How to Run
We recommend using Docker to run WISSH.
1. Download Docker Desktop: <https://docs.docker.com/get-docker/>
1. Open Docker Desktop
You can use the `docker` and `docker compose` commands to run WISSH.
### `docker` Commands
#### Build
`docker build --target prod -t wissh-image .`
#### Run
`docker run --name wissh -d -p 80:8080 wissh-image`
#### Stop
`docker stop wissh`
#### Remove
`docker rm wissh`
### `docker compose` Commands
#### Build and Run
`docker compose up -d`
#### Stop and Remove
`docker compose down`
