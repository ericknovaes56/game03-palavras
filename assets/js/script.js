const body = document.querySelector('.alerts')
if (!localStorage.getItem('range')){
    localStorage.setItem("range", 'false')
}
var activerange = document.getElementById("activerange")
if (localStorage.getItem('range') == 'true'){
    document.getElementById("rangelimit").click()
    activerange.style.border= '1px solid #21f33d'
    activerange.style.color= '#21f33d'
    activerange.innerHTML='Ativado'
    msg('Range Ativado', 'O raige ta ativado por padrão ao atualizar a pagina seu valor é 5 !',8000, '#04EC07')
}
if (!localStorage.getItem('bemvindo')){
    localStorage.setItem('bemvindo','true')
    msg('Boas-vindas', 'Para jogar, basta digitar no campo abaixo.', 16000)
}
var word = document.getElementById("word")


var backp = 0
var palavra = ''
var erros = 0
var pontos = 0
var range = 5
var valor33 =  document.getElementById("range")
valor33.value = range
valor33.addEventListener("input", ()=>{
    if (localStorage.getItem('range') == 'true'){
        range = valor33.value
        console.log(range)
        document.getElementById("show").innerHTML=range
    }else{
        window.location.href='index.html'
    }
})
activerange.addEventListener("click", ()=>{
    if (localStorage.getItem('range') == 'false'){
        msg('Range Ativado', 'O raige ta ativado por padrão ao atualizar a pagina seu valor é 5 !',8000, '#04EC07')
        activerange.style.border= '1px solid #21f33d'
        activerange.style.color= '#21f33d'
        activerange.innerHTML='Ativado'
        localStorage.setItem("range", 'true')

       var valor =  document.getElementById("range")
       valor.addEventListener("input", ()=>{
        document.getElementById("show").innerHTML=range
        range = valor.value
        console.log(range)
       })
    }else{
        localStorage.setItem("range", 'false')
        activerange.style.border= ''
        activerange.style.color= ''
        activerange.innerHTML='Ativar'
    }
})

if (!localStorage.getItem('norepeat')){
    localStorage.setItem('norepeat', "")
}
function generator(){
    const url = 'https://api.dicionario-aberto.net/random';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const palavraAleatoria = data.word;
        norepeatf(palavraAleatoria)
    });

}
generator()
function norepeatf(value){
    var array = localStorage.getItem('norepeat')
    array = array.split(',');
    if (array.includes(value)){
        generator()
    }else{
        if(value.includes('-')){
            generator()
        }else{
            if (localStorage.getItem('range')=='true'){
                if (range > 4 && range < 16){
                    if (value.length != range){
                        generator()
                        createRange(value)
                        var box = document.querySelector(".procurando")
                        var max = box.clientHeight
                        box.scrollBy(0,max)
        
                    }else{
                        var box = document.querySelectorAll(".procurando span")
                        np = 0
                        box.forEach(element => {
                            element.remove()
                        });
                        palavra = value
                        palavra = palavra.toLowerCase()
                        word.innerHTML=palavra
                    }
                }else{
                    alert('Opa! seu espertinho sai fora !')
                    window.location.href='index.html'
                }
            }else{
                palavra = value
                palavra = palavra.toLowerCase()
                word.innerHTML=palavra
                var box = document.querySelectorAll(".procurando span")
                box.forEach(element => {
                    element.remove()
                });
            }
        }
    }
}
var np = 0
function createRange(range){
    var box = document.querySelector(".procurando")
    var span = document.createElement("span")
    np++
    span.innerHTML=np+"."+ range
    box.appendChild(span)
}
var user = document.getElementById('userword')
user.addEventListener("input" , (event)=>{
    var value = user.value
    value = value.toLowerCase()
    if (value.length == palavra.length){
        vdd(value)
    }
    var value = user.value
    document.getElementById("pre").innerHTML=value
})

if (!localStorage.getItem('pontos')){
    localStorage.setItem('pontos', 0)
}
function vdd(value){
    if (palavra == value){
        if (localStorage.getItem('norepeat') == ""){
            localStorage.setItem('norepeat' , palavra)
        }
        else{
            var array = localStorage.getItem('norepeat')
            array = array.split(',');
            array.push(palavra)
            localStorage.setItem('norepeat' , array)
        }
        word.style.color='green'
        msg('Acertou !', 'A palavra "' + value + '" foi digitada corretamente !',2000, '#04EC07')
        user.value = ""
        document.getElementById("pre").innerHTML=""
        pontos++
        backp++
         document.getElementById("pontos").innerHTML=pontos
        setTimeout(() => {
            word.style.color='gray'
            palavra = "++++++++++++++++++++++++++"
            word.innerHTML = "<i class='bx bx-loader-alt bx-spin' ></i>"
            generator()
        }, 500);
        var save = document.getElementById("save")
        if (save.checked){
            var soma = parseInt(localStorage.getItem('pontos')) + 1
            localStorage.setItem('pontos', soma)
        }
        updateHistory()
    }else{
        word.style.color='red'
        msg('Errou !', 'A palavra "' + palavra + '" foi digitada incorretamente !',2000, 'red')
        user.value = ""
        document.getElementById("pre").innerHTML=""
        erros++
        document.getElementById("erros").innerHTML=erros
        setTimeout(() => {
            word.style.color='gray'
            palavra = "++++++++++++++++++++++++++"
            word.innerHTML = "<i class='bx bx-loader-alt bx-spin' ></i>"
            generator()
        }, 500);
    }
}

