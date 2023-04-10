const PAGE_SIZE = 10;
let currentPage = 1;
const totalPages = 5;

const waitlistElement = document.getElementById('waitlist');
const countlistElement = document.getElementById('waitlist-count');
const BASE_URL = "http://example.com"
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const currentPageElement = document.getElementById('current-page');

function updateUI() {
  currentPage.textContent = currentPageNumber;
  
  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
  
  if (currentPage === totalPages || totalPages === 0) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
  
  if (totalPages === 0) {
    currentPage.textContent = 'N/A';
    prevButton.disabled = true;
    nextButton.disabled = true;
  }
}

function renderWaitlist(data) {
    waitlistElement.innerHTML = '';
     const countElement = document.createElement('p');
    countElement.textContent = `Total Waiting Users:- ${data.length}`;
    countlistElement.appendChild(countElement);


  data.forEach(user => {
    const userElement = document.createElement('div');
      userElement.className = 'waitlist-user';
      
       const divUserElement = document.createElement('div');
    divUserElement.className = 'waitlist-user-div';

    const nameElement = document.createElement('p');
    nameElement.className = 'waitlist-user-name';
    nameElement.textContent = user.fullName;
    userElement.appendChild(nameElement);

    const emailElement = document.createElement('p');
    emailElement.className = 'waitlist-user-email';
    emailElement.textContent = user.email;
    divUserElement.appendChild(emailElement);

    const dateElement = document.createElement('p');
    dateElement.className = 'waitlist-user-date';
    dateElement.textContent = new Date(user.createdAt).toLocaleString();
      divUserElement.appendChild(dateElement);
      
   
      userElement.appendChild(divUserElement);
    waitlistElement.appendChild(userElement);
  });

  currentPageElement.textContent = currentPage;
}

function getPage(pageNumber) {
  fetch(`https://api.onculture.io/waitlist/allwaitlist?page=1&limit=10`)
    .then(response => response.json())
    .then(data => {
      renderWaitlist(data);
    })
    .catch(error => console.log(error));
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getPage(currentPage);
    updateUI()
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
    getPage(currentPage);
    updateUI()
});


document.addEventListener('DOMContentLoaded', function() {
  // your code here
    
getPage(currentPage);
updateUI()
});
