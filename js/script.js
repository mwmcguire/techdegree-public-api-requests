const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=US';
const userIndex = 0;
const userProfiles = [];
const activeProfile = {};
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
  </div>`;

// Fetch API data, build and append search input
window.onload = () => {
  fetch(randomUserUrl)
    .then((response) => response.json())
    .then(updateUserProfiles)
    .then(buildGallery)
    .catch((err) => console.log(err));

  gallery.insertAdjacentHTML('afterend', modalHTML);
  document.querySelector('.modal-container').style.display = 'none';

  // Build search input
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
  submitBtn.addEventListener('click', () => {
    console.log('submit clicked');
    searchBar();
  });
};

/**
 * Function to update the userProfiles array
 * @param {Object} data object to be parsed for results
 * @return {Object} results of the data object to use throughout application
 */
function updateUserProfiles(data) {
  const users = data.results;
  users.forEach((user) => {
    userProfiles.push(user);
  });

  console.log(users);
  return users;
}

/**
 * Function to generate HTML for a single card
 * @param {Object} user object chosen to be used
 * @return {String} HTML for the employee card
 */
function generateCard(user) {
  const cardHTML = `<div class="card">
  <div class="card-img-container">
    <img class="card-img" src=${user.picture.thumbnail} alt="profile picture">
  </div>
  <div class="card-info-container">
    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
    <p class="card-text">${user.email}</p>
    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
  </div>
</div>`;
  return cardHTML;
}

/**
 * Function to build the gallery using generateCard function
 * @param {Object} List of users from API
 */
function buildGallery(data) {
  console.log('build gallery data: ' + data);
  const users = data;
  const gallery = document.getElementById('gallery');

  console.log(typeof users);
  users.forEach((user) => {
    let singleCard = generateCard(user);
    gallery.insertAdjacentHTML('beforeend', singleCard);
  });

  // add click event listener to all cards and update the activeProfile when clicked
  const allCards = document.querySelectorAll('.card');
  allCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const userName = e.currentTarget.childNodes[3].childNodes[1].textContent;
      updateActiveProfile(userName);
    });
  });
}

/**
 * Function to update the active profile for use in the app
 * @param {String} Name of profile to be set as active
 */
function updateActiveProfile(profileName) {
  for (let i = 0; i < userProfiles.length; i++) {
    if (
      userProfiles[i].name.first + ' ' + userProfiles[i].name.last ===
      profileName
    ) {
      activeProfile.id = i;
      activeProfile.image = userProfiles[i].picture.medium;
      activeProfile.name = userProfiles[i].name;
      activeProfile.email = userProfiles[i].email;
      activeProfile.city = userProfiles[i].location.city;
      activeProfile.phone = userProfiles[i].phone;
      activeProfile.address = userProfiles[i].location;
      activeProfile.birthday = convertBirthday(userProfiles[i].dob.date);
    }
  }
  console.log(activeProfile);
  updateModal();
}

/**
 * Function to handle converting birthday date format
 * @param {String} date of profile birthday
 * @return {String} date formatted as MM/DD/YYY
 */
function convertBirthday(date) {
  return new Date(date).toLocaleDateString();
}

// Function to handle toggling of modal
function toggleModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.style.display = '';
  const closeBtn = document.getElementsByTagName('strong')[0];
  closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
}

/**
 * Function to update modal information
 * @param {Object} profile object chosen to be used
 */
function updateModal() {
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
}

// Function to handle search bar
function searchBar() {
  const searchInput = document.getElementById('search-input');

  for (let i = 0; i < userProfiles.length; i++) {
    let fullName = userProfiles[i].name.first + ' ' + userProfiles[i].name.last;
    console.log(fullName);
    if (fullName === searchInput.value) {
      console.log(true);
      console.log(userProfiles[i].name);
      buildGallery(userProfiles[i]);
    } else {
      console.log(false);
    }
  }
}
