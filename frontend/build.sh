app_name=project_kubernetes_frontend
username=dpuertamartos
docker build -t $app_name .
docker tag $app_name $username/$app_name:latest
docker push $username/$app_name:latest