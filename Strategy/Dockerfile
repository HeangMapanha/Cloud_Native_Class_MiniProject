FROM nginx:1.25.5-alpine
WORKDIR "C:\Users\User\Desktop\website1\Strategy\web1\index.html"
RUN rm -rf *
COPY ./web1 .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
