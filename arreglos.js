let edadesIzquierdo = [];
let edadesDerecho = [];

function agregarEdad() {
    const input = document.getElementById("edad");
    const valor = parseInt(input.value, 10);

    if (!isNaN(valor)) {
        edadesIzquierdo.push(valor);
        input.value = "";
        input.focus();
        pintarArregloIzquierdo();
    } else {
        alert("Ingrese un número válido");
    }
}

function pintarArregloIzquierdo(){
    const tbody = document.getElementById("tablaIzquierda");
    tbody.innerHTML="";

    if(edadesIzquierdo.length===0){
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan=3;
        td.className="empty";
        td.textContent="arreglo izquierdo vacio";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    for(let i=0;i<edadesIzquierdo.length;i++){
        const edad = edadesIzquierdo[i];
        const tr=document.createElement("tr");
        
        const tdValor=document.createElement("td");
        tdValor.textContent=edad;
        tr.appendChild(tdValor);

        const tdEliminar = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-eliminar";

        btnEliminar.setAttribute("onclick", `eliminarIzquierdo(${i})`);
        btnEliminar.textContent = "Eliminar";
        tdEliminar.appendChild(btnEliminar);
        tr.appendChild(tdEliminar);

        const tdMover = document.createElement("td");
        const btnMover = document.createElement("button");
        btnMover.className = "btn-mover";
        btnMover.setAttribute("onclick", `moverHaciaDerecha(${i})`);
        btnMover.textContent = "➜";
        tdMover.appendChild(btnMover);
        tr.appendChild(tdMover);

        tbody.appendChild(tr);

    }
}

function eliminarIzquierdo(indice) {
    if (indice >= 0 && indice < edadesIzquierdo.length) {
        edadesIzquierdo.splice(indice, 1);
        pintarArregloIzquierdo();
    } 
}

function pintarArregloDerecha() {
    const tbody = document.getElementById("tablaDerecha");
    tbody.innerHTML = "";

    if (edadesDerecho.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.className = "empty";
        td.textContent = "arreglo derecho vacio";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    for (let i = 0; i < edadesDerecho.length; i++) {
        const edad = edadesDerecho[i];

        const tr = document.createElement("tr");

        const tdMover = document.createElement("td");
        const btnMover = document.createElement("button");
        btnMover.className = "btn-mover";

        btnMover.setAttribute("onclick", `moverHaciaIzquierda(${i})`);
        btnMover.textContent = "⬅";
        tdMover.appendChild(btnMover);
        tr.appendChild(tdMover);

        const tdValor = document.createElement("td");
        tdValor.textContent = edad;
        tr.appendChild(tdValor);

        const tdEliminar = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-eliminar";
        btnEliminar.setAttribute("onclick", `eliminarDerecho(${i})`);
        btnEliminar.textContent = "Eliminar";
        tdEliminar.appendChild(btnEliminar);
        tr.appendChild(tdEliminar);

        tbody.appendChild(tr);
    }
}

    function eliminarDerecho(indice) {
        if (indice >= 0 && indice < edadesDerecho.length) {
        edadesDerecho.splice(indice, 1);
        pintarArregloDerecha();
        } 
    }

document.addEventListener("DOMContentLoaded", function () {
    pintarArregloIzquierdo();
    pintarArregloDerecha();
});