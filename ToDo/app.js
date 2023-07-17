const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const secondCardBody = document.querySelectorAll(".card-body")[0];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
const messageBoxContainer = document.querySelector(".messageBoxContainer");

let todos = []; // her yerden erişebilmek için global dizi 

runEvents();

function runEvents() { //forma addeventlistener ekledik
    form.addEventListener("submit", addTodo);//submit butonuna basıldığında addTodo fonksiyonu çalışır
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoUI);
    clearButton.addEventListener("click", allTodosEverywhere);
    filterInput.addEventListener("keyup", filter);
}

//sayfa yüklendiğinde todoları getiren metot
function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim(); // arama yerindeki değeri yakaladık. trim ve küçük harf yaparak.
    const todoListesi = document.querySelectorAll(".list-group-item"); // listedeki tüm elemanları seçtik

    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : flex"); //aranılan değer varsa normal şekilde görünüyor önemli olan olay else kısmında 
            }
            else {
                todo.setAttribute("style", "display : none"); // filterde yoksa display none özelliği ekleniyor ve görünmüyor
            }
        });
    }
    else {
        showMessageBox("Filtreleme yapmak için en az bir öğe olmalıdır");
    }
}

function allTodosEverywhere() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        //ekrandan silme
        todoListesi.forEach(function (todo) {//- todoların hepsi bir li etiketi
            todo.remove();
        })

        //storageden silme
        todos = []; // storagenin listesi olan todosu sildi
        localStorage.setItem("todos", JSON.stringify(todos));
        showMessageBox("Başarılı bir şekilde silindi");
    }
    else {
        showMessageBox("Silmek için en az bir öğe olmalıdır");
    }
}

function removeTodoUI(e) {
    if (e.target.className === "fa-regular fa-circle-xmark") //çarpıya bastıysa. Yani bastığı yer fa-regular fa-circle-xmark sınıfı olan ise
    {
        //Ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storage den silme
        removeTodoToStorage(todo.textContent);
        showMessageBox("Öğe başarıyla Silindi");
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);//indexden başla ve bir tane sil. Yani kendisini sil
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}


//addtodo diye genel isim koyuldu. Bu fonksiyonun içine uı ve storage eklemek için iki tane fonksiyon yazılacak
function addTodo(e) { //e yukardaki parametreyi yakalamak için yani event-
    const inputText = addInput.value.trim(); //inputText todo girme yeri olan addInputu yani html sayfasındaki #todoNameyi tutuyor
    if (inputText == null || inputText == "") {
        showMessageBox("Lütfen boş bırakmayınız");
    }
    else {
        //Arayüze ekleme
        addTodoToUI(inputText);

        //Storage ekleme
        addTodoToStorage(inputText);
        showMessageBox("Öğe başarıyla eklendi");
    }
    e.preventDefault();

}

function addTodoToUI(newTodo) { //newTodo yukardan gelen inputText değerini aldı
    const li = document.createElement("li");// nesneler oluşturuluyor
    li.className = "list-group-item";
    li.textContent = newTodo; //yukardan gelen değer

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa-regular fa-circle-xmark"; //çarpı işareti oluşturuldu
    // bu nesneler iç içe olduğu için htmlde. Bu şekilde iç içe yerleştiriliyor
    a.appendChild(i); // a i yi içerir
    li.appendChild(a); // li a yi içerir
    todoList.appendChild(li); // todlist > li > a > i
    //appendchild ile sayfaya ekleniyorlar

    addInput.value = ""; // ekledikten sonra kutucuğu boşaltır
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();//eklemeden önce var mı yok mu kontrol edecek fonksiyonu çağırıyor
    todos.push(newTodo);//kontrolden sonra ekle
    localStorage.setItem("todos", JSON.stringify(todos));//güncel olan arrayı setitem diyerek locastrogeye ekle. Arraye çevrilmiş şekilde ekledi
}

function checkTodosFromStorage() {// kontrol etmeyip üstüne yazarsak eskisi kaybolur. Ordakini alıp üzerine koyup yenisini koymalıyız
    if (localStorage.getItem("todos") === null) { //.  todos isimli key var mı yoksa burası çalışır
        todos = []; // yoksa yeni boş dizi başlatıyor
    }
    else {//varsa todosu arraya çevirip alıp todosa ekliyor. todos başta tanımladığımız global değişken
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

//!Ekranın üst sağ köşesinde çıkan mesaj kutusu
function showMessageBox(message) {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBoxContainer.appendChild(messageBox);
    let cssStil = "transition: ease 0.2s; font - size: 2rem; color:#fff; padding:2rem; margin:1rem; border-radius: 0.3rem; background-color: #6baee0;; box-shadow:0.1rem 0.1rem 1rem;";

    messageBox.setAttribute("style", cssStil);

    setTimeout(function () {
        messageBox.style.opacity = 0; // soldurarak yok olmasını sağlar
    }, 1800);

    setTimeout(function () { //2.5 saniye sonra remove eder
        messageBox.remove();
    }, 2000);
}




