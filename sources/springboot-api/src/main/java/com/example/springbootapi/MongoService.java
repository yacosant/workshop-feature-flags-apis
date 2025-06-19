package com.example.springbootapi;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class MongoService {
    private final String mongoUri = System.getenv().getOrDefault("SPRING_DATA_MONGODB_URI", "mongodb://localhost:27017/shared_db");
    private final String dbName = "shared_db";

    public boolean ping() {
        try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
            MongoDatabase db = mongoClient.getDatabase(dbName);
            db.runCommand(new Document("ping", 1));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Document> findDocuments(String collection, Document query) {
        try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
            MongoDatabase db = mongoClient.getDatabase(dbName);
            MongoCollection<Document> coll = db.getCollection(collection);
            return coll.find(query).into(new ArrayList<>());
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
