let profile;

// let modalHTML = `<div class="modal-container">
//   <div class="modal">
//       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//       <div class="modal-info-container">
//           <img class="modal-img" src=${profile.image} alt="profile picture">
//           <h3 id="name" class="modal-name cap">${profile.name}</h3>
//           <p class="modal-text">${profile.email}</p>
//           <p class="modal-text cap">${profile.city}</p>
//           <hr>
//           <p class="modal-text">(555) 555-5555</p>
//           <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//           <p class="modal-text">Birthday: 10/21/2015</p>
//       </div>
//   </div>`;

// gallery.insertAdjacentHTML('afterend', modalHTML);
// const modal = document.getElementsByClassName('modal-container')[0];
// modal.style.display = 'none';

/**
 * Function to handle API request
 */
function reqListener() {
  const data = JSON.parse(this.responseText);
  const users = data.results;
  // console.log(users)
  buildGallery(users);
}

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
function buildGallery(users) {
  const gallery = document.getElementById('gallery');

  for (let i = 0; i < users.length; i++) {
    let singleCard = generateCard(users[i]);
    gallery.insertAdjacentHTML('beforeend', singleCard);

    gallery.addEventListener(
      'click',
      (e) => {
        let targetElement = e.target;
        let selector = 'div';

        while (targetElement != null) {
          if (targetElement.matches(selector)) {
            console.log(users[i]);
            return;
          }
          targetElement = targetElement.parentElement;
        }
      },
      true
    );
  }

  // const allCards = document.querySelectorAll('.card');
  // allCards.forEach((card) => {
  //   card.addEventListener('click', () => {
  //     console.log(users[cardIndex]);
  //   });
  // });
}

// XMLHttpRequest
const userReq = new XMLHttpRequest();
userReq.addEventListener('load', reqListener);
userReq.open('GET', 'https://randomuser.me/api/?results=12');
userReq.send();
