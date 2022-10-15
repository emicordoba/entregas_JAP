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
    
    document.getElementById('subtotal' + i).innerHTML = array.currency + resultado;
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
                    </div>
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Subtotal</p>
                      <p class="lead fw-normal mb-0" id="subtotal${i}">${cart[i].currency} ${cart[i].unitCost}</p>
                    </div>
                  </div>
                </div>
    
              </div>
            </div>
    
          </div>
        </div>
      </div>
      
      `;
  }

  document.getElementById("carritoUser").innerHTML = listadoCarrito;
}





document.addEventListener("DOMContentLoaded", async () => {

  carritoObtenido = await peticionCart(userCart);
  
  mostrarCarrito(carritoObtenido);

});
