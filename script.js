
const lista = document.querySelector('.lista');
const botaoAddTask = document.querySelector('#btn-add');
const inputTask = document.querySelector('#input-add');

const getBanco = () => JSON.parse(localStorage.getItem('taskList')) ?? [];
const banco = getBanco();
const setBanco = () => localStorage.setItem('taskList', JSON.stringify(banco))


const criarItem = (tarefa, statusTarefa, index) =>{

 const li = document.createElement('li');
  li.innerHTML = `
    <label>
      <input type="checkbox" class="checkbox" ${statusTarefa} data-identificador=${index}>
      ${tarefa}
      <button type="submit" data-identificador=${index} class="lixeira">X</button>
    </label>
  `;
    lista.append(li);
    
}

const atualizarTarefas = () =>{
  lista.innerHTML ='';
  
  banco.forEach((item, index) => criarItem(item.tarefa, item.status, index));
}


const adicionarNovaTarefa = () => {
 
  if(inputTask.value != '' && inputTask.value != ' '){
    banco.push({tarefa: `${inputTask.value}`, status: ''})
    setBanco(banco);
    atualizarTarefas();
    document.querySelector('#input-add').value = '';
  }
}

const editarTarefa = (event) =>{
  
  const elemento = event.target;
  const identificador = event.target.dataset.identificador;
    if(elemento.type === 'checkbox'){                //concluir tarefa
      if(event.target.checked)
        banco[identificador].status='checked';
      else
        banco[identificador].status='';
    }else if(elemento.type === 'submit'){              //excluir tarefa
      banco.splice(identificador, 1)
    }
    setBanco(banco);
    atualizarTarefas();
}

botaoAddTask.addEventListener('click',adicionarNovaTarefa);
lista.addEventListener('click', editarTarefa)

atualizarTarefas();


