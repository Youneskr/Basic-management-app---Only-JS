title = document.querySelector('#title')
price = document.querySelector('#price')
taxes = document.querySelector('#taxes')
ads = document.querySelector('#ads')
discount = document.querySelector('#discount')
count = document.querySelector('#count')
total = document.querySelector('#total')
category = document.querySelector('#category')
submit = document.querySelector('#submit')

let tmp
mod = 'create'

//Get the top button:
topBtn = document.getElementById("topBtn")
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}
function topFunction() {
    scroll({
        top : 0,
        behavior : "smooth"
    })
}

// Import Data
if (localStorage.data != null) {
    data = JSON.parse(localStorage.data)
} else {
    data = []
}

showData()

// Total
function getTotal() {
    if (price.value != '') {
        total.innerHTML = +price.value + +taxes.value + +ads.value - + discount.value
        total.style.background = "green"
    }else {
        total.style.background = "red"
        total.innerHTML = ''
    }
}

// Crate / Update Data
submit.onclick = function createData() {
    newData = {
        title : title.value,  
        price : price.value, 
        taxes : taxes.value, 
        ads : ads.value, 
        discount : discount.value, 
        total : total.innerHTML, 
        category : category.value, 
        count : count.value, 
    }

    if(mod === 'create') {
        if(newData.count > 1){
            for(let i = 0; i < newData.count; i++){
                data.push(newData)
            }
        }else {
            data.push(newData)
        }
    }else {
        data[tmp] = newData
    }
    mod = 'create'
    submit.innerHTML = 'Create'
    submit.style.background = '#222d83'
    count.style.display = 'block'
    localStorage.setItem('data', JSON.stringify(data))
    clearData()
    showData()
}

// Clear Data
function clearData(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    count.value = ''
    discount.value = ''
    total.innerHTML = ''
    category.value = ''
    total.style.background = "red"
    total.innerHTML = ''
}

// Show Data
function showData() {
    tbody = document.querySelector('#tbody')
    table = ''
    for(let i = 0; i < data.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick="update(${i})">Update</button></td>
                <td><button onclick="deleteRecord(${i})">Delete</button></td>
            </tr>
        `
    }
    tbody.innerHTML = table
    if(data.length != 0){
        document.querySelector('.deleteAll').innerHTML = `<button onclick="deleteAll()" id="deleteAll">Delete All ( ${data.length} )</button>`
    }else{
        document.querySelector('.deleteAll').innerHTML = ''
    }
}

// Delete Record
function deleteRecord(id) {
    if (confirm("Delete Product!")) {
        data.splice(id,1)
        localStorage.setItem('data', JSON.stringify(data))
        showData()
    }
}

// Update 
function update(id){
    mod = 'update'
    title.value = data[id].title
    price.value = data[id].price
    taxes.value = data[id].taxes
    ads.value = data[id].ads
    discount.value = data[id].discount
    total.innerHTML = data[id].total
    category.value = data[id].category
    total.style.background = "green"
    submit.innerHTML = 'Update'
    submit.style.background = '#228329'
    count.style.display = 'none'
    tmp = id
    scroll({
        top : 0,
        behavior : "smooth"
    })
}

// Delete All
function deleteAll() {
    if (confirm("Delete All!")){
        data = []
        localStorage.clear()
        showData()
    }
}