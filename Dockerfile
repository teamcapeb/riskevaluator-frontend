# build
FROM node:alpine as builder
ENV PORT=8080
WORKDIR /temp
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# deploy
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /temp/dist/app /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

#CMD sed -i -e "s/listen       80/listen       $PORT/g" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
