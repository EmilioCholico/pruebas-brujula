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
        navigator.geolocation.getCurrentPosition(e => div.innerHTML = `${e.coords.speed} m/s`, e => console.log(e));
    }
}

function handleOrientation(e) {
    let gradosMagneticos = e.alpha;
    let declinacion = 8.3;
    let norteVerdadero = (gradosMagneticos - declinacion + 360) % 360;
    brujula.style.transform = `rotate(${360 - norteVerdadero}deg)`;

}

