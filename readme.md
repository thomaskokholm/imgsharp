# Imgsharp

A high performing Node.js Image Processing Service.

## Getting started

Ensure that you have installed Node.js on your system.

Clone the repository and navigate to the root of imgsharp folder.

Then run the `npm install` command in your terminal

Once installation is completed you can start the service by running the `npm start` command.

## Docker build and deploy

Docker is used for production release and deploy

### Building imgsharp image

`docker build . --no-cache -t thomaskohkolm/imgsharp`

Your image will now be listed by Docker
You can chech using `docker images`

Alternatively you can build directly from github repository path:
`docker build --pull --no-cache github.com/thomaskokholm/imgsharp`

### Rung the imgsharp image

`docker run -p 8084:3000 -d --name imgsharp thomaskokholm/imgsharp`

Note that using -d flag the container runs in detached mode, leaving imgsharp running in the background. The -p flag redirects the public port (8084) to a private/internal port (3000) inside the container. The --name flag names the running container process "imgsharp".
