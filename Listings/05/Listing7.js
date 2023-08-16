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