docker rm angular_container
docker build -t  angular_container .
docker run -p 4200:8080 -t angular_container

pause
