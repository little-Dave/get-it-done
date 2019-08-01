document.addEventListener("DOMContentLoaded", function(){

  const loginForm = document.querySelector("#login-form")
  const loginPage = document.querySelector("#login-page")
  const listPage = document.querySelector("#list-page")
  const createButtonDiv = document.querySelector("#create-button-div")
  const createButton = document.querySelector("#create-button")
  const createAndUpdatePage = document.querySelector("#create-and-update")
  const h2CreateUpdate = document.querySelector("#h2-create-update")
  const pCreateUpdate = document.querySelector("#p-create-update")
  const boomButton = document.querySelector("#boom")
  const patchUpdateButton = document.querySelector("#patch-update")
  const projectForm = document.querySelector("#project-form")
  const formBackToListIcon = document.querySelector("#form-back-to-list-icon")
  const updateBackToListIcon = document.querySelector("#update-back-to-list-icon")
  const showPage = document.querySelector("#show-page")
  const showPgTitle = document.querySelector("#show-page-title")
  const showPgDescription = document.querySelector("#show-page-description")
  const showPgNotes = document.querySelector("#show-page-notes")
  const backToListIcon = document.querySelector("#back-to-list-icon")
  const updateButton = document.querySelector("#update-button")
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
    updateButton.name = thisProject.id;
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
    projectForm.reset();
    listPage.classList.add("hide");
    createButtonDiv.classList.add("hide");
    createAndUpdatePage.classList.remove("hide");
  }

  formBackToListIcon.addEventListener("click", backToListFromCreate)
// -------------------------------------------
  function transitionToListFromCreate(){
    createProjectListCards();
    listPage.classList.remove("hide");
    createButtonDiv.classList.remove("hide");
    createAndUpdatePage.classList.add("hide");
  }

  updateBackToListIcon.addEventListener("click", backToListFromUpdate)
// ---------RIGHT HERE------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function backToListFromUpdate(){
    resetFormData();
    h2CreateUpdate.innerHTML = "";
    h2CreateUpdate.innerText = "Create new project";
    pCreateUpdate.innerText = "Fill in the details below";
    createAndUpdatePage.classList.add("hide");
    boomButton.classList.remove("hide");
    patchUpdateButton.classList.add("hide");
    formBackToListIcon.classList.add("cursor-pointer", "fas", "fa-arrow-left", "fa-lg");
    formBackToListIcon.classList.remove("hide");
    updateBackToListIcon.classList.remove("cursor-pointer", "fas", "fa-arrow-left", "fa-lg");
    updateBackToListIcon.classList.add("hide");
    listPage.classList.remove("hide");
    createButtonDiv.classList.remove("hide");
  }

  function backToListFromCreate(){
    listPage.classList.remove("hide");
    createButtonDiv.classList.remove("hide");
    createAndUpdatePage.classList.add("hide");
  }

  boomButton.addEventListener("click", function(){
    event.preventDefault();
    let formData = new FormData(projectForm);
    let name = formData.get("name");
    let description = formData.get("description");
    let notes = formData.get("notes");
    let userId = currentUser.id;
    let body = {name: name, description: description, notes: notes, user_id: userId};    

    fetch(projectsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(resetList).then(fetchToListFromCreate)
  })
// ---------------------------------------------------------
  function resetList(){
    arrayOfChildren = Array.from(listPage.children);
    for (const child in arrayOfChildren){
      arrayOfChildren[child].remove();
    }
  }

  function fetchToListFromCreate(){
    fetch(`${userBaseUrl}${currentUser.username}`)
      .then(parseJson)
      .then(getCurrentUser)
      .then(transitionToListFromCreate)
  }
// ================================= U P D A T E stuff ============================

  updateButton.addEventListener("click", transitionToUpdate)

  function transitionToUpdate(){
    showPage.classList.add("hide");
    createButtonDiv.classList.add("hide");
    let thisProject = currentUser.projects.find(matchingProject);
    patchUpdateButton.name = `${thisProject.id}`
    updateFormData(thisProject);
    h2CreateUpdate.innerHTML = `Update '<span class="roboto400i">${thisProject.name}</span>'`;
    pCreateUpdate.innerText = "Edit the details below";
    boomButton.classList.add("hide");
    formBackToListIcon.classList.remove("cursor-pointer", "fas", "fa-arrow-left", "fa-lg");
    formBackToListIcon.classList.add("hide");
    patchUpdateButton.classList.remove("hide");
    updateBackToListIcon.classList.add("cursor-pointer", "fas", "fa-arrow-left", "fa-lg");
    updateBackToListIcon.classList.remove("hide");
    createAndUpdatePage.classList.remove("hide");
  }

  function updateFormData(thisProject){
    projectForm.name.value = `${thisProject.name}`;
    projectForm.description.value = `${thisProject.description}`;
    projectForm.notes.value = `${thisProject.notes}`;
  }
  
  patchUpdateButton.addEventListener("click", function(){
    event.preventDefault();
    let formData = new FormData(projectForm);
    let name = formData.get("name");
    let description = formData.get("description");
    let notes = formData.get("notes");
    let projectId = event.target.name
    let body = {name: name, description: description, notes: notes};    

    fetch(`${projectsUrl}${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(resetList).then(fetchToListFromUpdate)
  })

  function fetchToListFromUpdate(){
    fetch(`${userBaseUrl}${currentUser.username}`)
      .then(parseJson)
      .then(getCurrentUser)
      .then(transitionToListFromUpdate)
  }

  function transitionToListFromUpdate(){
    createProjectListCards();
    backToListFromUpdate();
  }

  function resetFormData(){
    projectForm.name.placeholder = "Project name";
    projectForm.description.placeholder = "Short description";
    projectForm.notes.placeholder = "Notes";
  }
  
  function logResponse(response){
    console.log(response);
    return response;
  }

})