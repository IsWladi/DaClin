# Levantar proyecto
1. Elige tu manera preferida: Con Docker se levanta la BD de MongoDB y la api de FastApi o de manera local instalando mongoDB y FastApi en el pc.
2. La app de ionic se levanta de manera local o proximamente con el apk en el telefono.

### Dependencias
- Para FastApi y MongoDB con Docker:
  - Docker desktop
- Para FastApi y MongoDB en local:
  - MongoDB
  - Python 3.11.4
- Para Ionic:
  - node v18.16.0
  - npm v9.5.1
  - ionic v6.16.3

### Pasos previos(para que la app desde el telefono se pueda conectar a la api)
- Tener el pc(si esta con ethernet desconectar el cable y conectar mediante wifi) y el telefono a la misma wifi.
- En la carpeta `api/app/` crear un archivo `.env` con la variable `LAN_INALAMBRICA_WIFI_IPV4=172.xx.xx.x`
    - como obtener la ip en windows; en la terminal poner el comando: `ipconfig`


### Docker: MongoDB y FastApi
- Abrir Docker Desktop para poder ejecutar comandos de docker en powershell
- Si hay algun problema con los comandos, asegurarse de que los puertos 27017 y 8000 esten disponibles antes de proceder
- En la raiz del proyecto en la terminal de powershell ejecutar `.\script_1_docker_api_bd.ps1`
  - el script anterior ejecutara los comandos de docker y abrira la shell de mongo desde docker, ejecutar ahí estos comandos:
    1. crear base de datos: `use FichaClinica`
    2. crear coleccion de usuarios: `db.createCollection("usuarios")`
    3. importar usuarios: pegar contenido de `usuarios.txt` en la shell de mongo y dar a enter
    4. comprobar/ver usuarios insertados: `db.usuarios.find()`
    4. `exit` (esto cerrara la shell de mongo)

### Sin Docker:

### Ionic app
- ir a carpeta `./FichaClinica/` y ejecutar comando: `npm install`
- ir a carpeta `./FichaClinica/` y ejecutar comando: `ionic serve --host=0.0.0.0`

