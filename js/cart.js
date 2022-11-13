const userCart =  "https://japceibal.github.io/emercado-api/user_cart/25801.json";

let carritoObtenido ="";


async function peticionCart(enlace) {
  try {
    let respuestaCart = await fetch(enlace);
    let infoCart = await respuestaCart.json();
    return infoCart.articles;
  } catch (error) {
    console.log(error);
  }
}



function calcularSubTotal(array,i) {

    let cantidad = document.getElementById('cant' + i).value;

    array.count = cantidad;

    let resultado = cantidad *array.unitCost;
    
    document.getElementById('subtotal' + i).innerHTML = array.currency +" "+resultado;

    document.getElementById("nuevoSub").innerHTML = resultado;
   }




function mostrarCarrito(array) {
  let listadoCarrito = "";
  let cart = array;

  for (let i = 0; i < cart.length; i++) {
    listadoCarrito += `
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <p><span class="h4">Artículos a comprar</span></p>
    
            <div class="card mb-4">
              <div class="card-body p-4">
    
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <img src="${cart[i].image}"
                      class="img-fluid" alt="Generic placeholder image">
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Nombre</p>
                      <p class="lead fw-normal mb-0">${cart[i].name}</p>
                    </div>
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-4 pb-2">Costo</p>
                    <p class="lead fw-normal mb-0">${cart[i].currency} ${cart[i].unitCost}</p>
                  </div>
                </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Cantidad</p>
                      <input onchange="calcularSubTotal(carritoObtenido[${i}],${i})" id="cant${i}" min="0" name="quantity" value="${cart[i].count}" type="number"
                class="form-control form-control-sm" />
                <div id="invalid-input" class="invalid-feedback">
                Seleccione una cantidad 
              </div>
                    </div>
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Subtotal</p>
                      <p class="lead fw-normal mb-0" id="subtotal${i}" name="subto">${cart[i].currency} ${cart[i].unitCost}</p>
                    </div>
                  </div>
                </div>
    
              </div>
            </div>
    
          </div>
        </div>
      </div>
      
      `;
      document.getElementById("nuevoSub").innerHTML =  cart[i].unitCost;
  }
  
  document.getElementById("carritoUser").innerHTML = listadoCarrito;
}


let inputUno = document.getElementById("gridRadios1");
let inputDos = document.getElementById("gridRadios2");
let inputTres = document.getElementById("gridRadios3");

inputUno.addEventListener('focus', ()=>{

 let subtotalUno = document.getElementById("nuevoSub").innerText;
 let envPremium = 0.15;
 let result = subtotalUno * envPremium;
 let suma = parseFloat(subtotalUno) + parseFloat(result);
  document.getElementById("costEnv").innerHTML = result
  document.getElementById("total").innerHTML = suma
})

inputDos.addEventListener('focus', ()=>{

  let subtotalUno = document.getElementById("nuevoSub").innerText;
  let envExpress = 0.07;
  let result = subtotalUno * envExpress;
  let suma = parseFloat(subtotalUno) + parseFloat(result);
   document.getElementById("costEnv").innerHTML = result
   document.getElementById("total").innerHTML = suma
 })

 inputTres.addEventListener('focus', ()=>{

  let subtotalUno = document.getElementById("nuevoSub").innerText;
  let envStandard = 0.05;
  let result = subtotalUno * envStandard;
  let suma = parseFloat(subtotalUno) + parseFloat(result);
   document.getElementById("costEnv").innerHTML = result
   document.getElementById("total").innerHTML = suma
 })

let botonFinalizar = document.getElementById("finalizar-compra");

