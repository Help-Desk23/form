export function ObtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("La geolocalización no es soportada por este navegador.");
    }
  }
  
  function showPosition(position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;
  
    // Utilizar la API de geocodificación de IPStack
    const apiKey = '35b6915d599599786c528695c7acf564';
    const apiUrl = `http://api.ipstack.com/134.201.250.155?access_key=${apiKey}&${latitud},${longitud}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.city && data.region_name && data.country_name) {
          const direccion = `${data.latitude}, ${data.longitude}`;
          document.getElementById("direction").value = direccion;
        } else {
          console.log("No se pudo obtener la dirección.");
        }
      })
      .catch(error => {
        console.log("Error al obtener la dirección:", error);
      });
  }
  
  function handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("El usuario denegó el permiso de geolocalización.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("La información de ubicación no está disponible.");
        break;
      case error.TIMEOUT:
        console.log("La solicitud de geolocalización ha expirado.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("Un error desconocido ocurrió.");
        break;
    }
  }