kubectl create namespace project

chmod +x ./backend/build.sh
chmod +x ./frontend/build.sh
chmod +x ./cronjob/build.sh

./backend/build.sh
./frontend/build.sh
./cronjob/build.sh

export SOPS_AGE_KEY_FILE=$(pwd)/key.txt
sops --decrypt ./manifests/secret.enc.yaml > ./manifests/secret.yaml
kubectl delete -f ./manifests 
kubectl apply -f ./manifests
rm ./manifests/secret.yaml
