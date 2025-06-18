package com.example.springbootapi;

import org.springframework.stereotype.Service;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

@Service
public class HealthService {

    public boolean ping() {
        String mongoUri = System.getenv().getOrDefault("SPRING_DATA_MONGODB_URI", "mongodb://localhost:27017/shared_db");
        try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
            MongoDatabase db = mongoClient.getDatabase("shared_db");
            Document ping = new Document("ping", 1);
            db.runCommand(ping);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
