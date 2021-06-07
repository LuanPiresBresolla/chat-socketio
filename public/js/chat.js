const socket = io('http://localhost:3333');
let idChatRoom = "";

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const email = urlParams.get('email');
  const avatar = urlParams.get('avatar');

  document.querySelector('.user_logged').innerHTML += `
    <img
      class="avatar_user_logged"
      src=${avatar || 'https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg'}
    />
    <strong id="user_logged">${name}</strong>
  `;

  socket.emit('start', { name, email, avatar });

  socket.on('new_users', data => {
    const userExist = document.getElementById(`user_${data._id}`);

    if (!userExist) {
      addUser(data);
    }
  });

  socket.emit('get_users', users => {
    users.forEach(user => {
      if(user.email !== email) {
        addUser(user);
      }
    });
  });

  socket.on('message', data => {
    if (data.message.roomId === idChatRoom) {
      addMessage(data);
    }
  });

  socket.on('notification', data => {    
    if (data.roomId !== idChatRoom) {
      const user = document.getElementById(`user_${data.from._id}`);    

      user.insertAdjacentHTML('afterbegin', `
        <div class="notification"></div>
      `);
    }
  });
}

function addMessage(data) {
  const divMessageUser = document.getElementById('message_user');

  divMessageUser.innerHTML += `
    <span class="user_name user_name_date">
      <img
        class="img_user"
        src=${data.user.avatar || 'https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg'}
      />
      <strong>${data.user.name} &nbsp;</strong>
      <span> ${dayjs(data.message.created_at).format('DD/MM/YYYY HH:mm')}</span></span
    >
    <div class="messages">
      <span class="chat_message"> ${data.message.text}</span>
    </div>
  `;
}

function addUser(user) {
  const usersList = document.getElementById('users_list');
  usersList.innerHTML += `
    <li
      class="user_name_list"
      id="user_${user._id}"
      idUser="${user._id}">
      <img
        class="nav_avatar"
        src=${user.avatar || 'https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg'}
      />
      ${user.name}
    </li>
  `;
}

document.getElementById('users_list').addEventListener('click', (e) => {
  const inputMessage = document.getElementById('user_message');
  inputMessage.classList.remove('hidden');

  document.querySelectorAll('li.user_name_list').forEach(item => item.classList.remove('user_in_focus'));

  document.getElementById('message_user').innerHTML = '';

  if (e.target && e.target.matches('li.user_name_list')) {
    const idUser = e.target.getAttribute('idUser');

    e.target.classList.add('user_in_focus');

    const notification = document.querySelector(`#user_${idUser} .notification`);
    
    if (notification) {
      notification.remove();
    }

    socket.emit("start_chat", { idUser }, (response) => {
      idChatRoom = response.chatRoom.idChatRoom;

      response.messages.forEach((message) => {
        const data = {
          message,
          user: message.to,
        };

        addMessage(data);
      });
    });  
  }
});

document.getElementById('user_message').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const message = e.target.value;

    const dataMessage = {
      message,
      idChatRoom,
    };

    e.target.value = '';

    socket.emit('message', dataMessage);
  }
});

onLoad();