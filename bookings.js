let data = localStorage.getItem("bookings");

let container = document.getElementById("bookingList");

if(data === null){
    container.innerHTML = `
    <div class="card" style="text-align:center;padding:30px;">
        <h3>No Bookings Found</h3>
        <p>Start by booking an appointment</p>
    </div>
    `;
}
else{
    let bookings = JSON.parse(data);

    let html = `
    <input type="text" id="searchInput" placeholder="Search by name..." style="width:100%;padding:12px;margin-bottom:15px;border-radius:12px;border:2px solid #c9a7ff;font-size:16px;">
    
    <table border="1" width="100%" cellpadding="10" cellspacing="0">
    <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Service</th>
        <th>Date</th>
        <th>Query</th>
        <th>Action</th>
    </tr>
    `;

    bookings.forEach(function(item, index){
        html += `
        <tr>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.service}</td>
            <td>${new Date(item.date).toDateString()}</td>
            <td>${item.query ? item.query : "-"}</td>
            <td><button onclick="deleteBooking(${index})" class="btn">Delete</button></td>
        </tr>
        `;
    });

    html += `</table>`;

    container.innerHTML = html;
}

function deleteBooking(index){
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.splice(index,1);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    location.reload();
}

document.addEventListener("input", function(e){
    if(e.target.id === "searchInput"){
        let searchValue = e.target.value.toLowerCase();
        let rows = document.querySelectorAll("table tr");

        rows.forEach(function(row, index){
            if(index === 0) return;

            let name = row.cells[0].innerText.toLowerCase();

            if(name.includes(searchValue)){
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }
});