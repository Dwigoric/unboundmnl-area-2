async function logIn(){
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-pw").value;
    const error = document.getElementById("login-error");
    
    if (username != "" && password != ""){
        error.textContent = "";

        data = {
            username: username,
            password: password, 
        }

        

        // Just delete this
        // const json = JSON.stringify(data);
        // console.log(json);

        // const response = await fetch ("sign_in/sign_in", {
        //     method: "POST",
        //     body: json,
        //     headers: {
        //                     "Content-Type": "application/json"
        //     }
        // });

        // if (response.status == 200){
        //     window.location.href = "/"
        // } 
        // else if (response.status == 404){
        //     error.textContent = "User not found.";
        // }
        // else if (response.status == 401){
        //     error.textContent = "Password does not match.";
        // }
        // else {
        //     error.textContent = "Error."
        // }
    } else {
        error.textContent = "Error, make sure to fill all fields.";
    }
}