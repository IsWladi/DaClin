# This api will be requested by the ionic app
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
import json
import bcrypt

# para definir el modelo de datos(body de la peticion)
from pydantic import BaseModel

class UserRegistration(BaseModel):
    username: str
    password: str

class Cita(BaseModel):
    motivo: str
    especialidad: str
    fecha: str


app = FastAPI()

# Agregar el middleware CORS a la aplicación
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Configurar las credenciales de autenticación
username = "admin"
password = "myPassword123"
# Crear una instancia del cliente de MongoDB
# con mongo atlas
mongo_client = MongoClient("mongodb+srv://daClinMongoRemote:bLvhEQt81pN52dnT@clusterdaclin.zqephrf.mongodb.net/?retryWrites=true&w=majority")

# Obtener una referencia a la base de datos
# con atlas
mongo_db = mongo_client["ClusterDaClin"]

usuarios_collection = mongo_db["usuarios"]

# para testear

@app.get("/api/users/get/{setting}")
async def get_user(setting:str):
    if setting == "all":
         return json.loads(dumps(usuarios_collection.find()))
    else:
        usuario = usuarios_collection.find_one({"username":setting})
        return json.loads(dumps(usuario))

# post para crear un usuario

@app.post("/api/users/register/")
async def create_user(user: UserRegistration):
    if usuarios_collection.find_one({"username": user.username}):
        return False
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    usuarios_collection.insert_one(
        {"username": user.username, "password": hashed_password.decode('utf-8'), "remedios": [], "citas": [] , "examenes": []})

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

# endpoints para tabs 1 2 3 4

# crear nueva cita
@app.post("/api/citas/agregar/{user_id}")
async def agregar_cita(cita: Cita, user_id: str):
    usuario = usuarios_collection.find_one({"_id": ObjectId(user_id)})
    if usuario:
        citas = usuario.get("citas", [])  # Obtenemos la lista de citas existentes o una lista vacía
        for horaMedica in citas:
            if cita.motivo == horaMedica["motivo"]:
                return {"message": "Cita no creada, motivo debe ser unico"}

        # si el motivo no existe se crea la nueva cita en la bd
        citas.append({"motivo":cita.motivo,"especialidad":cita.especialidad, "fecha":cita.fecha})
        usuarios_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"citas": citas}}  # Actualizamos el campo "citas" con la lista actualizada
        )
        return {"message": "Cita agregada exitosamente"}
    else:
        return {"message": "Usuario no encontrado"}

@app.get("/")
async def root():
    return {"message": "Hello World"}
