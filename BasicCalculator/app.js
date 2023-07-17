var tus = document.getElementsByClassName("sayi");
var islem = document.getElementsByClassName("islem");
var temizle = document.getElementsByClassName("temizle")[0];
var ekran = document.getElementsByClassName("ekran")[0];
var hesapla = document.getElementsByClassName("hesapla")[0];
var sil = document.getElementsByClassName("sil")[0];


//! temizle tuşu
temizle.onclick = temizleC;
function temizleC() {
    ekran.value = "";
    ilkSayi = 0;
    ikinciSayi = 0;
    butonRenkleriSifirla();

}
//! işlem buton renklerini sıfırlayan kısım 

var butonToplama = document.getElementsByClassName("toplama")[0];
var butonCikarma = document.getElementsByClassName("cikarma")[0];
var butonBolme = document.getElementsByClassName("bolme")[0];
var butonCarpma = document.getElementsByClassName("carpma")[0];

function butonRenkleriSifirla() {
    butonToplama.classList.remove("animasyonluButon");
    butonCikarma.classList.remove("animasyonluButon");
    butonBolme.classList.remove("animasyonluButon");
    butonCarpma.classList.remove("animasyonluButon");

}


//! son karakteri sil tuşu
sil.onclick = sil1;
function sil1() {
    let sayilar = ekran.value;
    sayilar = sayilar.substring(0, sayilar.length - 1);
    ekran.value = sayilar;
}


var ilkSayi = 0;
var ikinciSayi = 0;
var dortIslem, hesap;


function tusBul() {
    var rakam = this.getAttribute("data-sayi");
    ekran.value += rakam;

    //! başa sıfır yazdırmayan kısım
    let sayilar = ekran.value;
    let varmi = sayilar.indexOf("0");
    if (varmi == 0) {
        sil1();
    }
}

for (var i = 0; i < tus.length; i++) {
    tus[i].onclick = tusBul;

}
for (var j = 0; j < islem.length; j++) {
    islem[j].onclick = islemYap;
}

hesapla.onclick = sonucHesapla;





function islemYap() {
    var yapilacakIslem = this.getAttribute("data-islem");
    ilkSayi = parseInt(ekran.value);
    ekran.value = "";
    switch (yapilacakIslem) {
        case "+":
            dortIslem = "+";
            butonToplama.classList.add("animasyonluButon");
            break;
        case "-":
            dortIslem = "-";
            butonCikarma.classList.add("animasyonluButon");
            break;
        case "*":
            dortIslem = "*";
            butonCarpma.classList.add("animasyonluButon");
            break;
        case "/":
            dortIslem = "/";
            butonBolme.classList.add("animasyonluButon");
            break;
        default:
            break;
    }
}

function sonucHesapla() {
    butonRenkleriSifirla();
    ikinciSayi = parseInt(ekran.value);
    switch (dortIslem) {
        case "+":
            hesap = ilkSayi + ikinciSayi;
            ekran.value = hesap;
            break;
        case "-":
            hesap = ilkSayi - ikinciSayi;
            ekran.value = hesap;
            break;
        case "*":
            hesap = ilkSayi * ikinciSayi;
            ekran.value = hesap;
            break;
        case "/":
            hesap = ilkSayi / ikinciSayi;
            ekran.value = hesap;
            break;
        default:
            break;
    }
}

