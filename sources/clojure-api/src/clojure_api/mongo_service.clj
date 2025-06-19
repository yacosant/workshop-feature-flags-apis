(ns clojure-api.mongo-service
  (:require [monger.core :as mg]
            [monger.collection :as mc]))

(defn get-mongo-url []
  (or (System/getenv "MONGO_URL") "mongodb://localhost:27017/shared_db"))

(defn ping []
  (let [mongo-url (get-mongo-url)]
    (try
      (let [{:keys [conn db]} (mg/connect-via-uri mongo-url)]
        (mg/command db {:ping 1})
        (mg/disconnect conn)
        true)
      (catch Exception _ false))))

(defn find-documents [collection query]
  (let [mongo-url (get-mongo-url)]
    (try
      (let [{:keys [conn db]} (mg/connect-via-uri mongo-url)
            cursor (mc/find-maps db collection query)
            docs (doall cursor)] ; Forzar evaluación
        (mg/disconnect conn)
        docs)
      (catch Exception e
        (do (println "Exception in find-documents:" (.getMessage e))
            [])))))
