import mysql.connector

# Definimos la conexion a la base de datos

def database():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="herodb"
        )

        if connection.is_connected():
            print("¡Conexión a la base de datos exitosa!")

        return connection
    except mysql.connector.Error as err:
        print("Error al conectar a la base de datos:", err)
        return None

# Cerramos y exportamos la conexión a la base de datos

database()

