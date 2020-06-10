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
   var datos = {
       nombre: nombre
   }
   console.log(datos);
   return datos;
}

function buscar(){
    var id = document.getElementById('idUsuario').value;
    datos = datos();
     axios({
         method: 'patch',
         url: url + id,
         headers:{
            'Authorization': "bearer "+localStorage.getItem("token")
        },
        data: datos
     }).then(function(res){
        if (res.data.code==200){
            alert("Nombre de Empleado Modificado Correctamente");
        }
        else{
            alert("Error");
        } 
     }).catch(function(err)  {
         console.log(err);
     })
}