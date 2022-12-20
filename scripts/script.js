
//Pegando nomes dos pokemons
async function getPokemonNames() {
    let pokeListNames = [];
    let urlApi = "https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10000";
    let response = await fetch(urlApi);
    let data = await response.json();
  
    data.results.forEach(pokemon => {
      pokeListNames.push(pokemon.name)
    });
  
    return pokeListNames;
  }
  
function redrawSelectedListItem(listHtmlArray, lastPokeIdSelected, pokeIdSelected){
    listHtmlArray[pokeIdSelected].scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});

    listHtmlArray[lastPokeIdSelected].style.backgroundColor = 'rgb(180, 252, 186)';
    listHtmlArray[pokeIdSelected].style.backgroundColor = 'rgba(0, 0, 0, 0.267)';
}

  function clickElementList(name, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves) {
    updateView(name, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves);
  }
  
  async function updateView(pokemon, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves) {
    const pokeObject = await getPokemonInfo(pokemon);
  
    pokeName.innerHTML = pokeObject.name;
    pokeImg.src = pokeObject.sprites.other["dream_world"].front_default;
    pokeLife.innerHTML = "HP: " + pokeObject.stats[0].base_stat;
    pokeAtack.innerHTML = "ATK: " + pokeObject.stats[1].base_stat;
    pokeDefense.innerHTML = "DEF: " + pokeObject.stats[2].base_stat;
  
    pokeMoves[0].innerHTML = "ATK1: "+ "<br>" +pokeObject.abilities[0].ability.name;
    pokeMoves[1].innerHTML = "ATK2: "+ "<br>" +pokeObject.abilities[1].ability.name;
  }
  
  async function main() {
    let pokeName = document.getElementById("name-poke");
    let pokeImg = document.getElementById("img-poke");
    let pokeLife = document.getElementById("vida");
    let pokeDefense = document.getElementById("defesa");
    let pokeAtack = document.getElementById("ataque");
  
    let move1 = document.getElementById("atk-1");
    let move2 = document.getElementById("atk-2");

    let btnSelect = document.getElementById("btnSelect");
    let btnUp = document.getElementById("btnUp");
    let btnDown= document.getElementById("btnDown");

    let pokeMoves = [move1, move2];
  
    let pokeIdSelected = "221";
    let lastPokeIdSelected;
    let listHtmlArray;

    let listHtml = document.getElementById("list-poke");
  
    const pokeListNames = await getPokemonNames();
  
    //criando a list elemento por elemento
    pokeListNames.forEach(pokemon => {
      let listItem = document.createElement("li");
      listItem.innerHTML = pokemon;
      listItem.onclick = () => {
        clickElementList(listItem.innerHTML, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves);
        
        lastPokeIdSelected = pokeIdSelected;
        pokeIdSelected = listHtmlArray.indexOf(listItem);
        
        redrawSelectedListItem(listHtmlArray, lastPokeIdSelected, pokeIdSelected);
      }
      listHtml.appendChild(listItem);
    })
  
    listHtmlArray = [...listHtml.children];
    
    btnDown.onclick = () =>{
      if(pokeIdSelected < listHtmlArray.length){
        lastPokeIdSelected = pokeIdSelected;
        pokeIdSelected += 1;
        
        redrawSelectedListItem(listHtmlArray, lastPokeIdSelected, pokeIdSelected);
      }
    }    

    btnUp.onclick = () =>{
      if(pokeIdSelected > 0){
        lastPokeIdSelected = pokeIdSelected;
        pokeIdSelected -= 1;
        console.log(pokeIdSelected)
      
        redrawSelectedListItem(listHtmlArray, lastPokeIdSelected, pokeIdSelected);
      }
    }

    btnSelect.onclick = () =>{
      clickElementList(listHtmlArray[pokeIdSelected].innerHTML, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves);
    }
  
  }
  
  async function getPokemonInfo(id) {
    let urlApi = "https://pokeapi.co/api/v2/pokemon/" + id;
    //lebrar de transformar isso em uma funçao kkkkkkk preguiça da peste qro deixar logo
    //funcionando depois eu limpo td kkkkk
    let response = await fetch(urlApi);
    let data = await response.json();
  
    return data;
  }
  
  main();