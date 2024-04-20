//Variaveis
const cabecalho = document.querySelector('.header')
const menuAdicionar = document.querySelector('.menu-adicionar-container')
const catalogo = document.querySelector('.catalogo-container')
const botaoAdicionar = document.querySelector('.catalogo-btn-adicionar')
const botaoCancelar = document.querySelector('#btn-cancelar')
const statusLido = document.querySelectorAll('.card-status-leitura')
const likeButton = document.querySelectorAll('.fa-heart')
const imgTexto = document.querySelector('.pictureImage')
imgTexto.innerHTML = "Escolher Imagem"
const imgFile = document.querySelector('#imgFile')
const btnAdicionar = document.querySelector('#btn-add')
const inputLivro = document.querySelector('#inputLivro')
const inputAutor = document.querySelector('#inputAutor')
const formPesquisa = document.querySelector('#header-pesquisa')

//Funções
function menuAdicionarNovoLivro(){
    cabecalho.classList.toggle('hide')
    menuAdicionar.classList.toggle('hide')
    catalogo.classList.toggle('hide')
}

function retornarInputaoNormal(){
    if(inputLivro.classList.contains('alerta')){
        inputLivro.classList.remove('alerta')
        inputLivro.placeholder = "Digite o nome de um Livro"
    }
}

function adicionarImagemCapaLivro(img){
    const file = imgFile.files[0];
    let arquivo = true;
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            img.src = event.target.result;
            img.alt = `Imagem do livro: ${inputLivro.value.toLowerCase()}`;
        });
        reader.readAsDataURL(file);
    } else {
        arquivo = false;
    }
    imgFile.value = ''; // Limpa o valor do input file
    return arquivo; // Retorna o status do arquivo (true se existir, false se não)
}

//Validar id
function validarLivro(livro){
    const nomesLivros = document.querySelectorAll('.card-container h4')
    let existe = false
    nomesLivros.forEach(livro => {
        if(livro.textContent.toLowerCase() === inputLivro.value.toLowerCase()){
        existe = true
        }
    })
    return existe
}

function filtrarLivros(event){
    event.preventDefault()

    const inputPesquisa = document.querySelector('#inputPesquisa')
    const todosLivros = document.querySelectorAll('.card-container')
    todosLivros.forEach(livro => {
        if(!livro.id.includes(inputPesquisa.value.toLowerCase())){
            livro.classList.add('hide')
        } else {
            livro.classList.remove('hide')
        }
    })    
}

//Eventos
//Evento ativar/desativar Menu Adicionar Livro
botaoAdicionar.addEventListener('click', menuAdicionarNovoLivro)
botaoCancelar.addEventListener('click', menuAdicionarNovoLivro)
botaoCancelar.addEventListener('click', retornarInputaoNormal)

//Evento do botão de pesquisar
formPesquisa.addEventListener('submit', filtrarLivros)

statusLido.forEach(elemento => {
    elemento.addEventListener('click', ()=>{
        elemento.textContent !== "Lido" ? elemento.textContent = "Lido" : elemento.textContent = "Não Lido"
        elemento.classList.toggle('lido')
    })
})

//Evento para exibir a imagem da capa do livro no menu de Adicionar Livro
imgFile.addEventListener('change', (event)=>{
    const inputTaget = event.target
    const file = inputTaget.files[0]
    if(file){
        //cria objeto para ler o arquivo
        const reader = new FileReader()
        //Adiciona evento durante o carregamento da imagem, onde, adiciona a imagem na tag Span
        reader.addEventListener('load' ,(event)=>{
            const thisReader = event.target
            const img = document.createElement('img')
            img.src = thisReader.result
            imgTexto.innerHTML = ''
            imgTexto.appendChild(img)
        })
        //Lê o arquivo e exibe a imagem
        reader.readAsDataURL(file)
    } else {
        imgTexto.innerHTML = "Escolher Imagem"
    }
})

//Evento que remove a classe Alerta do input Livro
inputLivro.addEventListener('click', retornarInputaoNormal)

