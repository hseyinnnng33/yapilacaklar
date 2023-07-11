const tamamlanan = document.querySelectorAll(".icerik_1");
const kartlar = document.querySelectorAll(".kart");

let genislik = 0; // başlangıç değeri
let secilen = []; // seçilen kartların indexlerini tutan dizi

// localStorage'dan verileri okuyup varsa uygulamak
if (localStorage.getItem("genislik")) {
  genislik = JSON.parse(localStorage.getItem("genislik"));
  tamamlanan.forEach((item) => {
    item.style.width = genislik + "%";
    item.style.height = "100%";
  });
}

if (localStorage.getItem("secilen")) {
  secilen = JSON.parse(localStorage.getItem("secilen"));
  secilen.forEach((index) => {
    const checkbox = kartlar[index].querySelector(".box");
    checkbox.checked = true;
    kartlar[index].classList.add("active");
  });
}

kartlar.forEach((item, index) => {
  const checkbox = item.querySelector(".box");

  item.addEventListener("click", function () {
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
      genislik += 2.562;
      tamamlanan.forEach((item) => {

        item.style.width = genislik + "%";
        item.style.height = "100%";
      });
      secilen.push(index); // seçilen indexi diziye ekle
    } else {
      genislik -= 2.562;
      tamamlanan.forEach((item) => {

        item.style.width = genislik + "%";
        item.style.height = "100%";
      });
      secilen.splice(secilen.indexOf(index), 1); // seçilen indexi diziden çıkar
    }

    item.classList.toggle("active");

    // localStorage'a verileri kaydetmek
    localStorage.setItem("genislik", JSON.stringify(genislik));
    localStorage.setItem("secilen", JSON.stringify(secilen));
  });
});

const kalanParaDiv = document.querySelector(".tam");
const initialOffsetTop = kalanParaDiv.offsetTop;

window.addEventListener('scroll', () => {
  if (window.pageYOffset >= initialOffsetTop) {
    kalanParaDiv.style.position = 'fixed';
    kalanParaDiv.style.top = '2%';
    // kalanParaDiv.style.width = '90%';
    // kalanParaDiv.style.left = '3%';
    kalanParaDiv.classList.add("active")
    kalanParaDiv.scrollIntoView({behavior: "smooth"})
  } else {
    kalanParaDiv.style.position = 'static';
  }
});
