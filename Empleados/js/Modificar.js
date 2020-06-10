window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados/"

function init(){
    if(localStorage.getItem("token")){
        document.getElementById('Modificar').addEventListener('click', buscar);
        document.getElementById('Menu').addEventListener('click', function(){
            window.location.href ="Menu.html"
        });
    }
    else{
        window.location.href="index.html";
    }
}
function datos(){
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var direccion = document.getElementById('direccion').value;
   var datos = {
       nombre: nombre,
       apellidos: apellidos,
       telefono: telefono, 
       email: email,
       direccion: direccion 
   }
   console.log(datos);
   return datos;
}

function buscar(){
    var id = document.getElementById('idUsuario').value;
    datos = datos();
     axios({
         method: 'put',
         url: url + id,
         headers:{
            'Authorization': "bearer "+localStorage.getItem("token")
        },
        data: datos
     }).then(function(res){
        if (res.data.code==200){
            alert("Empleado Modificado Correctamente");
        }
        else{
            alert("Error");
        } 
     }).catch(function(err)  {
         console.log(err);
     })
}