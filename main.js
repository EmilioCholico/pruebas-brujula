// document.addEventListener("DOMContentLoaded", window.ondeviceorientation = e => {
//     alert(e)
// })


const div = document.querySelector(".pruebas");
const brujula = document.querySelector(".brujula");

function enableOrientation() {
    if (typeof DeviceOrientationEvent.requestPermission == 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("deviceorientation", handleOrientation);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
    }
}

function handleOrientation(e) {
    let gradosMagneticos = e.alpha;
    let declinacion = 8.3;
    let norteVerdadero = (gradosMagneticos - declinacion + 360) % 360;
    brujula.style.transform = `rotate(${360 - norteVerdadero}deg)`;
    // navigator.geolocation.getCurrentPosition(e => div.innerHTML = `${e.coords.speed}`, e => console.log(e));
}

function obtenerVelocidad() {
    navigator.geolocation.getCurrentPosition(
        posicion => {
            const velocidad = posicion.coords.speed;
            div.innerHTML = `Velocidad: ${velocidad !== null ? velocidad.toFixed(2) + " m/s" : "No disponible"}`;
        },
        error => {
            div.innerHTML = `Error al obtener velocidad: ${error.message}`;
        },
        {
            enableHighAccuracy: true
        }
    );
}
