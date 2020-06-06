// Colocando a lista dos UF
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) //Quando possui apenas um valor, pode ser escrito assim
    .then( states => {
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const valueUf = event.target.value

    //colocar o nome do estado na URL
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex //Vai falar qual o numero do estado selecionado (sua posição)
    stateInput.value = event.target.options[indexOfSelectedState].text //Pegar a posição do estado e transformar em texto

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valueUf}/municipios`

    citySelect.innerHTML = ''
    fetch(url)
    .then( res => res.json()) //Quando possui apenas um valor, pode ser escrito assim
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 

        }
        citySelect.disabled = false //Se tudo der certo, vai habilitar as cidades
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //Quando mudar o estado, vai executar a função getCities

// Itens de coleta
// Pegar todos os li's

const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//Atualizar o campo escondido com os itens selecionados
const collectedItens = document.querySelector("input[name=itens]")


let selectedItens = []

function handleSelectedItem(event) { 
    const itemLi = event.target

    //ADD ou Remover uma classe 
    itemLi.classList.toggle("selected") //Toggle faz a função de add ou remover

    const itemId = itemLi.dataset.id//Pega os números do ID


    //Verficiar se existem items selecionados, se sim pegar os itens selecionados [array]
    const alredySelected = selectedItens.findIndex(function(item) {
        const itemFound = item == itemId //Isso será true ou False
        return itemFound
    })

    //Se já estiver selecionado,
    if(alredySelected !=-1) {
        // remover da seleção [array]
        const filteresItens = selectedItens.filter((item => { //essa const será um novo array, caso foi true, o filter vai tirar o elemento do novo array
            const itemIsDifferent = item != itemId //Se for igual, vai retornar um false 
            return itemIsDifferent
        }) )

        selectedItens = filteresItens
    } else {//Se não estiver selecionado, add na seleção
        selectedItens.push(itemId) //Coloca no array
    }

    //Atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItens //Vai colocar o valor dos arrays nesse input para conseguir levar para o backend
    
}