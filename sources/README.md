# Monorepo Feature Flags APIs

Este repositorio contiene 5 proyectos independientes:

- **nestjs-api**: API básica con NestJS
- **springboot-api**: API básica con Spring Boot
- **clojure-api**: API básica con Clojure (Leiningen + Ring)
- **nuxt3-web**: Frontend básico con Nuxt 3 (incluye endpoint /api/health con conexión a MongoDB)
- **express-api**: API básica con Express.js

Todos los proyectos pueden conectarse a una base de datos MongoDB incluida en el `docker-compose.yml`.

## Ejecución local (desarrollo)

- NestJS: `cd nestjs-api && npm run start:dev`
- Spring Boot: `cd springboot-api && mvn spring-boot:run`
- Clojure: `cd clojure-api && lein ring server`
- Nuxt 3: `cd nuxt3-web && npm run dev` (incluye endpoint /api/health)
- Express: `cd express-api && npm run dev`

## Ejecución con Docker Compose

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

Esto levantará las 5 apps y MongoDB.

## Levantar solo un servicio con Docker Compose

Puedes levantar únicamente un servicio (y sus dependencias) usando:

```
docker-compose up <nombre_servicio>
```

Por ejemplo, para levantar solo la API de Spring Boot:

```
docker-compose up springboot-api
```

O para levantar solo la API de Express:

```
docker-compose up express-api
```

Esto solo iniciará ese servicio y los que dependa (por ejemplo, `mongo`).

## Estructura

- Cada carpeta contiene un proyecto independiente, siguiendo la estructura oficial de cada framework.
- El archivo `docker-compose.yml` orquesta todos los servicios.

## Notas

- Asegúrate de tener Node.js, Java, Leiningen y Docker instalados para desarrollo local.
- Para producción, adapta los Dockerfiles y variables de entorno según tus necesidades.
- Para desarrollo, los cambios en el código fuente se reflejan automáticamente en los contenedores gracias a los volúmenes y comandos de hot reload.

## Gestión de Feature Flags

- Los feature flags se almacenan en MongoDB y se exponen mediante endpoints `/api/features` (Nuxt3) y equivalentes en otros servicios.
- El frontend Nuxt3 consume los flags usando servicios y composables (`useFeatureFlags`, `fetchFeatureFlagsApi`).
- Para forzar la recarga de flags desde el frontend, usa el prop `reloadKey` en los componentes relacionados.
- Ejemplo de uso en Nuxt3:
  ```ts
  import { useFeatureFlags } from '~/services/featureFlags';
  const { flags, isEnabled } = useFeatureFlags();
  ```

## TailwindCSS en Nuxt3

- TailwindCSS está configurado en `nuxt3-web`.
- Los estilos se encuentran en `assets/css/tailwind.css` y se importan en `nuxt.config.ts`.
- Puedes usar clases utilitarias de Tailwind en todos los componentes Vue.

## Endpoints útiles

- `/api/features` (Nuxt3): Devuelve los feature flags actuales.
- `/api/health` (todos los servicios): Devuelve el estado de salud y conexión a base de datos.
