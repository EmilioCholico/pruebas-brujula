const div = document.querySelector(".pruebas");
const brujula = document.querySelector(".brujula");
let watchID = null;

function enableOrientation() {
    if (typeof DeviceOrientationEvent.requestPermission == 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("deviceorientation", handleOrientation);
                    obtenerVelocidad();
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
        obtenerVelocidad();
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
     if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(
            posicion => {
                const velocidad = posicion.coords.speed;
                div.innerHTML = `Velocidad: ${velocidad !== null ? velocidad.toFixed(2) + " m/s" : "No disponible"}`;
            },
            error => {
                div.innerHTML = `Error GPS: ${error.message}`;
            },
            {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 100
            }
        );
    } else {
        div.innerHTML = "Geolocalización no soportada.";
    }
}
