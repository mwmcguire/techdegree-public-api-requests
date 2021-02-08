const employeeGallery = document.getElementById('gallery');
const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=US';
let employeeProfiles = [];
const activeProfile = {};

// Fetch API data, build and append search input
const loadEmployees = async () => {
  try {
    const res = await fetch(randomUserUrl);
    const data = await res.json();
    employeeProfiles = data.results;
    displayEmployees(employeeProfiles);
  } catch (err) {
    console.error(err);
  }
};

// Function to build the modal and preload it onto the page
const buildModal = () => {
  const modalHTML = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src= alt="profile picture">
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

// Function to handle modal previous button
const prevEmployee = () => {
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  let employeeId = activeProfile.id;
  nextBtn.disabled = false;

  if (employeeId === 0) {
    prevBtn.disabled = true;
  } else {
    employeeId -= 1;
    let employeeName =
      employeeProfiles[employeeId].name.first +
      ' ' +
      employeeProfiles[employeeId].name.last;

    updateActiveProfile(employeeName);
  }
};

// Function to handle modal next button
const nextEmployee = () => {
  const nextBtn = document.getElementById('modal-next');
  const prevBtn = document.getElementById('modal-prev');
  let employeeId = activeProfile.id;
  prevBtn.disabled = false;

  if (employeeId === employeeProfiles.length - 1) {
    nextBtn.disabled = true;
  } else {
    employeeId += 1;
    let employeeName =
      employeeProfiles[employeeId].name.first +
      ' ' +
      employeeProfiles[employeeId].name.last;

    updateActiveProfile(employeeName);
  }
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

/**
 * Function to build the gallery using generateCard function
 * @param {Object} List of users from API
 */
const displayEmployees = (employees) => {
  const htmlString = employees
    .map((employee) => {
      return `<div class="card">
    <div class="card-img-container">
      <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
      <p class="card-text">${employee.email}</p>
      <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
  </div>`;
    })
    .join('');

  employeeGallery.innerHTML = htmlString;

  // add click event listener to all cards and update the activeProfile when clicked
  const allCards = document.querySelectorAll('.card');
  allCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const employeeName =
        e.currentTarget.childNodes[3].childNodes[1].textContent;
      updateActiveProfile(employeeName);
    });
  });
};

/**
 * Function to update the active profile for use in the app
 * @param {String} Name of profile to be set as active
 */
const updateActiveProfile = (profileName) => {
  for (let i = 0; i < employeeProfiles.length; i++) {
    if (
      employeeProfiles[i].name.first + ' ' + employeeProfiles[i].name.last ===
      profileName
    ) {
      activeProfile.id = i;
      activeProfile.image = employeeProfiles[i].picture.medium;
      activeProfile.name = employeeProfiles[i].name;
      activeProfile.email = employeeProfiles[i].email;
      activeProfile.city = employeeProfiles[i].location.city;
      activeProfile.phone = employeeProfiles[i].phone;
      activeProfile.address = employeeProfiles[i].location;
      activeProfile.birthday = convertBirthday(employeeProfiles[i].dob.date);
    }
  }
  updateModal();
};

/**
 * Function to handle converting birthday date format
 * @param {String} date of profile birthday
 * @return {String} date formatted as MM/DD/YYY
 */
const convertBirthday = (date) => {
  return new Date(date).toLocaleDateString();
};

// Function to handle toggling of modal
const toggleModal = () => {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.style.display = '';
  const closeBtn = document.getElementsByTagName('strong')[0];
  closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
};

/**
 * Function to update modal information
 * @param {Object} profile object chosen to be used
 */
const updateModal = () => {
  const modalInfoContainer = document.querySelector('.modal-info-container');
  const modalImg = document.querySelector('.modal-img');
  const modalName = document.querySelector('.modal-name');
  const modalEmail = modalInfoContainer.childNodes[5];
  const modalCity = modalInfoContainer.childNodes[7];
  const modalPhone = modalInfoContainer.childNodes[11];
  const modalAddress = modalInfoContainer.childNodes[13];
  const modalBirthday = modalInfoContainer.childNodes[15];

  modalImg.src = activeProfile.image;
  modalName.innerHTML =
    activeProfile.name.first + ' ' + activeProfile.name.last;
  modalEmail.innerHTML = activeProfile.email;
  modalCity.innerHTML = activeProfile.city;
  modalPhone.innerHTML = activeProfile.phone;
  modalAddress.innerHTML =
    activeProfile.address.street.number +
    ' ' +
    activeProfile.address.street.name +
    ', ' +
    activeProfile.address.state +
    ' ' +
    activeProfile.address.postcode;
  modalBirthday.innerHTML = `Birthday: ${activeProfile.birthday}`;

  toggleModal();
};

// Function to handle search bar functionality
const searchEmployees = () => {
  const searchInput = document.getElementById('search-input');
  const searchInputValue = searchInput.value.toLowerCase();

  if (!searchInputValue) {
    searchInput.placeholder = 'Please Enter a Name';
    setTimeout(() => {
      searchInput.placeholder = 'Search...';
    }, 3000);
  }

  const filteredEmployees = employeeProfiles.filter((employee) => {
    return (
      employee.name.first.toLowerCase().includes(searchInputValue) ||
      employee.name.last.toLowerCase().includes(searchInputValue)
    );
  });
  displayEmployees(filteredEmployees);
  employeeProfiles = filteredEmployees;
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
    padding: 1.25em 2.0em;
    margin-top: 1.0em;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.35em;
    transition: .4s ease-out;
    outline: none;`;

  // add media query to random button
  const mediaQuery = window.matchMedia('(min-width: 1024px)');

  if (mediaQuery.matches) {
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

// Function calls
buildModal();
buildSearchBar();
loadEmployees();
buildRandomBtn();
