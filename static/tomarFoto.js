export function TomarFoto() {
  const cameraContainer = document.createElement('div');
  cameraContainer.classList.add('camera-container')

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('camera-img')

  
  const captureButton = document.createElement('button');
  captureButton.classList.add('camera-button')
  
  
  const uploadButton = document.createElement('button'); // Nuevo botón para subir la foto
  uploadButton.classList.add('camera-upload')

  let stream;
  let capturedImageUrl; // Variable para almacenar la URL de la imagen capturada

  async function startCamera() {
      try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const video = document.createElement('video');
          video.classList.add('video-container')
          video.srcObject = stream;
          video.play();
          cameraContainer.appendChild(video);
      } catch (error) {
          console.error('Error al acceder a la cámara:', error);
      }
  }

  function capturePhoto() {
      const video = cameraContainer.querySelector('video');
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      capturedImageUrl = canvas.toDataURL('image/jpeg');

      // Mostrar la imagen capturada en un nuevo elemento <img>
      const capturedImage = document.createElement('img');
      capturedImage.classList.add('img-capture')
      capturedImage.src = capturedImageUrl;
      imageContainer.appendChild(capturedImage);

      // Detener la cámara
      stream.getTracks().forEach(track => track.stop());
      cameraContainer.removeChild(video);

      // Habilitar el botón de subir foto
      uploadButton.disabled = false;
  }

  function uploadPhoto() {
    const imageInput = document.getElementById('image');
    const ciInput = document.getElementById('ci'); // Obtener el elemento de input del número de CI
    const ciValue = ciInput.value.trim(); 
    
    fetch(capturedImageUrl)
        .then(response => response.blob())
        .then(blob => {
            let extension = 'jpg'; // Establecer la extensión predeterminada
            const contentType = blob.type;
            
            if (contentType === 'image/jpeg') {
                extension = 'jpeg';
            } else if (contentType === 'image/png') {
                extension = 'png';
            } else if (contentType === 'image/heif') {
                extension = 'heif';
            } else if (contentType === 'image/hevc') {
              extension = 'hevc';
            }
            
            
            const filename = `${ciValue}_image.${extension}`;
            const file = new File([blob], filename, { type: contentType });
            
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageInput.files = dataTransfer.files;

            //Muestra mensaje y cierra la imagen
            alert("Imagen subida correctamente")
            imageContainer.style.display = 'none';
            captureButton.style.display = 'none';
            uploadButton.style.display = 'none';

        })
        .catch(error => {
            console.error('Error al convertir la imagen:', error);
        });
}

  // Lógica para mostrar y capturar la foto al presionar el botón "Tomar Foto"
  captureButton.textContent = 'Capturar Foto';
  captureButton.addEventListener('click', capturePhoto);

  // Lógica para subir la foto al presionar el botón "Subir Foto"
  uploadButton.textContent = 'Subir Foto';
  uploadButton.disabled = true;
  uploadButton.addEventListener('click', uploadPhoto);

  // Iniciar la cámara al cargar la página
  startCamera();

  // Agregar elementos al DOM
  document.body.appendChild(imageContainer);
  cameraContainer.appendChild(captureButton);
  cameraContainer.appendChild(uploadButton); // Agregar el botón de subir al DOM
  document.body.appendChild(cameraContainer);
}














