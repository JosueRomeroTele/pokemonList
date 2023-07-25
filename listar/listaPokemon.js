const listaPokemones = document.querySelector("#listaPokemones");
const anteriorInf = document.querySelector("#anteriorInf");
const siguienteInf = document.querySelector("#siguienteInf");

const anterior = document.querySelector("#anterior");
const siguiente = document.querySelector("#siguiente");

var spinner =  document.getElementById("spinner");

let url = "https://pokeapi.co/api/v2/pokemon/";
let offset=1;
let limit=20;

anteriorInf.addEventListener('click',()=>{
    if(offset != 1){
        offset -=20;
        removerPokemones();
        cantidadPokemones(offset,limit)
    }
 
});


siguienteInf.addEventListener('click',()=>{
    offset +=20;
    removerPokemones();
    cantidadPokemones(offset,limit);
});


anterior.addEventListener('click',()=>{
    if(offset != 1){
        offset -=20;
        removerPokemones();
        cantidadPokemones(offset,limit)
    }
 
});


siguiente.addEventListener('click',()=>{
    offset +=20;
    removerPokemones();
    cantidadPokemones(offset,limit);
});


cantidadPokemones(offset,limit);

function cantidadPokemones(offset,limit) {
    
    //mostar spinner
    spinner.style.display ="block";

    for(let i =offset; i<offset + limit; i++){
        fetch(url+i)
        .then((response)=> response.json())
        .then(data=>{ 
            mostrarPokemon(data);
            //ocultar spinner
            spinner.style.display = "none";
        })
    }
}

function mostrarPokemon(data){

    let tipos = data.types.map((type)=>`<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let number = data.id.toString();
    if(number.length === 1){
        number = "00"+number;
    }else if (number.length ===2){
        number = "0"+ number;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.classList.add("col-md-3");
    div.innerHTML=`
        <div class="card text-center" style="margin: 1rem;">
            <input clas="img-pokemon card-img-top" type="image" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"  onclick="detallePokemon(${data.id})" />

            <div class="card-body">
                <h5 clas="card-tittle"> ${data.name} N° ${number} </h5>
            </div>
            <div>
            </div>
        </div>    
        `;
    listaPokemones.append(div);
    }

function detallePokemon(id){
    var data = encodeURIComponent(id);
    window.location.href= "detalle/detallePokemon.html?data="+data;
}

function removerPokemones(){
    while(listaPokemones.firstChild){
        listaPokemones.removeChild(listaPokemones.firstChild);
    }
}
