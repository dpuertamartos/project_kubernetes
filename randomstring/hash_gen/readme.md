1. `app_name=flask-app-string-generator`
2. `docker build -t $app_name .`
3. `username=insert_your_docker_registry_username`
4. `docker tag $app_name $username/$app_name:latest`
5. `docker push $username/$app_name:latest`
6. `k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2`
7. `kubecetl apply -f .`
8. Check in browser accesing `localhost:8081` that you get random string generation!
