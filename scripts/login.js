let form = document.querySelector("form");
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let obj = {
        email: form.email.value,
        password: form.password.value
    }
    adminlogin(obj);
});

async function adminlogin(obj){
    try{
        let login = await fetch("https://reqres.in/api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        if(login.ok){
            let data = await login.json();
            let Dtoken = data.token
            localStorage.setItem("Token",Dtoken)
            window.location.href = "data.html"
        }
        else{
            document.querySelector("#load").innerHTML= "Loading..."
        }
    }
    catch(err){
        console.log(err)
    }
}