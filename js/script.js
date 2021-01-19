const randomUserUrl = 'https://randomuser.me/api/?results=12';
class Profile {
  constructor(image, name, email, city, phone, address, birthday) {
    this.image = image;
    this.name = name;
    this.email = email;
    this.city = city;
    this.phone = phone;
    this.address = address;
    this.birthday = birthday;
  }

  updateModal() {
    const modalHTML = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${this.image} alt="profile picture">
          <h3 id="name" class="modal-name cap">${this.name}</h3>
          <p class="modal-text">${this.email}</p>
          <p class="modal-text cap">${this.city}</p>
          <hr>
          <p class="modal-text">${this.phone}</p>
          <p class="modal-text">${this.address}</p>
          <p class="modal-text">Birthday: ${this.birthday}</p>
      </div>
  </div>`;

    gallery.insertAdjacentHTML('afterend', modalHTML);
  }
}

const activeUser = new Profile(
  'image',
  'Joe',
  'email',
  'city',
  'phone',
  'adress',
  'birthday'
);
console.log(activeUser);

// Fetch API data
window.onload = () => {
  fetch(randomUserUrl)
    .then((response) => response.json())
    .then(buildGallery)
    .catch((err) => console.log(err));
};

/**
 * Function to generate HTML for a single card
 * @param {Object} User object chosen to be used
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
    let singleCard = generateCard(user);
    gallery.insertAdjacentHTML('beforeend', singleCard);
  });

  const allCards = document.querySelectorAll('.card');
  allCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      console.log(e.currentTarget.childNodes[3].childNodes[1].textContent);
    });
  });
}
