##### Stage 1
FROM node:7 as node
WORKDIR C:/Dev/WebstormProjects/Aige_Angular/src/app
COPY . .
RUN npm install
ARG env=prod
RUN npm run build -- --prod -environment $env

##### Stage 2
#### FROM nginx:alpine
#### VOLUME /var/cache/nginx
#### COPY --from=node /src/app/dist /usr/share/nginx/html
#### COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


### comand docker run -d -p 80:80 -v $(pwd)/dist:/usr/share/nginx/html nginx:alpine
