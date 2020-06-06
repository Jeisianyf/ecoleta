const button = document.querySelector("#home-page main a")
const modal = document.querySelector("#modal")
const buttonClose = document.querySelector("#modal .header a")

button.addEventListener("click", () => { //Quando clicar vou remover a classe hide
    modal.classList.remove("hide")
})

buttonClose.addEventListener("click", () => {
    modal.classList.add("hide")
})
