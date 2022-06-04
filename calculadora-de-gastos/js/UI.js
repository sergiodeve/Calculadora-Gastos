const divTotal = document.getElementById('total');
const divRestante = document.getElementById('restante');
const listGastos = document.getElementById('gastos');
const colorRestante = document.querySelector('.restante');
import {eliminarGastoClick} from './app.js';

class UI {

    addPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        divTotal.textContent = presupuesto;
        divRestante.textContent = restante;
    };

    actualizarRestante(restante){
        divRestante.textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success')
        }
        const formulario = document.getElementById('agregar-gasto');
        divMensaje.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, document.querySelector('.refer'));

        setTimeout(()=>{
            divMensaje.remove();
        },3000)
    };

    addListado(gastos){
        this.cleanHtml();

        gastos.forEach((gasto) => {
            const {nombre, cantidad, id} = gasto;
            
            const li = document.createElement('li');
            li.className ='list-group-item d-flex justify-content-between align-items-center';
            li.setAttribute('data-id', id);
            li.innerHTML = `
                ${nombre} <span class="badge badge-primary badge-pill p-2"> ${cantidad}€ </span>
            `;
            const botonDelete = document.createElement('button');
            botonDelete.onclick = ()=>{
                eliminarGastoClick(id)
            }
            botonDelete.textContent = 'Delete';
            botonDelete.classList.add('btn', 'btn-danger', 'borrar-gasto')
            li.append(botonDelete);
            listGastos.append(li);
            console.log(gasto)
        });
    };
            
    cleanHtml(){
        while(listGastos.firstChild){
            listGastos.removeChild(listGastos.firstChild);
        }
    };
          
    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        if( (presupuesto / 4) > restante){
            colorRestante.className = 'alert alert-danger';
        }else if((presupuesto / 2)> restante){
            colorRestante.className = 'alert alert-warning';
        }else{
            colorRestante.className = 'alert alert-success';
        };

        if(restante <= 0){
            this.imprimirAlerta('Presupuesto Agotado!!', 'error');
            document.querySelector('button[type="submit"]').disabled = true;
        };
    };
};

export default UI;








