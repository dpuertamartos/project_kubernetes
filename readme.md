## Steps for this repo

### Server creation
1. `npm init`
2. `npm install express`
3. created `server.js` file

### Docker image creation and push to registry

4. created `Dockerfile` , `.dockerignore` and `.gitignore`
5. `docker build -t project_kubernetes_server .`
6. `docker run -it --rm --name kubernetes_server_container project_kubernetes_server`
7. Declare variable `username={you_desired_username}` for example `username=davidpuertamartos`
7. `docker tag project_kubernetes_server $username/project_kubernetes_server:latest`
8. `docker push $username/project_kubernetes_server:latest`

### Kubernetes deployment and log checking
1. `kubectl create deployment kubernetes-server --image=dpuertamartos/project_kubernetes_server`
2. `kubectl get pods`
3. `kubectl logs -f {desired pod}` for example `kubectl logs -f kubernetes-server-586bf57874-bsr2r` Sever started on port 3000 should appear
4. Clean resources `kubectl delete deployment kubernetes-server`

