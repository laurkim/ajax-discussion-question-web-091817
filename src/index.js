const route = "https://randomuser.me/api/";
let store = {users: []};

function getStuff() {
  let user = fetch(`${route}`)
    .then(res => res.json())
    .then(json => new App(json))
    .then(app => app.createHTML());
};

class User {
  constructor(json) {
    const results = json.results[0];
    this.profilePicture = results.picture.large;
    this.name = results.name;
    this.email = results.email;
    this.phone = results.phone;
    store.users.push(this);
  }
};

class App {
  constructor(json) {
    this.user = new User(json);
  }

  createHTML() {
    this.setProfilePicture();
    this.setName();
    this.setEmail();
    this.setPhone();
  }

  setProfilePicture() {
    const profPic = document.getElementById('profile_picture');
    profPic.setAttribute("src", `${this.user.profilePicture}`);
  }

  setName() {
    const nameHTML = document.getElementById('fullname');
    const title = capitalizeWord(this.user.name.title);
    const firstName = capitalizeWord(this.user.name.first);
    const lastName = capitalizeWord(this.user.name.last);
    nameHTML.innerText = `${title}. ${firstName} ${lastName}`;
  }

  setEmail() {
    const emailHTML = document.getElementById('email');
    const email = this.user.email;
    emailHTML.innerText = email;
  }

  setPhone() {
    const phoneHTML = document.getElementById('phone');
    const cellHTML = document.getElementById('cell');
    const number = this.user.phone;
    phoneHTML.innerText = number;
    cellHTML.innerText = number;
  }

};

function capitalizeWord(word) {
  const firstChar = word[0].toUpperCase();
  const restOfWord = word.slice(1);
  return firstChar + restOfWord;
};
