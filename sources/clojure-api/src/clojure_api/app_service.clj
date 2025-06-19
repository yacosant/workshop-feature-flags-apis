(ns clojure-api.app-service
  (:require [clojure-api.health-service :as health]
            [clojure-api.features-service :as features]))

(defn health []
  (health/health-status))

(defn features []
  (features/get-features))
