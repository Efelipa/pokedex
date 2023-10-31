const container = document.querySelector('.container');
const pokeButton = document.getElementById('poke-search');
const pokeBox = document.querySelector('.poke-box');
const pokeDetails = document.querySelector('.poke-details');
const error404 = document.querySelector('.not-found');

pokeButton.addEventListener('click', () => {
  let pokemon = document.querySelector('#pokemon').value;
  const API = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
  if(pokemon === '') return;
  fetch(API)
    .then(response => response.json())
    .then(json => {
      if(json.cod  === '404') {
        container.style.height = '600px';
        pokeBox.style.display = 'none';
        pokeDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add = 'fade-in';
        return;
      } else {
        container.style.height = '600px';
        error404.style.display = 'none';
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
    })
})
