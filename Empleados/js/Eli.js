window.onload = init;
var url = "http://localhost:3000"

function init(){
    if(localStorage.getItem("token")){
        document.getElementById('Eli').addEventListener('click', Eli);
        document.getElementById('Menu').addEventListener('click', function(){
            window.location.href ="Menu.html"
        });
        
    }
    else{
        window.location.href = "index.html"
    }
}

function datos(){
    var id = document.getElementById('id_usuario').value;
    var id_usuario ={
        id_usuario: id
    }
   return id_usuario;
}

function Eli(){
    datos = datos();
     axios({
         method: 'delete',
         url: 'http://localhost:3000/empleados/delete',
         headers:{
            'Authorization': "bearer "+localStorage.getItem("token")
        },
        data: datos
        
     }).then(function(res){
        if (res.data.code==200){
            console.log(res);
            alert("Empleado eliminado");
        }
        else{
            alert("Error");
        } 
     }).catch(function(err)  {
         console.log(err);
     })
}
