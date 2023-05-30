# Levantar proyecto

# Docker: MongoDB y FastApi
Write-Host "Construyendo la imagen de FastApi..."
docker compose build

Write-Host "Levantando los servicios con docker-compose..."
docker compose up -d

Write-Host "Configura la base de datos MongoDB con:"
Write-Host "- use FichaClinica"
Write-Host "- db.createCollection('usuarios')"
Write-Host "- pega el contenido del archivo usuarios.txt en la consola de mongo"
write-host "- (opcional) verificar usuarios insertados: db.usuarios.find()"
Write-Host "- por ultimo, presiona exit para salir de la consola de mongo"

# Esperar unos segundos para asegurarse de que los servicios se hayan iniciado completamente
Start-Sleep -Seconds 5

docker exec -it FichaClinica_bd mongo --authenticationDatabase admin -u admin -p myPassword123

