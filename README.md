# Levantar proyecto
1. con Docker se levanta la BD de MongoDB y la api de FastApi.
2. La app de ionic se levanta de manera local.

### Dependencias obligatorias
- (NO USAR TODAVIA) Docker desktop
- node v18.16.0
- npm v9.5.1
- ionic v7.1.1

### (NO USAR TODAVIA) Docker: MongoDB y FastApi 
- Abrir Docker Desktop para poder ejecutar comandos de docker en powershell
- Si hay algun problema con los comandos, asegurarse de que los puertos 27017 y 8000 esten disponibles antes de proceder
- En la raiz del proyecto en la terminal de powershell ejecutar `.\script_1_docker_api_bd.ps1`
  - el script anterior ejecutara los comandos de docker y abrira la shell de mongo desde docker, ejecutar ahí estos comandos:
    1. crear base de datos: `use FichaClinica`
    2. crear coleccion de usuarios: `db.createCollection("usuarios")`
    3. importar usuarios: pegar contenido de `usuarios.txt` en la shell de mongo y dar a enter
    4. comprobar/ver usuarios insertados: `db.usuarios.find()`
    4. `exit` (esto cerrara la shell de mongo)

### Local: Ionic app
- ir a carpeta `./FichaClinica/` y ejecutar comando: `nmp install`
- ir a carpeta `./FichaClinica/` y ejecutar comando: `ionic serve`

