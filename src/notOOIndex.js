const route = "https://randomuser.me/api/";

function getStuff() {
  fetch(`${route}`)
    .then(res => res.json())
    .then(json => createUser(json));
};

function createUser(json) {
  const results = json.results[0];
  setProfilePicture(results);
  setName(results);
  setEmail(results)
  setStreet(results);
  setCity(results);
  setState(results);
  setPostCode(results);
  setPhoneNumbers(results);
  setBirth(results);
};

function getHTML(id) {
  return document.getElementById(id);
};

function setProfilePicture(results) {
  const profPicHTML = getHTML('profile_picture');
  profPicHTML.setAttribute("src", `${results.picture.large}`);
};

function setName(results) {
  const nameHTML = getHTML('fullname');
  const name = results.name;
  const title = capitalizeWord(name.title);
  const firstName = capitalizeWord(name.first);
  const lastName = capitalizeWord(name.last);
  nameHTML.innerText = `${title}. ${firstName} ${lastName}`;
};

function setEmail(results) {
  const emailHTML = getHTML('email');
  const email = results.email;
  emailHTML.innerText = email;
};

function setStreet(results) {
  const streetHTML = getHTML('street');
  const streetArray = results.location.street.split(' ');
  let formattedStreetArray = [];
  for (let i = 0; i < streetArray.length; i++) {
    let word = streetArray[i];
    let nums = '1234567890'.split('');
    if (nums.indexOf(word[0]) === -1) {
      formattedStreetArray.push(capitalizeWord(word));
    } else {
      formattedStreetArray.push(word);
    }
  }
  streetHTML.innerText = formattedStreetArray.join(' ');
};

function setCity(results) {
  const cityHTML = getHTML('city');
  const city = capitalizeWord(results.location.city);
  cityHTML.innerText = city;
}

function setState(results) {
  const stateHTML = getHTML('state');
  const stateArray = results.location.state.split(' ');
  if (stateArray.length > 1) {
    let capitalState = stateArray.map((state) => {
      return capitalizeWord(state);
    });
    stateHTML.innerText = capitalState.join(' ');
  } else {
    stateHTML.innerText = capitalizeWord(stateArray.join(' '));
  }
}

function setPostCode(results) {
  const postCodeHTML = getHTML('postcode');
  const postCode = results.location.postcode;
  postCodeHTML.innerText = postCode;
}

function setPhoneNumbers(results) {
  const phoneHTML = getHTML('phone');
  const cellHTML = getHTML('cell');
  const phone = results.phone;
  phoneHTML.innerText = phone;
  cellHTML.innerText = phone;
}

function setBirth(results) {
  const dobHTML = getHTML('date_of_birth');
  const date = results.dob;
  const formattedDate = new Date(date).toDateString().slice(4);
  dobHTML.innerText = formattedDate;
};

function capitalizeWord(word) {
  const firstChar = word[0].toUpperCase();
  const restOfWord = word.slice(1);
  return firstChar + restOfWord;
};
