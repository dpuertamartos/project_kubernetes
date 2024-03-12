kubectl create namespace project

chmod +x ./backend/build.sh
chmod +x ./frontend/build.sh

./backend/build.sh
./frontend/build.sh

SOPS_AGE_KEY_FILE=$(pwd)/key.txt
sops --decrypt ./manifests/secret.enc.yaml > ./manifests/secret.yaml
kubectl delete -f ./manifests 
kubectl apply -f ./manifests
rm ./manifests/secret.yaml
