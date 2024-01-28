# Web Interface SSH (WISSH)
## How to Run
WISSH should be installed on a machine that can access the remote machine(s) you wish to connect to. WISSH will handle SSH session(s) from the machine it is installed on, allowing you to SSH through it from a web browser.

We recommend using Docker to run WISSH.
1. [Download Docker Desktop](https://docs.docker.com/get-docker/).
1. Open Docker Desktop.

You can use the [`docker compose`](https://docs.docker.com/compose/reference/) command to start and stop WISSH.
1. Open a command-line interpreter. You can use PowerShell on Windows and Terminal on macOS.
1. Navigate into the WISSH folder.
1. Run `docker compose up -d` to start WISSH.
1. Run `docker compose down` to stop WISSH.

You can also close Docker Desktop to stop WISSH.