botonFinalizar.addEventListener('click', function(){

  
  let inputCalle = document.getElementById("inputCalle");

    let displayCalle1 = document.getElementById("valid-calle");
    let displayCalle2 = document.getElementById("invalid-calle")
    if (inputCalle.value.length > 0 ){
        displayCalle1.style.display = "block";
        displayCalle2.style.display = "none"
    } else {
        displayCalle1.style.display = "none";
        displayCalle2.style.display = "block"
    }


    let inputNumero = document.getElementById("inputNumero");
    let displayNumero1 = document.getElementById("valid-numero");
    let displayNumero2 = document.getElementById("invalid-numero")
    if (inputNumero.value.length > 0 ){
        displayNumero2.style.display = "none";
        displayNumero1.style.display = "block";
    } else {
        displayNumero1.style.display = "none";
        displayNumero2.style.display = "block"
    }


    let inputEsquina = document.getElementById("inputEsquina");
    let displayEsquina1 = document.getElementById("valid-esquina");
    let displayEsquina2 = document.getElementById("invalid-esquina");
    if (inputEsquina.value.length > 0 ){
        displayEsquina2.style.display = "none";
        displayEsquina1.style.display = "block";
    } else {
        displayEsquina1.style.display = "none";
        displayEsquina2.style.display = "block"
    }


    let costoenvio = document.getElementById("costEnv");
    let envio1 = document.getElementById("valid-envio");
    let envio2 = document.getElementById("invalid-envio");
    if (costoenvio.innerText == null || costoenvio.innerText =='' || costoenvio.innerText == undefined){
        envio2.style.display = "block";
        envio1.style.display = "none";
    }else{
        envio1.style.display = "block";
        envio2.style.display = "none";
    }



    let pago1 = document.getElementById("valid-pago");
    let pago2 = document.getElementById("invalid-pago");

    let numcuenta1 = document.getElementById("valid-numcuenta");
    let numcuenta2 = document.getElementById("invalid-numcuenta");

    let tcredito1 = document.getElementById("valid-tcredito");
    let tcredito2 = document.getElementById("invalid-tcredito");

    let campoformadepago = document.getElementById("campo-formadepago")

    if (!tarjetadecredito.checked){
        if(!transferenciabancaria.checked){
            pago2.style.display = "block";
            pago1.style.display = "none";
        }else{
            tcredito1.style.display = "none";
            tcredito2.style.display = "none";
            if(numdecuenta.value.length > 0){
                numcuenta1.style.display = "block";
                numcuenta2.style.display = "none";

                pago1.style.display = "block";
                pago2.style.display = "none";
                campoformadepago.innerHTML = 'Transferencia bancaria';
            }else{
                numcuenta2.style.display = "block";
                numcuenta1.style.display = "none";
            }
        }
        
    }else{
        numcuenta2.style.display = "none";
        numcuenta1.style.display = "none";
        if(numdetarjeta.value.length > 0 && codigodeseg.value.length > 0 && vencimiento.value.length > 0){
            tcredito1.style.display = "block";
            tcredito2.style.display = "none";

            pago1.style.display = "block";
            pago2.style.display = "none";

            campoformadepago.innerHTML = 'Tarjeta de credito';
        }else{
            tcredito2.style.display = "block";
            tcredito1.style.display = "none";
        }
        
    }

    let inputcantidad = document.getElementById("cant0");
    let invalidinput = document.getElementById("invalid-input");
    if(inputcantidad.value >= 1){
        invalidinput.style.display = "none";
    }else{
        
        invalidinput.style.display = "block";
    }



    if(inputCalle.value.length > 0 && inputNumero.value.length > 0 && inputEsquina.value.length > 0){
        if(gridRadios1.checked || gridRadios2.checked || gridRadios3.checked){
            if(inputcantidad.value > 0){
                if(tarjetadecredito.checked){
                    if(numdetarjeta.value.length > 0 && codigodeseg.value.length > 0 && vencimiento.value.length > 0){
                        let success = document.getElementById("success");
                        success.innerHTML = `
                        <div class="alert alert-success" role="alert">
                        ¡Has comprado con éxito!
                        </div>
                        `
                    }
                }else if (transferenciabancaria.checked){
                    if(numdecuenta.value.length > 0){
                        let success = document.getElementById("success");
                        success.innerHTML = `
                        <div class="alert alert-success" role="alert">
                        ¡Has comprado con éxito!
                        </div>
                        `
                    }
                }
                
            }
        }
    }



})


let tarjetadecredito = document.getElementById("tarjeta-de-credito");
let transferenciabancaria = document.getElementById("transferencia-bancaria");
let numdecuenta = document.getElementById("numero-de-cuenta");
let numdetarjeta = document.getElementById("numero-de-tarjeta");
let codigodeseg = document.getElementById("codigo-de-seg");
let vencimiento = document.getElementById("vencimiento");


tarjetadecredito.addEventListener('focus', function (){
    numdecuenta.disabled = true;
    numdetarjeta.disabled = false;
    codigodeseg.disabled = false;
    vencimiento.disabled = false;
})

transferenciabancaria.addEventListener('focus', function(){
    numdetarjeta.disabled = true;
    codigodeseg.disabled = true;
    vencimiento.disabled = true;
    numdecuenta.disabled = false;
})



document.addEventListener("DOMContentLoaded", async () => {

  carritoObtenido = await peticionCart(userCart);
  
  mostrarCarrito(carritoObtenido);


});
