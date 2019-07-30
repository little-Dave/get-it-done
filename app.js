document.addEventListener("DOMContentLoaded", function(){

  const loginForm = document.querySelector("#login-form")
  const loginPage = document.querySelector("#login-page")
  const body = document.querySelector("#body")
  const navbar = document.querySelector("#nav")
  const leave = document.querySelector("#leave")
  const projectsList = document.querySelector("#projects-list")
  let navUser = document.querySelector("#nav-user")
  let currentUser = undefined

  loginForm.addEventListener("submit", function(){
    event.preventDefault();
    let formData = new FormData(event.target);
    let username = formData.get("username");
    let userUrl = `http://localhost:3000/users/${username}`

    fetch(userUrl)
      .then(parseJson)
      .then(logResponse)
      .then(getCurrentUser)
      .then(hideLoginPage)
      .then(transitionToList)

  })
  
  function parseJson(response){
    return response.json();
  }

  function getCurrentUser(response){
    currentUser = response;
  }

  function hideLoginPage(){
    loginPage.classList.add("hide");
  }

  function specifyNavText(){
    navUser.innerText = `${currentUser.name}'s  `;
  }

  function transitionToList(){
    body.classList.add("off-white-background");
    // specifyNavText();
    navbar.classList.remove("hide");
    projectsList.classList.remove("hide");
  }

  leave.addEventListener("mouseover", function(){
    event.target.classList.add("fire-text")
    event.target.addEventListener("mouseout", function(){
      event.target.classList.remove("fire-text")
    })
  })

  leave.addEventListener("click", function(){
    location.reload();
  })

  function logResponse(response){
    console.log(response);
    return response;
  }

})