# Landing Delfos

Este proyecto utiliza SvelteKit y Bun para un entorno de desarrollo rápido, y Docker para crear una imagen lista para producción.

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- [Bun](https://bun.sh) - Para el entorno de desarrollo.
- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) - Para el entorno de producción.

## Desarrollar con Bun

Para ejecutar el proyecto en modo desarrollo usando Bun, sigue estos pasos:

1. Instala Bun en tu máquina local siguiendo la documentación oficial de [Bun](https://bun.sh).

2. Una vez instalado Bun, ejecuta los siguientes comandos en la raíz del proyecto:

    ```bash
    bun install
    ```

    Esto instalará las dependencias necesarias para el proyecto.

3. Luego, inicia el servidor de desarrollo con:

    ```bash
    bun run dev
    ```

4. La aplicación estará disponible en `http://localhost:3000`.

## Compilar y ejecutar con Docker

Para construir y ejecutar el proyecto usando Docker, sigue estos pasos:

1. Asegúrate de que Docker y Docker Compose estén instalados en tu máquina o servidor.

2. Construye la imagen de Docker y ejecuta el contenedor con Docker Compose:

    ```bash
    docker-compose up --build
    ```

3. La aplicación se ejecutará en `http://localhost:3000` (o en la IP de tu servidor si estás trabajando de forma remota).

4. Para detener los contenedores en ejecución, usa:

    ```bash
    docker-compose down
    ```

## Estructura de archivos

- **Dockerfile**: Archivo de configuración de Docker para construir la imagen.
- **docker-compose.yml**: Archivo de configuración para levantar el contenedor usando Docker Compose.
- **src/**: Carpeta que contiene el código fuente de la aplicación SvelteKit.
- **package.json**: Archivo de configuración de dependencias y scripts para el proyecto.

## Comandos útiles

### Con Bun

- **Instalar dependencias**: `bun install`
- **Modo desarrollo**: `bun run dev`

### Con Docker

- **Construir y levantar el contenedor**: `docker-compose up --build`
- **Detener los contenedores**: `docker-compose down`
- **Ver contenedores en ejecución**: `docker ps`

## Notas adicionales

- Asegúrate de tener permisos adecuados para ejecutar Docker en tu sistema.
- Si realizas cambios en el código, necesitarás reconstruir la imagen de Docker para reflejar los cambios en el contenedor.

---

¡Listo! Ahora puedes desarrollar y ejecutar la aplicación SvelteKit usando Bun para desarrollo y Docker para producción.
