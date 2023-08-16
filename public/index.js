let token = '';
const baseURL = 'http://localhost:3000';
let socket;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#login').addEventListener('submit', (event) => {
    event.preventDefault();
    login();
  });

  
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

  socket = io(baseURL, {
    extraHeaders: {
      'Authorization': `Bearer ${token}`
    }
  });
  socket.on('newData', addLine);

  document.querySelector('#login').style.display = 'none';
  renderList();
  renderForm();
}

async function renderList() {
  document.querySelector('#list').style.display = 'block';

  const response = await fetch(`${baseURL}/appointments`, {headers: {Authorization: `Bearer ${token}`}});
  const appointments = await response.json();

  appointments.forEach(addLine);
}

async function renderForm() {
  const form = document.querySelector('#addForm');
  form.style.display = 'block';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newAppointment = {
      title: document.querySelector('#title').value,
      start: document.querySelector('#start').value,
      end: document.querySelector('#end').value
    };
    socket.emit('createAppointment', newAppointment);
  });

  socket.on('exception', (data) => console.log(data));
}

function addLine(appointment) {
  const div = document.createElement('div');
  div.innerText = `${appointment.title} ${appointment.start} - ${appointment.end}`;
  document.querySelector('#list').appendChild(div);
}