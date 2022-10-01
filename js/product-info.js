// Obtengo del local storage el id del producto y lo guardo. Luego lo inserto en el const url -lo mismo con los comentarios-
const guardadoProducto = localStorage.getItem('product');
const urlProduct =`https://japceibal.github.io/emercado-api/products/${guardadoProducto}.json`;
const urlComentario = `https://japceibal.github.io/emercado-api/products_comments/${guardadoProducto}.json`;

// Funcion para realizar la peticion al JSON

async function peticionProducto(enlace) {
  try {
    let respuestaProduct = await fetch (enlace);
    let infoProduct = respuestaProduct.json();
    return infoProduct;
  } catch (error){
    console.log(error);
  }
}


//Funcion que realiza una peticion, para odbtener los prodcutos relacionados de un producto en particular

async function obtenerProductoRelacionado(){

  const petProd = await fetch(urlProduct);
  const respuestaProduct = await petProd.json();

  return respuestaProduct.relatedProducts;
  
}



// Funcion para recorrer las imagenes 


 function recorrerImagenes(imagenes){
  let fotos = "";
  for( let img of imagenes){
   fotos += `
      <img src="`+ img + `" class="col-3 m-1">
    `
  }
  return fotos;
 }


 function puntuacion(num){
  let estrellas = ""; 
  for (let i = 1; i <= 5; i++){
    if (i<=num){
      estrellas += `<i class="fas fa-star checked"></i>`;
    } else {
      estrellas += `<i class="far fa-star"></i>`
    }
  }
  return estrellas;
}





// Funcion que recorre y muestra los comentarios

 function mostrarComentarios(coments){

  let listaComentarios ="";
  let com = coments;

  for( let i = 0; i < com.length; i++){
    listaComentarios += ` 
    <div class="container">
        <div class="row border">
          <div class="row">
          <div class="d-flex align-items-center">
              <p class="m-0"><strong>${com[i].user}</strong></p>
              <p class="m-0"> - ${com[i].dateTime} - </p>
              <p class="m-0"> `+ puntuacion(com[i].score) +` </p>
          </div>
          </div>
          <div class="row mt-2">
          <p>${com[i].description}</p>
          </div>
      </div>
      </div>
    `
  }
  
  document.getElementById('insertComment').innerHTML+= listaComentarios;

 }



// Funcion para mostrar el producto seleccionado 

function showProduct(prod){ 

  let infoProducto = "";
  infoProducto += `   <div class="container">
  <div>
    <h2 class="mt-4">${prod.name}</h2>
    <hr>
    <p class="m-0"><strong>Precio</strong></p>
    <p class="m-0">${prod.currency} ${prod.cost}</p>
    <p class="mt-3 mb-0"><strong>Descripción</strong></p>
    <p class="m-0"> ${prod.description} </p>
    <p class="mt-3 mb-0"><strong>Categoría</strong></p>
    <p class="m-0">${prod.category}</p>
    <p class="mt-3 mb-0"><strong>Cantidad de vendidos</strong></p>
    <p class="mb-0">${prod.soldCount}</p>
    <p class="mt-3 mb-0"><strong>Imágenes ilustrativas</strong></p>
    <br>
    <div class="d-flex"> ` + recorrerImagenes(prod.images) + ` </div>
</div>`

document.getElementById('insertProduct').innerHTML += infoProducto;

}

// Funcion que muestre el producto relacionado


function showRelatedProducts (prodRel){
   
  let infoRelatedProducts = "";
  let listado = prodRel;

  for (let i = 0; i < listado.length; i++){
    infoRelatedProducts += `
    <div class="row d-flex " onclick = "mostrarProductoRel(${prodRel[i].id})">
    <div> <img src="${listado[i].image}" class="col-2"> </div>
    <div> <h5 class="mt-3">${listado[i].name}</h5> </div>
    </div>
    `
  }


  document.getElementById('prodRelacionado').innerHTML += infoRelatedProducts;


}

// Funcion que se ejecuta al hacer click en un producto relacionado

async function mostrarProductoRel (id){
  const obtenerProducto = localStorage.setItem('product',id);
  location.reload();
}





document.addEventListener('DOMContentLoaded', async ()=>{

  let productoObtenido = await peticionProducto(urlProduct);
  showProduct(productoObtenido);

  let commentObtenido = await peticionProducto(urlComentario);
  mostrarComentarios(commentObtenido);
  
  let arrayRelProd = await obtenerProductoRelacionado();
  showRelatedProducts(arrayRelProd);
})