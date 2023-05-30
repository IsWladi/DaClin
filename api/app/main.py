# This api will be requested by the ionic app
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
import json
from decouple import config

app = FastAPI()

# obtener variables de entorno de ../.env
IP_HOST = config('IPV4', default='127.0.0.1')
print(IP_HOST)

# Configurar los orígenes permitidos en los encabezados CORS
origins = [
    f"http://{IP_HOST}:8100",  # Reemplaza con la URL de tu aplicación Angular
]

# Agregar el middleware CORS a la aplicación
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Configurar las credenciales de autenticación
username = "admin"
password = "myPassword123"
# Crear una instancia del cliente de MongoDB
mongo_client = MongoClient("mongodb://FichaClinica_bd:27017/",
                           username=username,
                           password=password)

# Obtener una referencia a la base de datos
mongo_db = mongo_client["FichaClinica"]
usuarios_collection = mongo_db["usuarios"]

# retorna el id del usuario si es valido el login y false si no lo es


@app.get("/")
async def root():
    return {"message": "Hello World"}
