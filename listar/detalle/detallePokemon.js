
var datoRecibido = obtenerParametroURL("data");
let idPokemon=decodeURIComponent(datoRecibido);





const nombre = document.querySelector("#atributo-nombre");
const peso = document.querySelector("#atributo-peso");
const altura = document.querySelector("#atributo-altura");
const types = document.querySelector("#atributo-tipos");


const imagenPokemon = document.getElementById("imgPokemon");
const habilidadesFront = document.getElementById("atributo-habilidades");

const primerPoke = document.getElementById("primerPokemon");
const primerPokeImg = document.getElementById("imgPokemon1");

const segundoPoke = document.getElementById("segundoPokemon");
const segundoPokeImg = document.getElementById("imgPokemon2");

const tercerPoke = document.getElementById("tercerPokemon");
const tercerPokeImg = document.getElementById("imgPokemon3");


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
    });

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
    evolucionts(data)
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


function evolucionts(data){
    var url_nombre = "https://pokeapi.co/api/v2/pokemon-species/"+data.name

    fetch(url_nombre)
    .then((response)=> response.json())
    .then(data2=>{ 

        fetch(data2.evolution_chain.url)
        .then((reponse2)=>reponse2.json())
        .then(data3=>{

            let unPoke = data3.chain.species.name;
            primerPoke.innerHTML = unPoke; 
            obtenerImgEvo(unPoke,primerPokeImg)
  
            let dosPoke = data3.chain.evolves_to[0].species.name;
            segundoPoke.innerHTML = dosPoke;
            obtenerImgEvo(dosPoke,segundoPokeImg)

            let tresPoke=data3.chain.evolves_to[0].evolves_to[0].species.name;
            tercerPoke.innerHTML = tresPoke;
            obtenerImgEvo(tresPoke,tercerPokeImg);

        })
      
    });

}

function obtenerImgEvo(pokemon,img){
    
    let urlPokemon = 'https://pokeapi.co/api/v2/pokemon/'+pokemon;
    
    fetch(urlPokemon).then((response)=>response.json())
    .then(dataImg=>{
        // console.log(dataImg.sprites.other["official-artwork"].front_default);
        img.src= dataImg.sprites.other["official-artwork"].front_default
    });


}