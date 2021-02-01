const employeeGallery = document.getElementById('gallery');

const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=US';
const userIndex = 0;
let employeeProfiles = [];
const activeProfile = {};

// Fetch API data, build and append search input
const loadEmployees = async () => {
  try {
    const res = await fetch(randomUserUrl);
    employeeProfiles = await res.json();
    displayEmployees(employeeProfiles.results);
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

  employeeGallery.insertAdjacentHTML('beforeend', htmlString);

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
  for (let i = 0; i < employeeProfiles.results.length; i++) {
    if (
      employeeProfiles.results[i].name.first +
        ' ' +
        employeeProfiles.results[i].name.last ===
      profileName
    ) {
      activeProfile.id = i;
      activeProfile.image = employeeProfiles.results[i].picture.medium;
      activeProfile.name = employeeProfiles.results[i].name;
      activeProfile.email = employeeProfiles.results[i].email;
      activeProfile.city = employeeProfiles.results[i].location.city;
      activeProfile.phone = employeeProfiles.results[i].phone;
      activeProfile.address = employeeProfiles.results[i].location;
      activeProfile.birthday = convertBirthday(
        employeeProfiles.results[i].dob.date
      );
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
// Include allowing for partial matches and case insensitivities
// Include some way for users to get back to the full list of employees
const searchEmployees = () => {
  const searchInput = document.getElementById('search-input');
  const searchInputValue = searchInput.value;
  const employeeNames = [];

  employeeProfiles.results.forEach((employee) => {
    employeeNames.push(employee.name.first + ' ' + employee.name.last);
  });

  employeeProfiles.results.filter((employee) => {
    employee;
  });

  // Collect all employee names
  // for (let i = 0; i < employeeProfiles.length; i++) {
  //   employeeNames.push(
  //     employeeProfiles[i].name.first + ' ' + employeeProfiles[i].name.last
  //   );
  // }
  // console.log(employeeNames);

  // Loop through each employee Name
  // for (let i = 0; i < employeeNames.length; i++) {
  //   let names = employeeNames[i];
  //   console.log(names);

  //   // Loop through each letter within each Name
  //   for (let j = 0; j < employeeNames[i].length; j++) {
  //     let letters = employeeNames[i][j].toLowerCase();
  //     console.log(letters);

  //     // Determine if search input value includes letters within each name
  //     if (searchInputValue.includes(letters)) {
  //       console.log(names);
  //     }
  //   }
  // }

  // search value string of the user input
  // if value includes a value that is in the employeeProfiles.name array
  // return that employeeProfiles.name

  // for (let i = 0; i < employeeProfiles.length; i++) {
  //   let fullName =
  //     employeeProfiles[i].name.first + ' ' + employeeProfiles[i].name.last;

  //   if (fullName === searchInputValue) {
  //     const singleCard = generateCard(employeeProfiles[i]);
  //     gallery.innerHTML = singleCard;
  //   }
  // }

  // const card = document.querySelectorAll('.card');
  // card[0].addEventListener('click', (e) => {
  //   const userName = e.currentTarget.childNodes[3].childNodes[1].textContent;
  //   updateActiveProfile(userName);
  // });
};

buildModal();
buildSearchBar();
loadEmployees();
