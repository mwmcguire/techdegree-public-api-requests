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
    displayError('No Employee Data Found');
  }
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

/**
 * Function to build the gallery using generateCard function
 * @param {Object} List of users from API
 */
const displayEmployees = (employees) => {
  const htmlString = employees
    .map((employee) => {
      return `<div class="card">
    <div class="card-img-container">
      <img class="card-img" src=${employee.picture.large} alt="profile picture">
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
  removeError();

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
      activeProfile.image = employeeProfiles[i].picture.large;
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
  const closeBtn = document.getElementById('modal-close-btn');
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
const searchEmployees = (e) => {
  e.preventDefault();
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

  if (filteredEmployees.length === 0) {
    displayError('No Employees Found');
  } else {
    displayEmployees(filteredEmployees);
    employeeProfiles = filteredEmployees;
  }
};

/**
 * Function to display error box
 * @param {String} errorText Text to display
 */
const displayError = (errorText) => {
  const errorBox = document.querySelector('.error');
  errorBox.firstElementChild.textContent = errorText;
  errorBox.style.display = 'inline-block';
};

// Function to remove the error box
const removeError = () => {
  const errorBox = document.querySelector('.error');
  errorBox.style.display = 'none';
};

// Function calls
buildModal();
buildSearchBar();
buildErrorBox();
loadEmployees();
buildRandomBtn();
