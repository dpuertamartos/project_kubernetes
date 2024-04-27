1. `app_name=flask-app-timestamp-generator`
2. `docker build -t $app_name .`
3. `username=insert_your_docker_registry_username`
4. `docker tag $app_name $username/$app_name:latest`
5. `docker push $username/$app_name:latest`