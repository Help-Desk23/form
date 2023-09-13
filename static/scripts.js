import { AgregarRegistro } from './agregarRegistro.js';
import { ObtenerUbicacion } from "./obtenerUbicacion.js";
import { TomarFoto } from './tomarFoto.js';


document.getElementById('botonAgregar').addEventListener('click', AgregarRegistro);
document.getElementById('botonUbicacion').addEventListener('click', ObtenerUbicacion);
document.getElementById('botonFoto').addEventListener('click', TomarFoto);