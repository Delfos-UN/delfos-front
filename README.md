<p align="center">
    <img src="https://raw.githubusercontent.com/Delfos-UN/delfos-front/master/delfos-imagotipo.svg?sanitize=true"
        height="200">
</p>

# Delfos
Delfos será un modelo inteligencia artificial que te recomienda las materias ideales. Inspirada en el Oráculo de Delfos, te guía para tomar decisiones informadas en tu camino educativo. Delfos es creado y entrenado por estudiantes. Al ser desarrollado por quienes conocen de primera mano las necesidades y desafíos académicos, Delfos ofrece recomendaciones más precisas y relevantes. Participa en esta iniciativa colaborativa y forma parte de una comunidad que mejora la experiencia educativa para todos.

## Aporta al desarrollo de esta Landing.

Este proyecto utiliza SvelteKit, Bun y Typescript para un entorno de desarrollo rápido, y Docker para crear una imagen lista para producción.

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" height="60" alt="svelte logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg" height="60" alt="bun logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" height="60" alt="typescript logo"  />
  <img width="20" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" height="60" alt="docker logo"  />
  <img width="20" />
</div>

> [!IMPORTANT]  
>
> ## Como caloborar
>
> Para colaborar a este proyecto crea una rama, haz los cambios que consideres que aportan al crecimiento y buen funcionamiento de esta web y haz un PR.

> [!IMPORTANT]  
>
> ## Requisitos previos
>
> Asegúrate de tener instalado lo siguiente:
>
> - [Bun](https://bun.sh) - Para el entorno de desarrollo.
> - [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) - Para el entorno de producción.

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

> [!TIP]
>
> ## Comandos útiles
>
> - **Instalar dependencias**: `bun install`
> - **Modo desarrollo**: `bun run dev`
> - **Construir y levantar el contenedor**: `docker-compose up --build`
> - **Detener los contenedores**: `docker-compose down`
> - **Ver contenedores en ejecución**: `docker ps`

---

> [!NOTE]
>
> ## Notas adicionales
>
> - Asegúrate de tener permisos adecuados para ejecutar Docker en tu sistema.
> - Si realizas cambios en el código, necesitarás reconstruir la imagen de Docker para reflejar los cambios en el contenedor.

---

¡Listo! Ahora puedes desarrollar y ejecutar la landing de Delfos.
