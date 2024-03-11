kubectl create namespace project

chmod +x ./backend/build.sh
chmod +x ./frontend/build.sh

./backend/build.sh
./frontend/build.sh

kubectl delete -f ./manifests 
kubectl apply -f ./manifests
