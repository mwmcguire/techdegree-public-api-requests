// This script adds additional elements and functionality

// Function to build the modal and preload it onto the page
const buildModal = () => {
  const modalHTML = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="" alt="profile picture">
          <h3 id="name" class="modal-name cap"></h3>
          <p class="modal-text"></p>
          <p class="modal-text cap"></p>
          <hr>
          <p class="modal-text"></p>
          <p class="modal-text"></p>
          <p class="modal-text">Birthday: </p>
      </div>

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>`;

  employeeGallery.insertAdjacentHTML('afterend', modalHTML);
  document.querySelector('.modal-container').style.display = 'none';

  // Attach event listeners to prev and next buttons
  const prev = document.getElementById('modal-prev');
  const next = document.getElementById('modal-next');

  prev.addEventListener('click', prevEmployee);
  next.addEventListener('click', nextEmployee);
};

// Function to build the search bar and display to the page
const buildSearchBar = () => {
  const searchContainer = document.createElement('div');
  searchContainer.setAttribute('class', 'search-container');

  searchContainer.innerHTML = `<form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>`;

  // Append search input to the header
  document
    .querySelector('.header-inner-container')
    .appendChild(searchContainer);

  const submitBtn = document.getElementById('search-submit');
  submitBtn.addEventListener('click', searchEmployees);
};

// Function to build the error box
const buildErrorBox = () => {
  const searchContainer = document.querySelector('.search-container');
  const errorHTML = '<div class="error"><p></p></div>';
  searchContainer.insertAdjacentHTML('beforebegin', errorHTML);

  const errorBox = document.querySelector('.error');
  errorBox.style.cssText = `
  padding: 0.75em 2.0em;
  margin: auto;
  margin-top: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 20, 20);`;

  errorBox.style.display = 'none';
};

// Function to build random employee button
const buildRandomBtn = () => {
  const btnHTML =
    '<button type="button" id="random-btn" class="random-btn">Get Random Employees</button>';
  employeeGallery.insertAdjacentHTML('afterend', btnHTML);

  // Random button styling
  const randomBtn = document.getElementById('random-btn');
  randomBtn.style.cssText = `display: inline-block;
    cursor: pointer;
    font-size: 0.85em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    padding: 1.0em 2.0em;
    margin-top: 1.0em;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.35em;
    transition: .4s ease-out;
    outline: none;`;

  // add media query to random button
  const randomMediaQuery = window.matchMedia('(min-width: 1024px)');

  if (randomMediaQuery.matches) {
    randomBtn.addEventListener('mouseenter', () => {
      randomBtn.style.background = 'rgba(255, 255, 255, 1)';
      randomBtn.style.color = 'rgba(25, 25, 25, 1)';
    });

    randomBtn.addEventListener('mouseleave', () => {
      randomBtn.style.background = 'rgba(0, 0, 0, 0.8)';
      randomBtn.style.color = 'rgba(255, 255, 255, 0.9)';
    });
  }

  randomBtn.addEventListener('click', loadEmployees);
};
