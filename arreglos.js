let edadesIzquierdo =[];
let edadesDerecho = [];

function agregarEdad(){
    let edad = parseInt(document.getElementById("edad").value);
    if(!isNaN(edad)){
        edadesIzquierdo.push(edad)
    }else{
        alert("Ingrese un numero válido");
    }
    
}