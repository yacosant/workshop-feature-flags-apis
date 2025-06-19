FROM clojure:temurin-17-lein-2.11.2-alpine
WORKDIR /app
COPY . .
RUN lein deps
EXPOSE 3004
CMD ["lein", "ring", "server-headless"]
