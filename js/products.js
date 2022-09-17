const obtenerDatos = localStorage.getItem('catID');
const guardarDatos = `https://japceibal.github.io/emercado-api/cats_products/${obtenerDatos}.json`;


let minCost = undefined;
let maxCost = undefined;


const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(guardarDatos);
    const datos = await respuesta.json();
    console.log(datos.products)
    return datos.products;
  } catch (error) {
    console.log(error);
  }
};


// Función que obtiene del JSON el nombre de la categoría seleccionada

async function obtenerNombre(){
  const nom = await fetch(guardarDatos);
  const noms = await nom.json();
  return noms.catName;
}

obtenerProductos();





async function mostrarProducto (id){
  const obtenerProducto = localStorage.setItem('product',id);
  location.href = 'product-info.html';
}



async function showProductsList(array) {
  let listadoAutos = "";
  let lista = array;
  for (let i = 0; i < lista.length; i++) {

    if (((minCost == undefined) || (minCost != undefined && parseInt(lista[i].cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(lista[i].cost) <= maxCost))){

    listadoAutos += ` 
<div onclick="setCatID(${lista[i].id})" class="list-group-item list-group-item-action cursor-active">
<div class="row" onclick = "mostrarProducto(${array[i].id})">
    <div class="col-3">
        <img src="${lista[i].image}" alt="${lista[i].description}" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${lista[i].name} ${lista[i].currency} ${lista[i].cost}</h4>
            <small class="text-muted">${lista[i].soldCount} artículos</small>
        </div>
        <p class="mb-1">${lista[i].description}</p>
    </div>
</div>
</div>
`; }
  }

  document.getElementById("productos").innerHTML = listadoAutos;
  
}

function ordenar(array, numero){
  let result = [];
  if (numero == "1")
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      }); 
  }
  if (numero == "2"){
    result = array.sort(function(a, b) {
      if ( a.cost > b.cost ){ return -1; }
      if ( a.cost < b.cost ){ return 1; }
      return 0;
  });
  }
  if (numero == "3"){
    result = array.sort(function(a, b) {
      if ( a.soldCount> b.soldCount ){ return -1; }
      if ( a.soldCount < b.soldCount ){ return 1; }
      return 0;
  });
  }
  return result;

}

document.addEventListener("DOMContentLoaded", async () => {
  
  let arrayOriginal = await obtenerProductos();
 
  showProductsList(arrayOriginal); 
  
  document.getElementById('nombreCat').innerHTML+= await obtenerNombre();

  document.getElementById('sortAsc').addEventListener('click',()=>{
    let ordenadoAscendente = ordenar(arrayOriginal, '1');
    showProductsList(ordenadoAscendente);
  });

  document.getElementById('sortDesc').addEventListener('click',()=>{
    let ordenadoDescendente = ordenar (arrayOriginal, '2');
    showProductsList(ordenadoDescendente);
  });

document.getElementById('sortByCount').addEventListener('click',()=>{
  let ordenadoRelevancia = ordenar(arrayOriginal, "3");
  showProductsList(ordenadoRelevancia);
})

document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  minCost = undefined;
  maxCost = undefined;

  showProductsList(arrayOriginal);
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
  minCost = document.getElementById("rangeFilterCountMin").value;
  maxCost = document.getElementById("rangeFilterCountMax").value;

  if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
      minCost = parseInt(minCost);
  }
  else{
      minCost = undefined;
  }

  if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
      maxCost = parseInt(maxCost);
  }
  else{
      maxCost = undefined;
  }

  showProductsList(arrayOriginal);
});

});
