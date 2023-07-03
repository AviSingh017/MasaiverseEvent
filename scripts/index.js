document.querySelector("#adminBtn").addEventListener("click",()=>{
    window.location.href = "admin.html";
});

document.querySelector("#userBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});

let form = document.querySelector("form");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj = {
        name: form.name.value,
        age: form.age.value,
        place: form.place.value,
        batch_name: form.batch_name.value,
        profession: form.profession.value
    }
    userPostData(obj);
});

async function userPostData(obj){
    try{
        let data = await fetch("https://projectdata-ivwu.onrender.com/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        if(data.ok){
            alert("User Registered Successfully");
        }
    }
    catch(err){
        console.log(err);
    }
}