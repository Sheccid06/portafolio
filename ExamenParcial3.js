function leer(){
    var h = parseInt(document.getElementById("horas").value);
    var a = document.getElementById("auto").value;
    var total = h * parseInt(a);
    document.getElementById("resultado").innerHTML = "El total a pagar es de: $" + total + ".00";
}