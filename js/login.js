function login (){

    let usuario = document.getElementById('username').value;
    let clave = document.getElementById('clave').value;
    
    if (usuario==="" || clave===""){
        document.getElementById('username').classList.add('error');
        document.getElementById('clave').classList.add('error');
        alert("Debe ingresar un email y una contraseña");    
    } else {
        localStorage.setItem('user',usuario);
        location.href='home.html';
    }
    }
    
    document.addEventListener('DOMContentLoaded',()=>{
        document.getElementById('inicio').addEventListener('click',()=> {
            login()
        })
    }
    
    )