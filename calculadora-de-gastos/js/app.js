import  UI  from './UI.js';
import Presupuesto from './Presupuesto.js';

//variables
const formulario = document.getElementById('agregar-gasto');
let presupuesto;
const ui = new UI();

//eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
};

//funciones
function agregarGasto(e){
    e.preventDefault();
    const nombre = document.getElementById('gasto').value;
    const cantidad = Number(document.getElementById('cantidad').value);

    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Campos Vacios!!', 'error');
        return;
    }else if(cantidad<=0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida!', 'error');
        return;
    }
    else{
        ui.imprimirAlerta('Gasto Agregado Correctamente!', 'tipo2');
    }
    //objeto gasto
    const gasto = {nombre, cantidad, id: Date.now()}
    
    presupuesto.nuevoGasto(gasto);
    const {gastos, restante } = presupuesto;
    ui.actualizarRestante(restante);
    ui.addListado(gastos);
    ui.comprobarPresupuesto(presupuesto);
    formulario.reset();
};
    
function preguntarPresupuesto(){
    const Uspresupuesto = prompt('inserta un presuspuesto');
    if(Uspresupuesto == '' || Uspresupuesto === null || isNaN(Uspresupuesto) || Uspresupuesto<= 0){
        window.location.reload();
    }
    presupuesto = new Presupuesto(Uspresupuesto);

    ui.addPresupuesto(presupuesto);
};

export function eliminarGastoClick(id){
    presupuesto.eliminarGasto(id);
    const {gastos, restante} = presupuesto;
    ui.addListado(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
};
