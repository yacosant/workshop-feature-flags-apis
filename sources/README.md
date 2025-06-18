# Código Base para los ejercicios

Este repositorio contiene 5 proyectos independientes:

- **nestjs-api**: API básica con NestJS
- **springboot-api**: API básica con Spring Boot
- **clojure-api**: API básica con Clojure (Leiningen + Ring)
- **nuxt3-web**: Frontend básico con Nuxt 3 (incluye endpoint /api/health)
- **express-api**: API básica con Express.js

Todos los proyectos pueden conectarse a una base de datos MongoDB incluida en el `docker-compose.yml`.

## Ejecución local (modo desarrollo)

- NestJS: `cd nestjs-api && npm install && npm run start:dev`
  - Puerto: [3001](http://localhost:3001/health)
  - Requiere: Node 20
- Express: `cd express-api && npm install && npm run dev`
  - Puerto: [3002](http://localhost:3002/health)
  - Requiere: Node 20
- Spring Boot: `cd springboot-api && mvn spring-boot:run`
  - Puerto: [3003](http://localhost:3003/health)
  - Requiere: Java 21
- Clojure: `cd clojure-api && lein ring server`
  - Puerto: [3004](http://localhost:3004/health)
  - Requiere: Leiningen 2.11 y Java 17+
- Nuxt 3: `cd nuxt3-web && npm install && npm run dev` (incluye server con endpoints)
  - Puerto: [3000](http://localhost:3000/health)
  - Requiere: Node 20
- MongoDB: `docker-compose up mongo --build`
  - Requiere: Docker
  - Opcional: Cliente MongoDB Compass

## Ejecución con Docker Compose (RECOMENDADO)

- Para desarrollo (hot reload, cambios reflejados automáticamente):
  ```
  docker-compose up
  ```
  - Los cambios en el código fuente se reflejan automáticamente gracias a los volúmenes y los comandos de desarrollo.
  - **No es necesario usar `--build` salvo que cambies dependencias o Dockerfile.**

- Para reconstruir imágenes (solo si cambias dependencias o Dockerfile):
  ```
  docker-compose up --build
  ```

Esto arrancará las 5 apps y MongoDB.

## Iniciar solo un servicio con Docker Compose

Puedes iniciar únicamente un servicio (y sus dependencias) usando:

```
docker-compose up <nombre_servicio>
```

Por ejemplo, para iniciar solo la API de Spring Boot:

```
docker-compose up springboot-api
```

O para iniciar solo la API de Express:

```
docker-compose up express-api
```

Para "restart" un servicio
```
docker-compose restart <nombre_servicio>
``` 

Estas instrucciones iniciará ese servicio y los que dependan (por ejemplo, `mongo`).

## Estructura

- Cada carpeta contiene un proyecto independiente, modificado para el workshop.
- El archivo `docker-compose.yml` orquesta todos los servicios.

## Notas

- Asegúrate de tener Node.js, Java, Leiningen y Docker instalados para desarrollo sin docker o en su lugar utiliza docker.
- Docker genera varios volumenes para los servicios, entre ellos el de mongo_data.

## Gestión de Feature Flags - Básico

- Los feature flags se almacenan en MongoDB y se exponen mediante endpoints `/api/features` (Nuxt3) y equivalentes en otros servicios.
- El frontend Nuxt3 consume los flags usando servicios y composables (`useFeatureFlags`, `fetchFeatureFlagsApi`).
- Para forzar la recarga de flags desde el frontend, usa el prop `reloadKey` en los componentes relacionados.
- Ejemplo de uso en Nuxt3:
  ```ts
  import { useFeatureFlags } from '~/services/featureFlags';
  const { flags, isEnabled } = useFeatureFlags();
  ```

- Para todas las otras APIs, tambien hay implementado un endpoint /api/features, como base de conexión con MongoDB y gestor de Features Flags.

## TailwindCSS en Nuxt3

- TailwindCSS está configurado en `nuxt3-web`.
- Los estilos se encuentran en `assets/css/tailwind.css` y se importan en `nuxt.config.ts`.
- Puedes usar clases utilitarias de Tailwind en todos los componentes Vue.

## Endpoints útiles

- `/api/features` (todas las APIs): Devuelve los feature flags actuales.
- `/api/health` (todos los servicios): Devuelve el estado de salud y conexión a base de datos.
