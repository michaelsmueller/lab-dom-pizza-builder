// jshint esversion: 6

// Write your Pizza Builder JavaScript in this file.

// Constants 
var basePrice = 10;
var ingredients = {
  pepperonni: {name: 'Pepperonni', price: 1},
  mushrooms: {name: 'Mushrooms', price: 1},
  greenPeppers: {name: 'Green Peppers', price: 1},
  whiteSauce: {name: 'White sauce', price: 3},
  glutenFreeCrust: {name: 'Gluten-free crust', price: 5}
};
var buttonClasses = [
  "btn-pepperonni",
  "btn-mushrooms",
  "btn-green-peppers",
  "btn-sauce",
  "btn-crust"
];

// Initial value of the state (the state values can change over time)
var state = {
  pepperonni: true,
  mushrooms: true,
  greenPeppers: true,
  whiteSauce: false,
  glutenFreeCrust: false
};

// This function takes care of rendering the pizza based on the state
// This function is triggered once at the begining and everytime the state is changed
function renderEverything() {
  renderPepperonni();
  renderMushrooms();
  renderGreenPeppers();
  renderWhiteSauce();
  renderGlutenFreeCrust();

  renderButtons();
  renderPrice();
}

function renderPepperonni() {
  document.querySelectorAll('.pep').forEach(function($pep){
    if (state.pepperonni) {
      $pep.style.visibility = "visible";
    }
    else {
      $pep.style.visibility = "hidden";
    }
  });
}

function renderMushrooms() {
  // Iteration 1: set the visibility of `<section class="mushroom">`
  document.querySelectorAll('.mushroom').forEach(function($mushroom){
    if (state.mushrooms) {
      $mushroom.style.visibility = "visible";
    }
    else {
      $mushroom.style.visibility = "hidden";
    }
  });
}

function renderGreenPeppers() {
  // Iteration 1: set the visibility of `<section class="green-pepper">`
  document.querySelectorAll('.green-pepper').forEach(function($greenPepper){
    if (state.greenPeppers) {
      $greenPepper.style.visibility = "visible";
    }
    else {
      $greenPepper.style.visibility = "hidden";
    }
  });
}

function renderWhiteSauce() {
  // Iteration 2: add/remove the class "sauce-white" of `<section class="sauce">`
  document.querySelectorAll('.sauce-white').forEach(function($sauce){
    if (state.whiteSauce) {
        $sauce.classList.add("sauce");
    } else {
        $sauce.classList.remove("sauce");
    }
  });
}

function renderGlutenFreeCrust() {
  // Iteration 2: add/remove the class "crust-gluten-free" of `<section class="crust">`
  document.querySelectorAll('.crust').forEach(function($crust){
    if (state.glutenFreeCrust) {
        $crust.classList.add("crust-gluten-free");
    } else {
        $crust.classList.remove("crust-gluten-free");
    }
  });
}

function toggleButton($button, ingredient, buttonClass) {
  if ($button.classList.contains(buttonClass)) {
    if (state[ingredient] && !$button.classList.contains("active")) {
      $button.classList.add("active");
    } else if (!state[ingredient] && $button.classList.contains("active")) {
      $button.classList.remove("active");
    }
  }
}

function renderButtons() {
  // Iteration 3: add/remove the class "active" of each `<button class="btn">`
  document.querySelectorAll('.btn').forEach(function($button){
    buttonClasses.forEach(function(buttonClass, index) {
      if ($button.classList.contains(buttonClass)) {
        let ingredient = Object.keys(ingredients)[index];
        toggleButton($button, ingredient, buttonClass);
      }
    });
  });
}

function renderPrice() {
  // Iteration 4: change the HTML of `<aside class="panel price">`
  const priceList = document.querySelector('aside ul');
  let price = 10;     // cheese pizza base cost

  for (let ingredient in ingredients) {
    let foundIngredient = false;
    let ingredientName = ingredients[ingredient].name.toLowerCase();
    let ingredientPrice = ingredients[ingredient].price;

    for (let listItem of priceList.children) {
      if (listItem.textContent.includes(ingredientName)) {
        foundIngredient = true;
        if (!state[ingredient]) {
          priceList.removeChild(listItem);
        } else {
          price += ingredientPrice;
        }
      }
    }
    
    if (state[ingredient] && !foundIngredient) {
      let newIngredient = document.createElement('li');
      newIngredient.textContent = "$" + `${ingredientPrice} ${ingredientName}`;
      priceList.appendChild(newIngredient);
      price += ingredientPrice;
    }
  }
  document.querySelector('aside strong').textContent = "$" + price;
}

renderEverything();

// Iteration 1: Example of a click event listener on `<button class="btn btn-pepperonni">`
document.querySelector('.btn.btn-pepperonni').onclick = function() {
  state.pepperonni = !state.pepperonni;
  renderEverything();
};

// Iteration 1: Add click event listener on `<button class="btn btn-mushrooms">`
document.querySelector('.btn.btn-mushrooms').onclick = function() {
  state.mushrooms = !state.mushrooms;
  renderEverything();
};

// Iteration 1: Add click event listener on `<button class="btn btn-green-peppers">`
document.querySelector('.btn.btn-green-peppers').onclick = function() {
  state.greenPeppers = !state.greenPeppers;
  renderEverything();
};

// Iteration 2: Add click event listener on `<button class="btn btn-sauce">`
document.querySelector('.btn.btn-sauce').onclick = function() {
  state.whiteSauce = !state.whiteSauce;
  renderEverything();
};

// Iteration 2: Add click event listener on `<button class="btn btn-crust">`
document.querySelector('.btn.btn-crust').onclick = function() {
  state.glutenFreeCrust = !state.glutenFreeCrust;
  renderEverything();
};