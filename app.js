document.addEventListener("DOMContentLoaded", function(){

  const loginForm = document.querySelector("#login-form")
  const loginPage = document.querySelector("#login-page")
  const listPage = document.querySelector("#list-page")
  const showPage = document.querySelector("#show-page")
  const body = document.querySelector("#body")
  const navbar = document.querySelector("#nav")
  const leave = document.querySelector("#leave")
  let navUser = document.querySelector("#nav-user")
  let currentUser = undefined

  loginForm.addEventListener("submit", function(){
    event.preventDefault();
    let formData = new FormData(event.target);
    let username = formData.get("username");
    let userUrl = `http://localhost:3000/users/${username}`

    fetch(userUrl)
      .then(parseJson)
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

  // function specifyNavText(){
  //   navUser.innerText = `${currentUser.name.toUpperCase()}'s  `;
  // }

  function transitionToList(){
    body.classList.add("off-white-background");
    // specifyNavText();      <<    this is to add user's name on navbar
    createProjectListCards();
    navbar.classList.remove("hide");
    listPage.classList.remove("hide");
  }

  function transitionToShowProject(){
    listPage.classList.add("hide");
    showPage.classList.remove("hide");
  }

  function createProjectListCards(){
    for(const project of currentUser.projects) {
      displayProjectListCard(project);
    }
  }

  function displayProjectListCard(project){
    let li = document.createElement("div");
    li.classList.add("container");

    let firstDiv = document.createElement("div");
    firstDiv.classList.add("card", "list-card");

    let secondDiv = document.createElement("div");
    secondDiv.classList.add("card-body");
 
    let h2 = document.createElement("h2");
    h2.classList.add("roboto900i", "new-black");
    h2.innerText = project.name;

    let p = document.createElement("p");
    p.classList.add("roboto400", "new-black");
    p.innerText = project.description;

    let thirdDiv = document.createElement("div");
    thirdDiv.classList.add("card-footer", "text-right", "custom-footer");

    let button = document.createElement("button");
    button.classList.add("btn", "light-it-up");
    button.innerText = "View";
    button.addEventListener("click", transitionToShowProject)

    secondDiv.append(h2, p);
    thirdDiv.append(button);
    firstDiv.append(secondDiv, thirdDiv);
    li.appendChild(firstDiv);
    listPage.appendChild(li);
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