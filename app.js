const wrapper = document.querySelector(".wrapper")
const basket = document.querySelector(".basket")
const tikla = document.querySelector(".tıkla")
let api = "https://dummyjson.com/products"


function showHide() {
    tikla.addEventListener("click", (event) => {
        if (!event.composedPath().includes(basket)) {
            basket.classList.toggle("hide")
        } else {
            document.addEventListener("click", () => {
                basket.classList.add("d-none")
            })

        }
    })

}
showHide()



let sepet = []

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
          <h5 class="card-title isim">${urun.title}</h5>
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
            basket.innerHTML = ""

            let card = this.parentElement.parentElement
            let isim = card.querySelector(".isim").textContent
            let resim = card.querySelector(".resim").src
            let fiyat = card.querySelector(".fiyat").textContent


            let sepeteEklenecek = {
                name: isim,
                img: resim,
                price: fiyat,
                adet: 1
            }
            if (sepet.length == 0) {
                sepet.push(sepeteEklenecek)
            } else {
                let varMı = sepet.filter(urun => {
                    if (urun.name == sepeteEklenecek.name) {
                        return urun.adet++
                    }
                })
                if (varMı.length == 0) {
                    sepet.push(sepeteEklenecek)

                }

            }
            sepet.forEach(urun => {
                const div = document.createElement("div")
                div.classList.add("my-5")
                div.innerHTML = `
                    <img
                    width="100px"
                    src="${urun.img}"
                    alt=""
                  />
                  <p>${urun.name}</p>
                  <p>${urun.price}</p>
                  <p>${urun.adet}</p>
                  <p class="sil">X</p>
                    `
                basket.append(div)
            })
            const clears = document.querySelectorAll(".sil")
            clears.forEach(sil => {
                sil.addEventListener("click", function (e) {
                    let isim = this.parentElement.children[1].textContent
                    let deneme = sepet.filter(urun => urun.name != isim)
                    sepet = deneme
                    this.parentElement.remove()
                })
            })
        })
    })
}


