from flask import Flask, request, jsonify, render_template
import os
import base64
from db import database

app = Flask(__name__)

# Ruta para obtener registros (GET)
@app.route('/form', methods=['GET'])
def get_form():
    connection = database()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM form")

    columns = [column[0] for column in cursor.description]
    result = [dict(zip(columns, row)) for row in cursor.fetchall()]
    cursor.close()
    connection.close()

    return jsonify(result)

# Ruta para agregar un nuevo registro (POST)
@app.route('/form', methods=['POST'])
def add_form():
    new_data = request.form
    file = request.files['file']

    connection = database()
    cursor = connection.cursor()

    file_data = file.read()
    base64_file = base64.b64encode(file_data).decode('utf-8')

    # Guardar la imagen en la carpeta 'static/image'
    image_path = os.path.join(app.root_path, 'static', 'image', file.filename)
    with open(image_path, 'wb') as image_file:
        image_file.write(file_data)

    query = "INSERT INTO form(name, ci, phone, motos, direction, image) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (new_data['name'], new_data['ci'], new_data['phone'], new_data['motos'], new_data['direction'], image_path)
    cursor.execute(query, values)
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Datos Agregados Correctamente"}), 201

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()







