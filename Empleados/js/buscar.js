window.onload = init;
var url = "http://localhost:3000/empleados/"

function init(){
    if(localStorage.getItem("token")){
        document.getElementById('Buscar').addEventListener('click', buscar);
        document.getElementById('Menu').addEventListener('click', function(){
            window.location.href ="Menu.html"
        });
        
    }
    else{
        window.location.href = "index.html"
    }
}

function buscar(){
    var nombre = document.getElementById('nombre').value;
    
     axios({
         method: 'get',
         url: url + nombre,
         headers:{
            'Authorization': "bearer "+localStorage.getItem("token")
        }
     }).then(function(res){
        if (res.data.code==200){
           displya(res.data.message);
            alert("Empleado encontrado");
        }
        else{
            alert("Empleado no encontrado");
        } 
     }).catch(function(err)  {
         console.log(err);
     })
}
function displya(Epmleado){
    var body = document.getElementById("DatosEmpleado");
        body.innerHTML += `<h4>Id: ${Epmleado[0].id_empleado}</h4>`;
        body.innerHTML += `<h4>Nombre: ${Epmleado[0].nombre}</h4>`;
        body.innerHTML += `<h4>Apellidos: ${Epmleado[0].apellidos}</h4>`;
        body.innerHTML += `<h4>Email: ${Epmleado[0].email}</h4>`;
        body.innerHTML += `<h4>Direccion: ${Epmleado[0].direccion}</h4>`;
}