var dark = document.getElementById("dark")
dark.addEventListener("change", ()=>{
    if (dark.checked){
        document.querySelector("body").classList.add("dark")
        user.classList.add("dark")
        localStorage.setItem("color", 'dark')
        msg('Tema escuro ativado!', 'Este tema foi projetado para proteger seus olhos. Obrigado por ativá-lo!', 8000)
    }else{
        localStorage.setItem("color", 'white')
        document.querySelector("body").classList.remove("dark")
        msg('Tema claro ativado!', 'Este tema pode cansar seus olhos. Recomendamos que você retorne ao tema escuro para uma melhor experiência.',8000)
    }
})
var memoria = localStorage.getItem('color')
if (memoria){
    if (memoria == 'dark'){
        document.querySelector("body").classList.add("dark")
        user.classList.add("dark")
        dark.click()
    }
}
var save = document.getElementById("save")
save.addEventListener("change", ()=>{
    if (save.checked){
        document.getElementById("pontos").innerHTML= localStorage.getItem('pontos')
        pontos = localStorage.getItem('pontos')
        localStorage.setItem('active', 'true')
        msg('Pontos Gerais', 'Agora seus pontos são persistentes e permanecerão mesmo após atualizar a página!', 8000)
    }else{
        pontos = backp
        document.getElementById("pontos").innerHTML=pontos
        localStorage.setItem('active', 'false')
    }
})


if (localStorage.getItem("active") == 'true'){
    save.click()
}

document.getElementById("btn").addEventListener("click",()=>{
    localStorage.setItem('active', 'false')
    localStorage.setItem("color", 'white')
    localStorage.setItem('pontos', 0)
    localStorage.removeItem('bemvindo')
    localStorage.removeItem('norepeat')
    localStorage.removeItem('range')
    window.location.href='index.html'
    msg('Configurações redefinidas!', 'Você redefiniu todas as configurações, incluindo pontos gerais e tema escolhido.', 8000)
    if (save.checked){
        save.click()
    }
    if (dark.checked){
        dark.click()
    }
})

function msg(vh1,vp, time,color){
    var box = document.createElement('div')
    var h1 = document.createElement('h1')
    if (color){
        h1.style.color=color
    }
    box.addEventListener("click", ()=>{
        box.classList.remove('show_alert')
        setTimeout(() => {
            box.remove()
        }, 200);
    })
    h1.innerHTML=vh1
    var p = document.createElement('p')
    p.innerHTML=vp
    box.classList.add("alert")
    setTimeout(() => {
        box.classList.add('show_alert')
    }, 1);
    setTimeout(() => {
        box.classList.remove('show_alert')
        setTimeout(() => {
            box.remove()
        }, 200);
    }, time);
    body.appendChild(box)
    box.appendChild(h1)
    box.appendChild(p)
}
word.addEventListener("click", ()=>{
    var url = 'https://www.google.com/search?q='+word.innerHTML
    window.open(url, '_blank');
})
function n(){
    var palavrasExistentes = 600000
    var array = localStorage.getItem('norepeat')
    array = array.split(',');
    if (array == ""){
        var tiradas = array.length - 1
        var resultado = parseInt(palavrasExistentes) - parseInt(tiradas)
        var html = document.querySelector('.feitas')
        return(tiradas+' de '+ resultado)
    }else{
        var tiradas = array.length
        var resultado = parseInt(palavrasExistentes) - parseInt(tiradas)
        var html = document.querySelector('.feitas')
        return(tiradas+' de '+ resultado)
    }
}

function updateHistory(){
    var box = document.querySelector(".iwords")
    var spans = document.querySelectorAll(".iwords span")
    spans.forEach(element => {
        element.remove()
    });
    var array = localStorage.getItem('norepeat')
    array = array.split(',');
    var count = array.length
    if(array == ""){
        array = 0
        count = 0
    }else{
        document.getElementById("count").innerHTML='#VocÊ digitou '+count+' palavras'
        array.forEach(element => {
            var span = document.createElement('span')
            span.innerHTML=element
            box.insertBefore(span, box.firstChild);
        });
    }
}
updateHistory()