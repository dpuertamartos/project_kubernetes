app_name=flask-app-string-generator
username=dpuertamartos
cd "$(dirname "$0")"
docker build -t $app_name .
docker tag $app_name $username/$app_name:latest
docker push $username/$app_name:latest

kubectl delete -f .
kubectl apply -f .