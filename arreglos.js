/* arreglos.js
   Lógica principal de la app + manejo robusto de tema.
   - Aplica tema inmediatamente si posible y otra vez en DOMContentLoaded.
   - Guarda preferencia en localStorage ('theme' = 'dark'|'light').
   - Initialize UI: pintar tablas y conectar theme switch.
*/

let edadesIzquierdo = [];
let edadesDerecho = [];

/* ==========================
   Funciones de la app
   ========================== */

function agregarEdad() {
  const input = document.getElementById("edad");
  const valor = parseInt(input.value, 10);

  if (!isNaN(valor) && valor >= 1 && valor <= 100) {
    edadesIzquierdo.push(valor);
    input.value = "";
    input.focus();
    pintarArregloIzquierdo();
  } else {
    alert("Ingrese una edad válida entre 1 y 100 años");
    input.value = "";
    input.focus();
  }
}

function pintarArregloIzquierdo() {
  const tbody = document.getElementById("tablaIzquierda");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (edadesIzquierdo.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.className = "empty";
    td.textContent = "arreglo izquierdo vacío";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  for (let i = 0; i < edadesIzquierdo.length; i++) {
    const edad = edadesIzquierdo[i];
    const tr = document.createElement("tr");

    const tdValor = document.createElement("td");
    tdValor.textContent = edad;
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

    // Entrada con animación y limpieza
    tr.classList.add("row-enter");
    setTimeout(() => tr.classList.remove("row-enter"), 500);
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
  if (!tbody) return;
  tbody.innerHTML = "";

  if (edadesDerecho.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.className = "empty";
    td.textContent = "arreglo derecho vacío";
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

    // Para animación de salida opcional podrías aplicar .row-exit al <tr> correspondiente antes de splice
    edadesIzquierdo.splice(indice, 1);

    pintarArregloIzquierdo();
    pintarArregloDerecha();

    // Resaltar la última fila en la tabla derecha (en el siguiente frame para asegurar repaint)
    requestAnimationFrame(() => {
      const filas = document.querySelectorAll("#tablaDerecha tr");
      const ultima = filas[filas.length - 1];
      if (ultima) {
        ultima.classList.add("row-move");
        setTimeout(() => ultima.classList.remove("row-move"), 600);
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
      const filas = document.querySelectorAll("#tablaIzquierda tr");
      const ultima = filas[filas.length - 1];
      if (ultima) {
        ultima.classList.add("row-move");
        setTimeout(() => ultima.classList.remove("row-move"), 600);
      }
    });
  }
}

/* ==========================
   Manejo de tema (claro/oscuro)
   ========================== */

function applyStoredOrSystemTheme() {
  const stored = localStorage.getItem("theme"); // 'dark' | 'light' | null
  if (stored === "dark") {
    document.body.classList.add("dark");
  } else if (stored === "light") {
    document.body.classList.remove("dark");
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// Intentar aplicar lo antes posible (si body ya existe)
if (document.body) {
  applyStoredOrSystemTheme();
}

// Inicialización final cuando DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  // asegurar tema
  applyStoredOrSystemTheme();

  // inicializar la UI
  pintarArregloIzquierdo();
  pintarArregloDerecha();

  // inicializar switch (si existe)
  const themeSwitch = document.getElementById("themeSwitch");
  if (themeSwitch) {
    const isDark = document.body.classList.contains("dark");
    themeSwitch.checked = isDark;
    themeSwitch.setAttribute("aria-checked", isDark ? "true" : "false");

    themeSwitch.addEventListener("change", () => {
      const nowDark = themeSwitch.checked;
      if (nowDark) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      themeSwitch.setAttribute("aria-checked", nowDark ? "true" : "false");
    });
  }
});