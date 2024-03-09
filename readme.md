### Steps for this repo

1. `npm init`
2. `npm install express`
3. created `server.js` file
4. created `Dockerfile` , `.dockerignore` and `.gitignore`
5. `docker build -t project_kubernetes_server .`
6. `docker run -it --rm --name kubernetes_server_container project_kubernetes_server`
