const container = document.querySelector('.container');
const pokeButton = document.getElementById('poke-search');
const pokeBox = document.querySelector('.poke-box');
const pokeDetails = document.querySelector('.poke-details');
const error404 = document.querySelector('.not-found');

const searchPokemon = () => {
  function handleNotFound() {
    container.style.height = '480px';
    pokeBox.style.display = 'none';
    pokeDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fade-in');
  }
  
  function displayPokemonDetails(json) {
    container.style.height = '600px';
    error404.style.display = 'none';
    pokeBox.style.display = 'block';
    pokeDetails.style.display = 'flex';
    error404.classList.remove = 'fade-out';
    const image = document.getElementById('poke-img');
    const name = document.getElementById('poke-name');
    const type = document.querySelector('.poke-type .text span');
    const move = document.querySelector('.poke-move .text span');

    name.innerHTML = `#${json.id} ${json.name}`
    image.src = `${json.sprites.other.dream_world.front_default}`;
    type.innerHTML = `${json.types['0'].type.name}`
    type.style.textTransform = 'capitalize'
    move.innerHTML = `${json.moves['0'].move.name}`;
    move.style.textTransform = 'capitalize'
  }
  let pokemon = document.querySelector('#pokemon').value;
  const API = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

  if(pokemon === '') return;
  fetch(API)
    .then(response => {
      if (response.status === 404) {
        handleNotFound();
        throw new Error('Pokémon not found');
      }
      return response.json();
    })
    .then(displayPokemonDetails)
    .catch(error => {
      console.error(error);
    });
}

pokeButton.addEventListener('click', searchPokemon)
