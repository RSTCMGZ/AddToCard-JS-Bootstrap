const wrapper = document.querySelector(".wrapper")
let api = "https://dummyjson.com/products"

async function getProducts() {
    let response = await fetch(api)
    let data = await response.json()
    ekranaYazdir(data.products)
}
getProducts()

function ekranaYazdir(urunler) {
    urunler.forEach(urun => {
        const card = document.createElement("div")
        card.classList.add("card", "p-3")
        card.innerHTML =
            `
        <img src="${urun.thumbnail}" style="width: 18rem;" class="card-img-top resim m-auto" alt="..." />
        <div class="card-body text-center">
          <h5 class="card-title ad">${urun.title}</h5>
          <p class="card-text">
            ${urun.description}
          </p>
          <p class="card-text fiyat">
            ${urun.price}₺
          </p>
          <button class="btn btn-primary tikla">Satın Al</button>
        </div>
        `
        wrapper.append(card)
    })
    const buttonlar = document.querySelectorAll(".tikla")
    buttonlar.forEach(btn => {
        btn.addEventListener("click", function () {
            let card = this.parentElement.parentElement
            let isim = card.querySelector(".isim").textContent
            let resim = card.querySelector(".resim").src
            let fiyat = card.querySelector(".fiyat").textContent
        })
    })
}
