function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'flex' ? 'none' : 'flex';
    chatbox.style.flexDirection = 'column';
  }

  function responder(opcion) {
    const contenido = document.getElementById('chat-content');
    const pie = document.getElementById('chat-footer');

    if (opcion === 'menu') {
      window.location.href = 'servicios.html';
    } else if (opcion === 'pedido') {
      window.location.href = 'contacto.html';
    } else if (opcion === 'ofertas') {
      window.location.href = 'masPromociones.html';
    } else if (opcion === 'ubicacion') {
      window.location.href = 'contacto.html';
    } else if (opcion === 'contacto') {
      window.location.href = 'preguntasFrecuentes.html';
    }
  }