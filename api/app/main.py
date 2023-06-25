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


class Remedio(BaseModel):
    motivo: str
    nombre: str
    cantidad: str
    cada: str
    durante: str
    fecha: str

class Examen(BaseModel):
    nombre: str
    razon: str
    fecha: str
    imagen: str


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
mongo_client = MongoClient(
    "mongodb+srv://daClinMongoRemote:bLvhEQt81pN52dnT@clusterdaclin.zqephrf.mongodb.net/?retryWrites=true&w=majority")

# Obtener una referencia a la base de datos
# con atlas
mongo_db = mongo_client["ClusterDaClin"]

usuarios_collection = mongo_db["usuarios"]

# para testear


@app.get("/api/users/get/{setting}")
async def get_user(setting: str):
    if setting == "all":
        return json.loads(dumps(usuarios_collection.find()))
    else:
        usuario = usuarios_collection.find_one({"username": setting})
        return json.loads(dumps(usuario))

@app.get("/api/users/get/username/{id}")
async def get_user(id: str):
    usuario = usuarios_collection.find_one({"_id": ObjectId(id)},{"username":True})
    return json.loads(dumps(usuario["username"]))

# post para crear un usuario


@app.post("/api/users/register/", status_code=201)
async def create_user(user: UserRegistration):
    if usuarios_collection.find_one({"username": user.username}):
        return False
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())

    usuarios_collection.insert_one(
        {"username": user.username, "password": hashed_password.decode('utf-8'), "remedios": [], "citas": [], "examenes": []})

    usuario_check = usuarios_collection.find_one({"username": user.username})
    if usuario_check:
        return str(usuario_check["_id"])
    else:
        return False

# get para logearse


@app.post("/api/users/login/", status_code=200)
async def login_user(user: UserRegistration):
    usuario = usuarios_collection.find_one({"username": user.username})
    if usuario and bcrypt.checkpw(user.password.encode('utf-8'), usuario['password'].encode('utf-8')):
        return str(usuario["_id"])
    else:
        return False

# endpoints para tabs 1 2 3 4

# crear nueva cita


@app.post("/api/citas/agregar/{user_id}", status_code=201)
async def agregar_cita(cita: Cita, user_id: str):
    usuario = usuarios_collection.find_one({"_id": ObjectId(user_id)})
    if usuario:
        # Obtenemos la lista de citas existentes o una lista vacía
        citas = usuario.get("citas", [])
        for horaMedica in citas:
            if cita.motivo == horaMedica["motivo"]:
                return {"message": "Cita no creada, motivo debe ser unico"}

        # si el motivo no existe se crea la nueva cita en la bd
        citas.append({"motivo": cita.motivo,
                     "especialidad": cita.especialidad, "fecha": cita.fecha})
        usuarios_collection.update_one(
            {"_id": ObjectId(user_id)},
            # Actualizamos el campo "citas" con la lista actualizada
            {"$set": {"citas": citas}}
        )
        return {"message": "Cita agregada exitosamente"}
    else:
        return {"message": "Usuario no encontrado"}


# crear nuevo remedio
@app.post("/api/remedios/agregar/{user_id}", status_code=201)
async def agregar_remedio(remedio: Remedio, user_id: str):
    usuario = usuarios_collection.find_one({"_id": ObjectId(user_id)})
    if usuario:
        # Obtenemos la lista de citas existentes o una lista vacía
        remedios = usuario.get("remedios", [])
        for tratamiento in remedios:
            if remedio.nombre == tratamiento["nombre"]:
                return {"message": "Remedio no creado, remedio debe ser unico"}

        # si el motivo no existe se crea la nueva cita en la bd
        remedios.append(remedio.dict())
        usuarios_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"remedios": remedios}}
        )
        return {"message": "Remedio agregada exitosamente"}
    else:
        return {"message": "Usuario no encontrado"}

# obtener citas de un usuario
@app.get("/api/citas/usuario/{user_id}", status_code=200)
async def obtener_citas_usuario(user_id: str):
    citas = usuarios_collection.find_one({"_id": ObjectId(user_id)}, {
                                         "citas": True, "_id": False})
    if citas:
        return json.loads(dumps(citas["citas"]))
    else:
        return "No document found"

# obtener remedios de un usuario
@app.get("/api/remedios/usuario/{user_id}", status_code=200)
async def obtener_remedios_usuario(user_id: str):
    remedios = usuarios_collection.find_one({"_id": ObjectId(user_id)}, {
                                         "remedios": True, "_id": False})
    if remedios:
        return json.loads(dumps(remedios["remedios"]))
    else:
        return "No document found"


# crear nuevo examen
@app.post("/api/examenes/agregar/{user_id}", status_code=201)
async def agregar_examen(examen: Examen, user_id: str):
    usuario = usuarios_collection.find_one({"_id": ObjectId(user_id)})
    if usuario:
        # Obtenemos la lista de citas existentes o una lista vacía
        examenes = usuario.get("examenes", [])
        for ex in examenes:
            if examen.nombre == ex["nombre"]:
                return {"message": "Examen no creado, razon debe ser unico"}

        # si el motivo no existe se crea la nueva cita en la bd
        examenes.append(examen.dict())
        usuarios_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"examenes": examenes}}
        )
        return {"message": "Examen agregado exitosamente"}
    else:
        return {"message": "Usuario no encontrado"}

# obtener examenes de un usuario
@app.get("/api/examenes/usuario/{user_id}", status_code=200)
async def obtener_examenes_usuario(user_id: str):
    examenes = usuarios_collection.find_one({"_id": ObjectId(user_id)}, {
                                         "examenes": True, "_id": False})
    if examenes:
        return json.loads(dumps(examenes["examenes"]))
    else:
        return "No document found"


@app.get("/")
async def root():
    return {"message": "Hello World"}
