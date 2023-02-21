var words = [
    "Item",
    "Gratuito",
    "Proibido",
    "Rubrica",
    "Recorde",
    "Pudico",
    "Menu",
    "Ali",
    "Raiz",
    "Higiene",
    "Somente",
    "Sozinho",
    "Coco",
    "Flor",
    "cor",
    "Gta",
    "Minecraft",
]
var ramdom = (num) => Math.floor(Math.random()* num)
var word = document.getElementById("word")
var backp = 0
var palavra = ''
var erros = 0
var pontos = 0

function generator(){
    if (words.length >= 1){
        var maxitem = words.length - 1
        aleatorio = ramdom(maxitem)
        palavra = words[aleatorio]
        palavra = palavra.toLowerCase()
        word.innerHTML = palavra
    }else{
        alert('parabens vc ganhou !')
    }
}
var user = document.getElementById('userword')
user.addEventListener("input" , (event)=>{
    var value = user.value
    value = value.toLowerCase()
    if (value.length == palavra.length){
        vdd(value)
    }
})
user.addEventListener('input', ()=>{
    var value = user.value
    document.getElementById("pre").innerHTML=value
})

if (!localStorage.getItem('pontos')){
    localStorage.setItem('pontos', 0)
}
function vdd(value){
    if (palavra == value){
        word.style.color='green'
        user.value = ""
        document.getElementById("pre").innerHTML=""
        pontos++
        backp++
         document.getElementById("pontos").innerHTML=pontos
        setTimeout(() => {
            word.style.color='gray'
            words.splice(aleatorio, 1)
            generator()
        }, 500);
        var save = document.getElementById("save")
        if (save.checked){
            var soma = parseInt(localStorage.getItem('pontos')) + 1
            localStorage.setItem('pontos', soma)
        }
    }else{
        word.style.color='red'
        user.value = ""
        document.getElementById("pre").innerHTML=""
        erros++
        document.getElementById("erros").innerHTML=erros
        setTimeout(() => {
            word.style.color='gray'
            generator()
        }, 500);
    }
}
generator()
var dark = document.getElementById("dark")
dark.addEventListener("change", ()=>{
    if (dark.checked){
        document.querySelector("body").classList.add("dark")
        user.classList.add("dark")
        localStorage.setItem("color", 'dark')
    }else{
        localStorage.setItem("color", 'white')
        document.querySelector("body").classList.remove("dark")
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
    if (save.checked){
        save.click()
    }
    if (dark.checked){
        dark.click()
    }
})