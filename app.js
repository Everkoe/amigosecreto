let participantes = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    
    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }
    if (participantes.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }
    
    participantes.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    participantes.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        li.classList.add("fade-in");
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (participantes.length < 2) {
        alert("Debe haber al menos dos participantes para el sorteo.");
        return;
    }
    
    let asignados = [...participantes];
    let resultado = {};
    let intentos = 0;
    let maxIntentos = 100;
    
    do {
        intentos++;
        asignados = [...participantes].sort(() => Math.random() - 0.5);
    } while (asignados.some((p, i) => p === participantes[i]) && intentos < maxIntentos);
    
    if (intentos === maxIntentos) {
        alert("No se pudo realizar un sorteo válido. Inténtelo nuevamente.");
        return;
    }
    
    participantes.forEach((nombre, index) => {
        resultado[nombre] = asignados[index];
    });
    
    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const lista = document.getElementById("resultado");
    lista.innerHTML = "";
    
    Object.entries(resultado).forEach(([participante, asignado], index) => {
        setTimeout(() => {
            const li = document.createElement("li");
            li.textContent = `${participante} -> ${asignado}`;
            li.classList.add("slide-in");
            lista.appendChild(li);
        }, index * 500);
    });
}
