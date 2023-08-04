# Levantar proyecto
## Estatus del proyecto:
  - El proyecto se levanta completamente solo con 2 comandos.
  - El tamaño de las imagenes para los contenedores es muy alto, 3.55 GB.
  - Salvo algunas correcciones, al menos por ahora, el proyecto no se desarrollara por completo ya que era con el motivo de las evaluaciones en la asignatura de desarrollo de aplicaciones moviles en la institución Duoc Uc.
  - Se recomienda no usar el apk por ahora, ya que como la api y base de datos en la nube fueron eliminadas(reemplazadas por contenedores), yo no funcionara correctamente.

## A implementar a futuro:
 - Reducir tamaño de las imagenes usando alpine.
 - Arreglar maquetación de la sección de examenes.
 - Conectar a api desde apk.

### Requisitos
  - Docker y Docker Compose

### Ejecutar aplicación
  - En la raiz del proyecto ejecutar:
    - docker compose build
    - docker compose up -d
  - Esperar a que el servidor de Ionic se levante, puedes revisar los logs con `docker logs -f web_ionic_DaClin`
    - Cuando veas este mensaje `[INFO] Development server running!` en los logs, abre tu navegador en `http://localhost:8100/`

