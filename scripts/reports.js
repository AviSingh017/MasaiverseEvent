
let datarr = [];
async function fetchUserData(page){
    try{
        let data = await fetch(`https://projectdata-ivwu.onrender.com/users`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if(data.ok==true){
            let res = await data.json();
            datarr = res;
            displayReports(res);
        }
        else{
            alert("Unable to get the data");
        }
    }
    catch(err){
        console.log(err)
    }
}
