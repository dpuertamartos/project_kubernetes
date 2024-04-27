kubectl create namespace string-ns

chmod +x ./hash_gen/build.sh
chmod +x ./pong_app/build.sh
chmod +x ./timestamp_gen/build.sh

./timestamp_gen/build.sh
./hash_gen/build.sh
./pong_app/build.sh

