document.addEventListener("DOMContentLoaded", function(){

  const loginForm = document.querySelector("#login-form")
  const loginPage = document.querySelector("#login-page")

  loginForm.addEventListener("submit", function(){
    event.preventDefault();
    let formData = new FormData(event.target);
    let username = formData.get("username");
    let userUrl = `http://localhost:3000/users/${username}`

    fetch(userUrl)
      .then(parseJson)
      .then(logResponse)
      .then(hideLoginPage)

  })
  
  function parseJson(response){
    return response.json();
  }

  function hideLoginPage(){
    loginPage.classList.add("hide")
  }

  function logResponse(response){
    console.log(response);
  }

})