function enviar() {
    var total = 0;
    var resultados = [];
    for (var x = 1; x <= 10; x++) {
        var res = 0;
        var nom = "r" + x;
        var result = document.getElementsByName(nom);
        for (var i = 0; i < result.length; i++) {
            if (result[i].checked == true) {
                res = parseInt(result[i].value);
            }
        }       
        resultados.push(res * 10); // Puntaje por pregunta (0 o 10)
        total = total + res;
    }
    document.getElementById("calificacion").innerHTML = "Total: " + (total * 10) + "/100";
    generarGrafico(resultados);
}
function generarGrafico(puntajes) {
    const ctx = document.getElementById('puntajeGrafico').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }   
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'],
            datasets: [{
                label: 'Puntaje por pregunta',
                data: puntajes,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Puntos (0-10)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Número de pregunta'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '/10 puntos';
                        }
                    }
                }
            }
        }
    });
}
function generarPDFenIframe() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Resultado del Cuestionario sobre Caballos", 15, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 15, 30);
    const respuestasCorrectas = ["B", "C", "C", "A", "C", "B", "B", "C", "B", "C"];
    const letrasOpciones = ["A", "B", "C", "D"];  
    let yPosition = 40;
    doc.setFontSize(12);
    for (let x = 1; x <= 10; x++) {
        const preguntaElement = document.querySelector(`li:nth-child(${x*2-1})`);
        const preguntaText = preguntaElement.textContent;
        let respuestaUsuario = "";
        const radios = document.getElementsByName("r" + x);       
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                respuestaUsuario = letrasOpciones[i];
                break;
            }
        }
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Pregunta ${x}:`, 15, yPosition);
        const lines = doc.splitTextToSize(preguntaText, 180);
        doc.setFontSize(12);
        doc.text(lines, 20, yPosition + 7);
        doc.setFontSize(12);
        doc.text(`Tu respuesta: ${respuestaUsuario || "No respondida"}`, 20, yPosition + 7 + (lines.length * 7));        
        const correctaY = yPosition + 14 + (lines.length * 7);
        doc.text(`Respuesta correcta: ${respuestasCorrectas[x-1]}`, 20, correctaY);
        if (respuestaUsuario === respuestasCorrectas[x-1]) {
            doc.setTextColor(0, 128, 0); 
        } else if (respuestaUsuario) {
            doc.setTextColor(255, 0, 0); 
        } else {
            doc.setTextColor(100);
        }        
        doc.text(`Puntos: ${respuestaUsuario === respuestasCorrectas[x-1] ? "10" : "0"}`, 160, correctaY);
        doc.setTextColor(0, 0, 0);       
        yPosition += 30 + (lines.length * 7);
        if (yPosition > 250 && x < 10) {
            doc.addPage();
            yPosition = 20;
        }
    }
    doc.setFontSize(16);
    doc.text("Calificación final: " + document.getElementById("calificacion").textContent, 15, yPosition + 10);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    document.getElementById('visorPDF').src = pdfUrl;
    setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
    }, 300000);
}