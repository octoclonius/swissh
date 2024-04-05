# Web Interface SSH (WISSH)

## How to Run
WISSH should be installed on a machine that can access the remote machines you wish to connect to. WISSH will handle SSH sessions from the machine it is installed on, allowing you to SSH through it from a web browser.

### Set up HTTPS
WISSH uses Node.js's HTTPS module for secure, encrypted communication. HTTPS requires a private key and the corresponding certificate. You may use a self-signed certificate to run WISSH. If you do not have a certificate, you can follow the instructions below.

#### On Windows
1. If you do not have OpenSSL installed, you can [download and build it from the source](https://github.com/openssl/openssl?tab=readme-ov-file#download), or install it with [Win32/Win64 OpenSSL](https://slproweb.com/products/Win32OpenSSL.html).
1. Add OpenSSL to your system PATH.
1. Open Command Prompt.
1. Navigate into the WISSH folder.
1. Run `mkdir ssl\certs ssl\private`
1. Run `openssl req -newkey rsa:4096 -noenc -keyout ssl\private\key.pem -x509 -days 365 -out ssl\certs\certificate.pem -subj "/CN=wissh"`

#### On macOS
1. Open Terminal.
1. If you do not have OpenSSL installed, you can install it with [Homebrew](https://brew.sh/). Run `brew install openssl`.
1. Navigate into the WISSH folder.
1. Run `mkdir -p ssl/{certs,private}`
1. Run `openssl req -newkey rsa:4096 -noenc -keyout ssl/private/key.pem -x509 -days 365 -out ssl/certs/certificate.pem -subj "/CN=wissh"`

### Open Docker Desktop
We recommend using Docker to run WISSH.
1. [Download Docker Desktop](https://docs.docker.com/get-docker/) if you do not already have it.
1. Open Docker Desktop.

### Running WISSH
You can use the [`docker compose`](https://docs.docker.com/compose/reference/) command to start and stop WISSH.
1. Navigate into the WISSH folder.
1. Run `docker compose up -d` to start WISSH.
1. Run `docker compose down` to stop WISSH.

You can also quit Docker Desktop to stop WISSH.

## How to Contribute
To contribute, please follow the general outline presented by GitHub: <https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project>.

### Dependencies
If you do not have Node.js v21, you can install it here: <https://nodejs.org/en/download>.

### Running Locally
WISSH can also be built and run on your local machine for development.

#### Development Build
To run the development build of WISSH:
1. Navigate into the WISSH folder.
1. Open `compose.yaml`. Under `services`, `backend` and `frontend`, `build`, make sure `target` is set to `dev`.
1. Navigate into the backend folder.
1. Run `npm install`.
1. Run `npm run dev`.
1. Navigate into the frontend folder.
1. Run `npm install`.
1. Run `npm start`.

#### Production Build
To run the production build of WISSH:
1. Navigate into the WISSH folder.
1. Open `compose.yaml`. Under `services`, `backend` and `frontend`, `build`, make sure `target` is set to `prod`.
1. Navigate into the backend folder.
1. Run `npm install`.
1. Run `node src/index.js`.
1. Navigate into the frontend folder.
1. Run `npm install`.
1. Run `npm run build`.
1. Run `npm install -g serve`.
1. Run `serve -s build --ssl-cert "../ssl/certs/certificate.pem" --ssl-key "../ssl/private/key.pem"`.

### Running WISSH on Docker
You can also use Docker to run WISSH for development.

1. Navigate into the WISSH folder.
1. Open `compose.yaml`. Under `services`, `backend` and `frontend`, `build`, make sure `target` is set to `dev`.
1. Run `docker compose up -d --build` to start WISSH.
