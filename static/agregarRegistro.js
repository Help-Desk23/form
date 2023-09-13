export function AgregarRegistro() {
    var name = document.getElementById('name').value;
    var ci = document.getElementById('ci').value;
    var phone = document.getElementById('phone').value;
    var motos = document.getElementById('motos').value;
    var direction = document.getElementById('direction').value;
    var imageInput = document.getElementById('image');

    var formData = new FormData();
    formData.append('name', name);
    formData.append('ci', ci);
    formData.append('phone', phone);
    formData.append('motos', motos)
    formData.append('direction', direction);
    formData.append('file', imageInput.files[0]); // 'file' matches the field name used in the Flask app

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/form', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                alert('Registro agregado correctamente');
            } else {
                alert('Error al agregar registro');
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error en la solicitud:', xhr.statusText);
    };

    xhr.send(formData);
}
