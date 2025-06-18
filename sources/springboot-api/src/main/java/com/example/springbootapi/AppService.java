package com.example.springbootapi;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppService {
    @Autowired
    private MongoService mongoService;

    public Map<String, Object> getHealth() {
        boolean isAlive = mongoService.ping();
        Map<String, Object> result = new HashMap<>();
        result.put("name", "springboot-api");
        result.put("status", 200);
        result.put("database", isAlive ? "OK" : "KO");
        return result;
    }

    public Map<String, Object> getFeatures() {
        List<Document> docs = mongoService.findDocuments("featureFlags", new Document());
        Map<String, Object> features = new HashMap<>();
        for (Document doc : docs) {
            features.put(doc.getString("name"), doc.get("value"));
        }
        return features;
    }
}
