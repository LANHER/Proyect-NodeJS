window.onload = init;
var headers = {};
var url = "http://localhost:3000"

function init(){
    if(localStorage.getItem("token")){
        document.getElementById('Boton').addEventListener('click', function(){
            window.location.href ="AgregarEmpleados.html"
        });
        document.getElementById('Eli').addEventListener('click', function(){
            window.location.href = "Eli.html"
        });
        document.getElementById('Modificar').addEventListener('click', function(){
            window.location.href = "Modificar.html"
        });
        document.getElementById('ModificarName').addEventListener('click', function(){
            window.location.href = "ModificarNombre.html"
        });
        document.getElementById('Buscar').addEventListener('click', function(){
            window.location.href = "Busqueda.html"
        });
        document.getElementById('Salir').addEventListener('click', function(){
            localStorage.removeItem("token");
            window.location.href = "index.html"
        });
    }
    else{
        window.location.href="index.html";
    }
}

