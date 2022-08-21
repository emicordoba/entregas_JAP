const obtenerAutos = async () => {
  try {
    const respuesta = await fetch(
      "https://japceibal.github.io/emercado-api/cats_products/101.json"
    );
    console.log(respuesta);
    const datos = await respuesta.json();
    return datos.products;
  } catch (error) {
    console.log(error);
  }
};

obtenerAutos();

async function showProductsList() {
  let listadoAutos = "";
  let lista = await obtenerAutos();
  for (let i = 0; i < lista.length; i++) {
    listadoAutos += ` 
<div onclick="setCatID(${lista[i].id})" class="list-group-item list-group-item-action cursor-active">
<div class="row">
    <div class="col-3">
        <img src="${lista[i].image}" alt="${lista[i].description}" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${lista[i].name}</h4>
            <small class="text-muted">${lista[i].soldCount} artículos</small>
        </div>
        <p class="mb-1">${lista[i].description}</p>
    </div>
</div>
</div>
`;
  }

  document.getElementById("productos").innerHTML = listadoAutos;
}

document.addEventListener("DOMContentLoaded", () => {
  showProductsList();
});
