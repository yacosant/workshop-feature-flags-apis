(defproject clojure-api "0.1.0-SNAPSHOT"
  :description "API básica Ring + MongoDB"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [ring/ring-core "1.11.0"]
                 [ring/ring-jetty-adapter "1.11.0"]
                 [compojure "1.6.2"]
                 [com.novemberain/monger "3.5.0"]
                 [cheshire "5.11.0"]
                 [ring-cors "0.1.13"]]
  :plugins [[lein-ring "0.12.6"]]
  :main ^:skip-aot clojure-api.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all
                       :jvm-opts ["-Dclojure.compiler.direct-linking=true"]}}
  :ring {:handler clojure-api.core/app-routes
         :port 3004})

