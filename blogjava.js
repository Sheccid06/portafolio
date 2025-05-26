function publicarComentario() {
    // Obtener el texto del comentario y el email
    var comentario = document.getElementById('pregunta').value;
    var email = document.getElementById('preguntaemail').value;

    // Validar que el comentario no esté vacío y que el email sea válido
    if (comentario.trim() === "" || email.trim() === "") {
        alert("Por favor, ingresa un comentario y un correo electrónico.");
        return;
    }

    // Establecer el texto en el contenedor
    document.getElementById('comentario-texto').textContent = comentario;
    document.getElementById('comentario-email').textContent = email;

    // Mostrar el contenedor con el comentario publicado
    document.getElementById('comentario-publicado').style.display = "block";

    // Opcional: Limpiar el formulario después de publicar
    document.getElementById('dudas').reset();
}