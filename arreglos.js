let edadesIzquierdo = [];
let edadesDerecho = [];

function agregarEdad() {
    const input = document.getElementById("edad");
    const valor = parseInt(input.value, 10);

    if (!isNaN(valor) && valor>=1 && valor <=100) {
        edadesIzquierdo.push(valor);
        input.value = "";
        input.focus();
        pintarArregloIzquierdo();
    } else {
        alert("ingrese una edad válida entre 1 y 100 años");
        input.value="";
        input.focus();
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
        tr.classList.add('row-enter');
        setTimeout(() => tr.classList.remove('row-enter'), 450);
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

function moverHaciaDerecha(indice) {

    if (indice >= 0 && indice < edadesIzquierdo.length) {
        const valor = edadesIzquierdo[indice];
        edadesDerecho.push(valor);
        edadesIzquierdo.splice(indice, 1);

        pintarArregloIzquierdo();
        pintarArregloDerecha();

        requestAnimationFrame(() => {
        const filas = document.querySelectorAll('#tablaDerecha tr');
        const ultima = filas[filas.length - 1];
        if (ultima) {
            ultima.classList.add('row-move');
            setTimeout(() => ultima.classList.remove('row-move'), 600);
            }
        });
    }
}

function moverHaciaIzquierda(indice) {
    if (indice >= 0 && indice < edadesDerecho.length) {
        const valor = edadesDerecho[indice];
        edadesIzquierdo.push(valor);
        edadesDerecho.splice(indice, 1);

        pintarArregloIzquierdo();
        pintarArregloDerecha();
        
        requestAnimationFrame(() => {
        const filas = document.querySelectorAll('#tablaIzquierda tr');
        const ultima = filas[filas.length - 1];
        if (ultima) {
            ultima.classList.add('row-move');
            setTimeout(() => ultima.classList.remove('row-move'), 600);
            }
        });

    }
}

document.addEventListener("DOMContentLoaded", function () {
    pintarArregloIzquierdo();
    pintarArregloDerecha();
});

// Reemplaza la parte que manejaba #themeToggle con este código para #themeSwitch
function applyStoredOrSystemTheme() {
  const stored = localStorage.getItem('theme'); // 'dark' | 'light' | null
  if (stored === 'dark') {
    document.body.classList.add('dark');
  } else if (stored === 'light') {
    document.body.classList.remove('dark');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

document.addEventListener("DOMContentLoaded", function () {


  // aplicar tema inicial
  applyStoredOrSystemTheme();

    // ya tenías estas llamadas:
  pintarArregloIzquierdo();
  pintarArregloDerecha();

  // inicializar switch
  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    // reflejar estado actual en el switch
    const isDark = document.body.classList.contains('dark');
    themeSwitch.checked = isDark;
    themeSwitch.setAttribute('aria-checked', isDark ? 'true' : 'false');

    // listener: al cambiar, alternar clase, guardar y actualizar aria
    themeSwitch.addEventListener('change', () => {
      const nowDark = themeSwitch.checked;
      if (nowDark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      themeSwitch.setAttribute('aria-checked', nowDark ? 'true' : 'false');
    });
  }
});