(ns clojure-api.features-service
  (:require [clojure-api.mongo-service :as mongo]))

(defn get-features []
  (let [result (mongo/find-documents "featureFlags" {})]
    (if (not (empty? result))
      (reduce (fn [acc {:keys [name value]}] (assoc acc name value)) {} result)
      [])))
