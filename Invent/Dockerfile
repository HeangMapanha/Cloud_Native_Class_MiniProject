FROM nginx:1.25.5-alpine
WORKDIR "C:\Users\User\Desktop\website1\Invent\web2\index.html"
RUN rm -rf *
COPY ./web2 .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
