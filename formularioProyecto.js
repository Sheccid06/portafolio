function leer() {
    var nombre = document.getElementById("nombre").value;
    var invitados = parseInt(document.getElementById("invitados").value);
    var tipoServicio = document.getElementById("tipoServicio").value;
    
    var cotizacion = 0;
    
    if (tipoServicio == 1) {
        cotizacion = ((invitados * 5) * 20) + 2000;
    } else if (tipoServicio == 2) {
        cotizacion = ((invitados * 5) * 15) + 200;
    } else if (tipoServicio == 3) {
        cotizacion = (invitados * 5) * 15;
    }
    
    // Deberías mostrar el resultado al usuario
    alert("El costo estimado para " + nombre + " es: $" + cotizacion);
}

function generar() {
    // Obtener todos los valores del formulario
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var tipoEvento = document.getElementById("tipoEvento").value;
    var tipoEventoTexto = document.getElementById("tipoEvento").options[document.getElementById("tipoEvento").selectedIndex].text;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var direccion = document.getElementById("direccion").value;
    var invitados = parseInt(document.getElementById("invitados").value);
    var tipoServicio = document.getElementById("tipoServicio").value;
    var tipoServicioTexto = document.getElementById("tipoServicio").options[document.getElementById("tipoServicio").selectedIndex].text;

    // Calcular cotización
    var cotizacion = 0;
    
    if (tipoServicio == 1) {
        cotizacion = ((invitados * 5) * 20) + 2000;
    } else if (tipoServicio == 2) {
        cotizacion = ((invitados * 5) * 15) + 200;
    } else if (tipoServicio == 3) {
        cotizacion = (invitados * 5) * 15;
    }

    // Formatear cotización como moneda
    var cotizacionFormateada = "$" + cotizacion.toLocaleString("es-MX");

    // Crear PDF
    var doc = new jsPDF();
    
    // Estilo para el título
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 20, "Cotización de Evento");
    
    // Estilo para los datos
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    
    // Datos del cliente
    doc.text(20, 35, "Datos del Cliente:");
    doc.text(20, 45, "Nombre: " + nombre);
    doc.text(20, 55, "Correo: " + correo);
    doc.text(20, 65, "Teléfono: " + telefono);
    
    // Detalles del evento
    doc.text(20, 80, "Detalles del Evento:");
    doc.text(20, 90, "Tipo de evento: " + tipoEventoTexto);
    doc.text(20, 100, "Fecha: " + fecha);
    doc.text(20, 110, "Hora: " + hora);
    doc.text(20, 120, "Ubicación: " + direccion);
    doc.text(20, 130, "Número de invitados: " + invitados);
    doc.text(20, 140, "Tipo de servicio: " + tipoServicioTexto);
    
    // Cotización (resaltada)
    doc.setFontSize(16);
    doc.setTextColor(0, 100, 0);
    doc.text(20, 160, "Cotización total: " + cotizacionFormateada);
    
    // Nota
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(20, 180, "Esta cotización es válida por 15 días a partir de la fecha de emisión.");
    var string = doc.output('datauristring');
	$('.cotizacion').attr('src', string); 
}
