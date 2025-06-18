package com.example.springbootapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Map;

@SpringBootApplication
public class SpringbootApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringbootApiApplication.class, args);
    }

    @RestController
    class HelloController {
        @GetMapping("/")
        public String hello() {
            return "Hello World from Spring Boot!";
        }
    }

    @RestController
    public class HealthController {
        @Autowired
        private HealthService healthService;

        @GetMapping("/health")
        public Map<String, Object> health() {
            boolean isAlive = healthService.ping();
            return Map.of("name", "springboot-api", "status", 200, "database", isAlive ? "OK" : "KO");
        }
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}
