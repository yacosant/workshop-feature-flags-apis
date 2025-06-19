(ns clojure-api.health-service
  (:require [clojure-api.mongo-service :as mongo]))

(defn health-status []
  {:name     "clojure-api"
   :status   200
   :database (if (mongo/ping) "OK" "KO")})
