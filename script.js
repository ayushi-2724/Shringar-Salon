let modal = document.getElementById("formModal");
let openBtns = document.querySelectorAll(".openForm");
let closeBtn = document.getElementById("closeBtn");

openBtns.forEach(function(btn){
    btn.onclick = function(){
        modal.style.display = "block";
    }
});

closeBtn.onclick = function(){
    modal.style.display = "none";
};

window.onclick = function(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
};

let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phone");
let serviceInput = document.getElementById("service");
let dateInput = document.getElementById("date");

let nameError = document.getElementById("nameError");
let phoneError = document.getElementById("phoneError");
let msg = document.getElementById("msg");

let today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

nameInput.addEventListener("input", function(){
    let regex = /^[A-Za-z ]+$/;

    if(nameInput.value === ""){
        nameError.innerText = "";
    }
    else if(!regex.test(nameInput.value)){
        nameError.innerText = "Only letters allowed";
    }
    else{
        nameError.innerText = "";
    }
});

phoneInput.addEventListener("input", function(){
    let phone = phoneInput.value;

    if(phone.length > 10){
        phoneInput.value = phone.slice(0,10);
    }

    if(phone === ""){
        phoneError.innerText = "";
    }
    else if(phone.length !== 10 || isNaN(phone)){
        phoneError.innerText = "Enter valid 10 digit number";
    }
    else{
        phoneError.innerText = "";
    }
});

document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let service = serviceInput.value;
    let date = dateInput.value;
    let query = document.getElementById("query").value;

    let nameValid = /^[A-Za-z ]+$/.test(name);

    if(name === ""){
        msg.innerText = "Please enter your name";
        msg.style.color = "red";
        return;
    }

    if(!nameValid){
        msg.innerText = "Name should contain only letters";
        msg.style.color = "red";
        return;
    }

    if(phone === ""){
        msg.innerText = "Please enter phone number";
        msg.style.color = "red";
        return;
    }

    if(phone.length !== 10 || isNaN(phone)){
        msg.innerText = "Invalid phone number";
        msg.style.color = "red";
        return;
    }

    if(service === ""){
        msg.innerText = "Please select a service";
        msg.style.color = "red";
        return;
    }

    if(date === ""){
        msg.innerText = "Please select a date";
        msg.style.color = "red";
        return;
    }

    let selectedDate = new Date(date);
    let currentDate = new Date(today);

    if(selectedDate < currentDate){
        msg.innerText = "Past date not allowed";
        msg.style.color = "red";
        return;
    }

    let userData = {
        name: name,
        phone: phone,
        service: service,
        date: date,
        query: query
    };

    let bookingsArray = [];

    let existing = localStorage.getItem("bookings");

    if(existing){
        try{
            bookingsArray = JSON.parse(existing);
        }catch{
            bookingsArray = [];
        }
    }

    bookingsArray.push(userData);

    localStorage.setItem("bookings", JSON.stringify(bookingsArray));

    msg.innerText = "Appointment Booked Successfully!";
    msg.style.color = "green";

    alert("Appointment Confirmed!");

    document.getElementById("bookingForm").reset();
});