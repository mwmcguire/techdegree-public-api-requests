const randomUserUrl = 'https://randomuser.me/api/?results=12';
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

// Fetch API data
window.onload = () => {
  fetch(randomUserUrl)
    .then((response) => response.json())
    .then(buildGallery)
    .catch((err) => console.log(err));

  gallery.insertAdjacentHTML('afterend', modalHTML);
  document.querySelector('.modal-container').style.display = 'none';
};

function showModal() {
  document.querySelector('.modal-container').style.display = '';
}

/**
 * Function to update modal information
 * @param {Object} profile object chosen to be used
 */
function updateModal() {
  const modalInfoContainer = document.querySelector('.modal-info-container');
  console.log(modalInfoContainer.childNodes);
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

  showModal();
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
  const users = data.results;
  const gallery = document.getElementById('gallery');

  users.forEach((user) => {
    userProfiles.push(user);
    let singleCard = generateCard(user);
    gallery.insertAdjacentHTML('beforeend', singleCard);
  });

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
      activeProfile.birthday = userProfiles[i].dob.date;
    }
  }
  console.log(activeProfile);
  updateModal();
}
