const randomUserUrl = 'https://randomuser.me/api/?results=12';
const userProfiles = [];
const activeProfile = {};

// Fetch API data
window.onload = () => {
  fetch(randomUserUrl)
    .then((response) => response.json())
    .then(buildGallery)
    .catch((err) => console.log(err));
};

/**
 * Function to update modal information
 * @param {Object} profile object chosen to be used
 */
function updateModal() {
  const modalHTML = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${
            activeProfile.image
          } alt="profile picture">
          <h3 id="name" class="modal-name cap">${
            activeProfile.name.first + ' ' + activeProfile.name.last
          }</h3>
          <p class="modal-text">${activeProfile.email}</p>
          <p class="modal-text cap">${activeProfile.city}</p>
          <hr>
          <p class="modal-text">${activeProfile.phone}</p>
          <p class="modal-text">${
            activeProfile.address.street.number +
            ' ' +
            activeProfile.address.street.name +
            ', ' +
            activeProfile.address.state +
            ' ' +
            activeProfile.address.postcode
          }</p>
          <p class="modal-text">Birthday: ${activeProfile.birthday}</p>
      </div>
  </div>`;

  gallery.insertAdjacentHTML('afterend', modalHTML);
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

function updateActiveProfile(profileName) {
  for (let i = 0; i < userProfiles.length; i++) {
    if (
      userProfiles[i].name.first + ' ' + userProfiles[i].name.last ===
      profileName
    ) {
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
