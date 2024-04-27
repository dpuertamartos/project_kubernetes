1. `app_name=insert_your_app_name`
2. `docker build -t $app_name .`
3. `username=insert_your_docker_registry_username`
4. `docker tag flask-app $username/$app_name:latest`
`docker push $username/$app_name:latest`
5. `k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2`
6. `kubecetl apply -f .`
7. Make sure that `../ingress.yaml` is applied
8. Check in browser accesing `localhost:8081/pingpong` that you get counter!
