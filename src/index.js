let addToy = false;
const toyCollection = document.querySelector('div#toy-collection')
const toyAddForm = document.querySelector('form.add-toy-form')

const getAllToys = () => {
  fetch('http://localhost:3000/toys').then(res => res.json())
  .then(data => data.forEach(toy => renderToy(toy)))
}

const updateToy = toy => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

const renderToy = toy => {
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <div>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class='toy-avatar'/>
    <p>${toy.likes} Likes</p>
    <button class='like-btn' id=${toy.id}>Like</button>
  </div>
  `
  card.querySelector('button.like-btn').addEventListener('click', () => {
    toy.likes++
    card.querySelector('p').innerText = `${toy.likes} Likes`
    updateToy(toy)
  })
  toyCollection.appendChild(card)
}

function addToyToBackEnd(toyObj){  
  // console.log(JSON.stringify(toyObj))
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(newToy => renderToy(newToy))
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getAllToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyAddForm.addEventListener('submit', e => {
    e.preventDefault()
    // console.log('e.target:', e.target.children)
    let newToy = {
      name: e.target.children[1].value,
      image: e.target.children[3].value,
      likes: 0
    }
    addToyToBackEnd(newToy)
  })
});
