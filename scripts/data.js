let datarr = [];
let token = localStorage.getItem("Token");
let page = localStorage.getItem("page")||1;
fetchUserData(page);

async function fetchUserData(page){
    try{
        let data = await fetch(`https://projectdata-ivwu.onrender.com/users?_page=${page}&_limit=5`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if(data.ok==true){
            let res = await data.json();
            datarr = res;
            appendData(res);
        }
        else{
            alert("Unable to get the data");
        }
    }
    catch(err){
        console.log(err)
    }
}

function appendData(data){
    let mainsection = document.querySelector("#MainContainer");
    mainsection.innerHTML = null;

    data.map((item)=>{
        let maindiv = document.createElement("div");
        let div = document.createElement("div");

        let img = document.createElement("img");
        if(item.img){
            img.src = item.img;
        }
        else{
            img.src = "https://media.istockphoto.com/id/924508390/photo/software-developer.jpg?s=612x612&w=0&k=20&c=daTO11QqiJErkXJfQECxF1aCukiwcaHJP8sv9T4UUjU="
        }
        img.setAttribute("class","img");

        let name = document.createElement("h1");
        name.innerText = item.name;

        let age = document.createElement("p");
        age.innerText = item.age;

        let place = document.createElement("p");
        place.innerText = item.place;

        let batch = document.createElement("p");
        batch.innerText = `Batch: ${item.batch_name}`;

        let profession = document.createElement("p");
        profession.innerText = `profession: ${item.profession}`;

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.setAttribute("class", "del");
        delBtn.setAttribute("data-id",item.id);

        div.append(img,name,age,place,batch,profession,editBtn,delBtn);
        maindiv.append(div);
        mainsection.append(maindiv);
    });

    let deletefun = document.querySelectorAll(".del");
    for(let delBtn of deletefun){
        delBtn.addEventListener("click",(event)=>{
            let button = event.target;
            let id = button.dataset.id;
            delData(id);
        });
    }
}

async function delData(id){
    try{
        let data = await fetch(`https://projectdata-ivwu.onrender.com/users/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if(data.ok){
            appendData(data);
        }
    }
    catch(err){
        console.log(err);
    }
}

let sortfun = document.querySelector("#sort");
sortfun.addEventListener("change",(event)=>{
    let value = event.target.value;
    let sortedData;
    if(value==""){
        appendData(datarr);
    }
    if(value=="asc"){
        sortedData = datarr.sort((a,b)=> a.age-b.age);
    }
    else if (value=="dsc"){
        sortedData = datarr.sort((a,b)=> b.age-a.age);
    }
    appendData(sortedData);
});

let filterfun = document.querySelector("#filter");
filterfun.addEventListener("change",(event)=>{
    let value = event.target.value;
    let filterData;
    if(value==""){
        appendData(datarr);
    }
    else{
        filterData = datarr.filter((element)=>{
            return element.profession==value;
        });
        appendData(filterData);
    }

});

let searchBTN = document.querySelector("#srcBtn");
searchBTN.addEventListener("click",function(){
    let value = document.querySelector("#search").value;
    searchFun(value);
});

function searchFun(value){
    if(value==""){
        appendData(datarr);
    }
    else{
        let searchData = datarr.filter((ele)=>{
            return ele.name.toLowerCase().includes(value.toLowerCase());
        });
        appendData(searchData);
    }
}

document.querySelector("#next").addEventListener("click",()=>{
    page++
    localStorage.setItem("page",page);
    fetchUserData(page);
});

document.querySelector("#prev").addEventListener("click",()=>{
    page--;
    if(page<=0){
        page=1;
        fetchUserData(page);
    }
    localStorage.setItem("page",page)
    fetchUserData(page);
});

