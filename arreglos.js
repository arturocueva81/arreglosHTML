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

    if(edadesIzquierdo===0){
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan=3;
        td.className="empty";
        td.textContent="arrgelo izquierdo vacio";
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

document.addEventListener("DOMContentLoaded", pintarArregloIzquierdo);