//Evento do botão Adicionar
btnAdicionar.addEventListener('click', ()=>{
    
    if(inputLivro.value === ''){
        inputLivro.classList.add('alerta')
        inputLivro.placeholder = 'Insira o nome de um Livro'
    } else if (validarLivro(inputLivro.value)){
        inputLivro.classList.add('alerta')
        inputLivro.value = ''
        inputLivro.placeholder = 'O livro escolhido já existe, favor selecione um novo livro'
    } else {
        
        const catalogo = document.querySelector('#catalogo')

        const divCardContainer = document.createElement('div')
        divCardContainer.classList.add('card-container')
        divCardContainer.id = inputLivro.value.toLowerCase()

        const tituloLivro = document.createElement('h4')
        tituloLivro.textContent = inputLivro.value

        let capaLivro = document.createElement('img')
        if(adicionarImagemCapaLivro(capaLivro)){
            adicionarImagemCapaLivro(capaLivro)
        } else {
            capaLivro = document.createElement('div')
            capaLivro.classList.add('sem-capa')
            capaLivro.innerHTML = `<i class="fa-solid fa-circle-question"></i> Livro sem Capa`
        }
        
        const spanAutor = document.createElement('span')
        inputAutor.value !== "" ? spanAutor.textContent = inputAutor.value : spanAutor.textContent = "Autor Desconhecido"

        const divAvaliacao = document.createElement('div')
        divAvaliacao.classList.add('avaliacao')
        for (let i = 5; i >= 1; i--) {
            const iconeStar = document.createElement('i');
            iconeStar.setAttribute('value', i);
            iconeStar.className = "fa-regular fa-star";
            divAvaliacao.appendChild(iconeStar);
        
            iconeStar.addEventListener('click', () => {
                const valorStar = iconeStar.getAttribute('value');
                const proximaDiv = iconeStar.closest('div');
                const listaEstrelas = Array.from(proximaDiv.children);
                let controle = 0;
        
                for (const item of listaEstrelas) {
                    if (item.getAttribute('value') > controle && item.classList.contains('ativo')) {
                        controle = item.getAttribute('value');
                    }
                }
        
                if (controle === valorStar) {
                    listaEstrelas.forEach(elemento => {
                        elemento.classList.remove('ativo');
                        elemento.classList.replace('fa-solid', 'fa-regular');
                    });
                } else {
                    listaEstrelas.forEach(elemento => {
                        if (elemento.getAttribute('value') <= valorStar) {
                            elemento.classList.replace('fa-regular', 'fa-solid');
                            elemento.classList.add('ativo');
                        } else {
                            elemento.classList.remove('ativo');
                            elemento.classList.replace('fa-solid', 'fa-regular');
                        }
                    });
                }
            });
        }
        
        const divCrossContainer = document.createElement('div')
        divCrossContainer.classList.add('cross-container')
        const iconeCross = `<i class="fa-solid fa-xmark"></i>`
        divCrossContainer.innerHTML += iconeCross
        const excluirLivro = divCrossContainer.querySelector('.fa-xmark')
        excluirLivro.addEventListener('click', ()=>{
            divCardContainer.remove()
        })

        //Card-Status-Container
        const divCardStatusContainer = document.createElement('div')
        divCardStatusContainer.classList.add('card-status-container')

        const divCardStatus = document.createElement('div')
        divCardStatus.classList.add('card-status')
        divCardStatus.addEventListener('click', (event)=>{
            const clicado = event.target.classList
            const spanStatus = divCardStatus.querySelector('span')
            if(clicado.contains('card-status-leitura')){
                spanStatus.textContent !== "Lido" ? spanStatus.textContent = "Lido" : spanStatus.textContent = "Não Lido"
                spanStatus.classList.toggle('lido')
            }
        })

        const spanCardStatus = document.createElement('span')
        spanCardStatus.classList.add('card-status-leitura')
        spanCardStatus.textContent = "Não Lido"

        divCardStatus.appendChild(spanCardStatus)

        divCardStatus.innerHTML += `<i class="fa-regular fa-heart"></i>`
        const iconeHeart = divCardStatus.querySelector('.fa-heart')
        iconeHeart.addEventListener('click', ()=>{
            if(iconeHeart.classList.contains('fa-regular')){
                iconeHeart.classList.replace('fa-regular','fa-solid')
                iconeHeart.classList.toggle('like')
            } else {
                iconeHeart.classList.replace('fa-solid','fa-regular')
                iconeHeart.classList.toggle('like')
            }
        })

        divCardStatusContainer.appendChild(divCardStatus)
        divCardContainer.appendChild(tituloLivro)
        divCardContainer.appendChild(capaLivro)
        divCardContainer.appendChild(spanAutor)
        divCardContainer.appendChild(divAvaliacao)
        divCardContainer.appendChild(divCrossContainer)
        divCardContainer.appendChild(divCardStatusContainer)
        catalogo.appendChild(divCardContainer)
        inputLivro.value = ''
        inputAutor.value = ''
        imgTexto.innerHTML = "Escolher Imagem"
    }
})