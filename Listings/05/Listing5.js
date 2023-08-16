let token = '';
const baseURL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#login').addEventListener('submit', (event) => {
    event.preventDefault();
    login();
  });

  const socket = io(baseURL);
  socket.on('newData', addLine);
});

async function login() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const response = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password}),
  });

  const {access_token} = await response.json();
  token = access_token;

  document.querySelector('#login').style.display = 'none';
  renderList();
}

async function renderList() {
  document.querySelector('#list').style.display = 'block';

  const response = await fetch(`${baseURL}/appointments`, {headers: {Authorization: `Bearer ${token}`}});
  const appointments = await response.json();

  appointments.forEach(addLine);
}

function addLine(appointment) {
  const div = document.createElement('div');
  div.innerText = `${appointment.title} ${appointment.start} - ${appointment.end}`;
  document.querySelector('#list').appendChild(div);
}