(ns clojure-api.health-service
  (:require [monger.core :as mg]
            [monger.collection :as mc]))

(defrecord HealthStatus [status])

(defn get-mongo-url []
  (or (System/getenv "MONGO_URL") "mongodb://localhost:27017/shared_db"))

(defn check-status []
  (let [mongo-url (get-mongo-url)]
    (try
      (let [{:keys [conn db]} (mg/connect-via-uri mongo-url)
            doc (mc/find-one-as-map db "health" {})
            status (if (and doc (contains? doc :status))
                     (:status doc)
                     "ko")
            result (->HealthStatus status)]
        (mg/disconnect conn)
        result)
      (catch Exception e
        (do (println "Exception in check-status:" (.getMessage e))
            (->HealthStatus "ko"))))))

(defn ping-mongo []
  (let [mongo-url (get-mongo-url)]
    (try
      (let [{:keys [conn db]} (mg/connect-via-uri mongo-url)]
        (do
          (mg/command db {:ping 1})
          (mg/disconnect conn)
          true))
      (catch Exception e
        false))))

(defn health-status []
  {:name     "clojure-api"
   :status   200
   :database (if (ping-mongo) "OK" "KO")})
