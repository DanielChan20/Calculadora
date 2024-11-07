const pantalla = document.querySelector('.pantalla');
let numeroAnterior = '';
let operadorActual = null;
let reiniciarPantalla = false;

function agregar(valor) {
    if (reiniciarPantalla) {
        pantalla.value = '';
        reiniciarPantalla = false;
    }

    if (['+', '-', '*', '/'].includes(valor)) {
        if (operadorActual !== null) {
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;
    } else {
        pantalla.value += valor;
    }
}

function limpiar() {
    pantalla.value = '';
    numeroAnterior = '';
    operadorActual = null;
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function raizCuadrada() {
    const numero = parseFloat(pantalla.value);
    if (isNaN(numero)) {
        pantalla.value = 'Error';
        setTimeout(limpiar, 1500);
        return;
    }
    pantalla.value = Math.sqrt(numero);
    reiniciarPantalla = true;
}

function calcular() {
    if (operadorActual === null || reiniciarPantalla) return;

    const numero1 = parseFloat(numeroAnterior);
    const numero2 = parseFloat(pantalla.value);

    if (isNaN(numero1) || isNaN(numero2)) {
        pantalla.value = 'Error';
        setTimeout(limpiar, 1500);
        return;
    }

    let resultado;

    switch (operadorActual) {
        case '+':
            resultado = numero1 + numero2;
            break;
        case '-':
            resultado = numero1 - numero2;
            break;
        case '*':
            resultado = numero1 * numero2;
            break;
        case '/':
            if (numero2 === 0) {
                pantalla.value = 'Error';
                setTimeout(limpiar, 1500);
                return;
            }
            resultado = numero1 / numero2;
            break;
        default:
            return;
    }

    resultado = Math.round(resultado * 100000000) / 100000000;
    pantalla.value = resultado;
    operadorActual = null;
    numeroAnterior = '';
    reiniciarPantalla = true;
}

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;

    if (/[0-9+\-*/.]/.test(key)) {
        agregar(key);
    } else if (key === 'Enter') {
        calcular();
    } else if (key === 'Escape') {
        limpiar();
    } else if (key === 'Backspace') {
        borrar();
    } else if (key.toLowerCase() === 'r') {
        raizCuadrada();
    }
});

