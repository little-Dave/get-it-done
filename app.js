document.addEventListener("DOMContentLoaded", function(){

  const loginForm = document.querySelector("#login-form")
  const loginPage = document.querySelector("#login-page")
  const listPage = document.querySelector("#list-page")
  const createButtonDiv = document.querySelector("#create-button-div")
  const createButton = document.querySelector("#create-button")
  const createAndUpdatePage = document.querySelector("#create-and-update")
  const projectForm = document.querySelector("#project-form")
  const formBackToListIcon = document.querySelector("#form-back-to-list-icon")
  const showPage = document.querySelector("#show-page")
  const showPgTitle = document.querySelector("#show-page-title")
  const showPgDescription = document.querySelector("#show-page-description")
  const showPgNotes = document.querySelector("#show-page-notes")
  const backToListIcon = document.querySelector("#back-to-list-icon")
  const doneButton = document.querySelector("#done-button")
  const body = document.querySelector("#body")
  const navbar = document.querySelector("#nav")
  const leave = document.querySelector("#leave")
  let navUser = document.querySelector("#nav-user")
  let currentUser = undefined
  let userBaseUrl = `http://localhost:3000/users/`
  let projectsUrl = `http://localhost:3000/projects/`
  

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
    createButtonDiv.classList.remove("hide");
  }

  function transitionToListFromShow(){
    showPage.classList.add("hide");
    listPage.classList.remove("hide");
    createButtonDiv.classList.remove("hide");
  }

  backToListIcon.addEventListener("click", transitionToListFromShow)

  doneButton.addEventListener("click", deleteProject)

  function deleteProject(){
    fetch(`${projectsUrl}${event.target.name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    updateList();
    returnToUpdatedList();
  }

  function updateList(){
    projects = Array.from(document.querySelectorAll("li"));
    projects.find(liToDelete)
  }

  function liToDelete(project){
    if (project.name == event.target.name){
      project.remove();
    }
  }

  function returnToUpdatedList(){
    showPage.classList.add("hide");
    listPage.classList.remove("hide");
    createButtonDiv.classList.remove("hide");
    console.log(event.target)
  }

  // function congratulate(response){
  //   const possibleResponses = ["Way to go, Ace", "Damn. You're good.", "Killin' it!", "A+", "Keep it up!"];
  //   let thisReponse = possibleResponses[Math.floor(Math.random()*possibleResponses.length)];
  //   alert(thisReponse);
  //   return response;
  // }

  function transitionToShowProject(){
    listPage.classList.add("hide");
    createButtonDiv.classList.add("hide");
    let thisProject = currentUser.projects.find(matchingProject);
    showProjectOnCard(thisProject);
    showPage.classList.remove("hide");
  }

  function matchingProject(project){
    if (project.id == event.target.name){
    return project
    }
  }

  function showProjectOnCard(thisProject){
    showPgTitle.innerText = thisProject.name;
    showPgDescription.innerText = thisProject.description;
    showPgNotes.innerText = thisProject.notes;
    doneButton.name = thisProject.id;
  }

  function createProjectListCards(){
    for(const project of currentUser.projects) {
      displayProjectListCard(project);
    }
  }

  function displayProjectListCard(project){
    let li = document.createElement("li");
    li.classList.add("container");
    li.name = project.id;

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
    button.classList.add("btn", "light-it-up", "view-button", "btn-sm");
    button.innerText = "View";
    button.type = "button";
    button.name = project.id;
    button.addEventListener("click", transitionToShowProject);

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

  createButton.addEventListener("click", transitionToCreate)

  function transitionToCreate(){
    listPage.classList.add("hide");
    createButtonDiv.classList.add("hide");
    createAndUpdatePage.classList.remove("hide");
  }

  formBackToListIcon.addEventListener("click", transitionToListFromCreate)

  function transitionToListFromCreate(){
    listPage.classList.remove("hide");
    createButtonDiv.classList.remove("hide");
    createAndUpdatePage.classList.add("hide");
  }

  projectForm.addEventListener("submit", function(){
    event.preventDefault();

  })

  function logResponse(response){
    console.log(response);
    return response;
  }

})