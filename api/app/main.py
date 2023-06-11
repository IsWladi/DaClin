# This api will be requested by the ionic app
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
import json
from decouple import config
import bcrypt

# para definir el modelo de datos(body de la peticion)
from pydantic import BaseModel

class UserRegistration(BaseModel):
    username: str
    password: str


app = FastAPI()

# obtener variables de entorno de ../.env
IP_HOST = config('IPV4', default='localhost')
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
mongo_client = MongoClient("mongodb://DaClin_bd:27017/",
                           username=username,
                           password=password)

# Obtener una referencia a la base de datos
mongo_db = mongo_client["DaClin"]
usuarios_collection = mongo_db["usuarios"]


# retorna el id del usuario si es valido el login y false si no lo es


@app.get("/api/users/")
async def get_users():
    return json.loads(dumps(usuarios_collection.find()))

# post para crear un usuario

@app.post("/api/users/register/")
async def create_user(user: UserRegistration):
    if usuarios_collection.find_one({"username": user.username}):
        return False
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    usuarios_collection.insert_one(
        {"username": user.username, "password": hashed_password.decode('utf-8'), "remedios": {}, "citas": {}, "examenes": {}})

    usuario_check = usuarios_collection.find_one({"username": user.username})
    if usuario_check:
        return str(usuario_check["_id"])
    else:
        return False

# get para logearse
@app.post("/api/users/login/")
async def login_user(user: UserRegistration):
    usuario = usuarios_collection.find_one({"username": user.username})
    if usuario and bcrypt.checkpw(user.password.encode('utf-8'), usuario['password'].encode('utf-8')):
        return str(usuario["_id"])
    else:
        return False


@app.get("/")
async def root():
    return {"message": "Hello World"}
