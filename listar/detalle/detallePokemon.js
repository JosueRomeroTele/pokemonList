
var datoRecibido = obtenerParametroURL("data");
let idPokemon=decodeURIComponent(datoRecibido);





const nombre = document.querySelector("#atributo-nombre");
const peso = document.querySelector("#atributo-peso");
const altura = document.querySelector("#atributo-altura");
const types = document.querySelector("#atributo-tipos");


const imagenPokemon = document.getElementById("imgPokemon");
const habilidadesFront = document.getElementById("atributo-habilidades");


let arrayTabla=[  ['Stat', 'Base stat',]]
obtenerDetallesPokemon(idPokemon)

function obtenerParametroURL(nombre) {
    var url = new URL(window.location.href);
    return url.searchParams.get(nombre);
}

function obtenerDetallesPokemon(id){

    let url = "https://pokeapi.co/api/v2/pokemon/"+id

    fetch(url)
    .then((response)=> response.json())
    .then(data=>{ 
        console.log("respuesta detalle");
        console.log(data);
        detalles(data)
    })

}

function detalles(data){

    //nombre
    let nombreMay=data.name
    nombre.innerHTML = nombreMay.toUpperCase() + "  N°" + numeroPokemon(data);
    
    //altura 
    let numAltura = data.height/10;
    altura.innerText ="High : "+ numAltura + " m";
    //peso
    let numPeso = data.weight/10;
    peso.innerText ="Weight : "+ numPeso + " Kg";
    imagenPokemon.src = data.sprites.other["official-artwork"].front_default;

    //tipo 
    let tipos = data.types.map((type)=>`<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
    types.innerHTML=tipos;

    console.log('total de movimientos', data.moves.length)
    console.log('Habilidades', data.abilities)
    enumerarHabilidades(data);
    statPokemon(data)

}

function enumerarHabilidades(data){

    let habilidades = data.abilities.map((abilities)=>`<p class="${abilities.ability.name} tipo">${abilities.ability.name}</p>`);
    habilidades = habilidades.join('');
    habilidadesFront.innerHTML = habilidades
    console.log(habilidades)

}

function numeroPokemon(data){
    let number = data.id.toString();
    if(number.length === 1){
        number = "00"+number;
    }else if (number.length ===2){
        number = "0"+ number;
    }
    return number;
}


function statPokemon(data){
 
    for(let i=0;i<data.stats.length;i++){
        let stats = [ ]
        stats.push(data.stats[i].stat.name)
        stats.push(data.stats[i].base_stat)

        arrayTabla.push(stats)
    }
    console.log(arrayTabla)

}
