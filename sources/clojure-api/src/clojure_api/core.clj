(ns clojure-api.core
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [ring.util.response :refer [response]]
            [cheshire.core :as json]
            [clojure-api.app-service :as app]
            [ring.middleware.reload :refer [wrap-reload]])
  (:gen-class))

(defn cors-response [resp]
  (-> resp
      (assoc-in [:headers "Access-Control-Allow-Origin"] "*")
      (assoc-in [:headers "Access-Control-Allow-Methods"] "GET")
      (assoc-in [:headers "Access-Control-Allow-Headers"] "*")
      (assoc-in [:headers "Access-Control-Allow-Credentials"] "true")))

(defroutes app-routes
  
  (GET "/health" []
    (cors-response
      (-> (app/health)
          (json/generate-string)
          (response)
          (assoc-in [:headers "Content-Type"] "application/json"))))


  (GET "/features" []
    (cors-response
      (-> (app/features)
          (json/generate-string)
          (response)
          (assoc-in [:headers "Content-Type"] "application/json"))))
  (route/not-found "Not Found")
  
)

(defn -main [& args]
  (run-jetty #'app-routes {:port 3004 :join? true}))
