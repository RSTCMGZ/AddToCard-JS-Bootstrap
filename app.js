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
        <img src="${urun.thumbnail}" style="width: 18rem;" class="card-img-top m-auto" alt="..." />
        <div class="card-body text-center">
          <h5 class="card-title">${urun.title}</h5>
          <p class="card-text">
            ${urun.description}
          </p>
          <p class="card-text">
            ${urun.price}
          </p>
         
          <a href="#" class="btn btn-primary">Satın Al</a>
        </div>
        `
        wrapper.append(card)
    })
}