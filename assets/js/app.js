const users = document.querySelector(".users"),
  toggle = document.querySelector("#toggle"),
  userFilter = document.querySelector(".user__filter"),
  formUser = document.querySelector(".form__user"),
  overlay = document.querySelector(".overlay"),
  usersCarts = document.querySelector(".users__jobs-carts"),
  checkInput = document.querySelector("#check__input"),
  primaryBtn = document.querySelector(".primary"),
  root = document.querySelector(":root"),
  footerInfoTitle = document.querySelector(".footer__info-title"),
  userAboutForm = document.querySelector(".user__about-form"),
  searchFilter = document.querySelector(".filter__search > img"),
  iconDown = document.querySelector(".fa-angle-down"),
  selects = document.querySelector(".new__main-select"),
  editBtn = document.querySelector(".edit_btn");

let result = [];
let mainData = [];
let createForm = document.querySelector(".new__main-form");
let typeSelect = document.querySelector(".new__main-selects > span");

let modes = localStorage.getItem("mode");
let jobsData = localStorage.getItem("jobsData");
if (jobsData) {
  try {
    mainData = JSON.parse(jobsData);
  } catch (err) {
    console.error(err);
  }
}

if (modes === "dark") {
  toggle.classList.toggle("active");
  localStorage.setItem("mode", "dark");
  root.style.setProperty("--light-gray", "#121721");
  root.style.setProperty("--white", "#19202D");
  root.style.setProperty("--very-dark-blue", "#fff");
  root.style.setProperty("--dark-grey", "#FFF");
}

let data = [];

data = mainData;

function getCurrentUrl() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  let pathName = window.location.pathname.split("/").pop();

  return {
    id: id,
    pageName: pathName,
  };
}

let page = getCurrentUrl();

if (page.pageName === "add.html") {
  addJob();
  selectType();
  toggleModes();
}
if (page.pageName === "index.html") {
  getData(data);
  toggleModes();
  searchBtn();
  filterSearch();
}

if (page.pageName === "edit.html") {
  editPage();
  toggleModes();
  selectType();
}

if (page.pageName === "detail.html") {
  generateInnerPage();
  toggleModes();
}

function addJob() {
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newData = {
      id: createForm.ID.value,
      image: createForm.title.value,
      workTime: createForm.time.value,
      workType: typeSelect.textContent,
      duty: createForm.duty.value,
      job: createForm.job.value,
      residence: createForm.residence.value,
    };

    data.push(newData);
    localStorage.setItem("jobsData", JSON.stringify(data));
    alert("Added Data");

    window.location.href = "/index.html";
  });
}

function getData(data) {
  let dataText = "";
  data.map((item) => {
    let { id, image, workTime, workType, duty, job, residence } = item;
    dataText += `
            <div class="user__job-cart">
              <figure class="user__job-logo">
                 <img src="${image}" alt="group">
              </figure>
              <div class="user__job-info">
              <div class="user__job">
              <span class="user__job-time">${workTime} <span class="line__circle"></span><span class="user__job-mode">${workType}</span></span>
              <a href="/detail.html?id=${id}" onClick="generateInnerPage(this)" class="user__job-duty">${duty}</a>
              <span class="user__job-company">${job}</span>
              </div>
              <div class="user__job-body">
              <p class="user__job-residence">${residence}</p>
              <a href="/edit.html?id=${id}" class="user__job-residence">Edit Data</a>
              <button class="btn__light-violet" onClick="deleteData(${id})"> Delete Data </button>
              </div> 
              </div>
            </div>
              `;
    usersCarts.innerHTML = dataText;
  });
}

function generateInnerPage() {
  let findData = getDataById(page.id, data);

  users.innerHTML += `
        <aside class="users__jobs">
        <figure class="users__jobs-logo users__jobs--logo">
           <img src="${findData.image}" alt="Group19">
        </figure>
        <div class="user__jobs-about">
           <div class="jobs__info">
              <span class="jobs__info-title">${findData.job}</span>
              <span class="jobs__info-subtitle">${findData.innerData.site}</span>
           </div>
           <button type="submit" class="btn__light-violet">
              Company Site
           </button>
        </div>
      </aside>
      <article class="users__details">
      
        <div class="users__info">
           <div class="users__info-article">
              <span class="users__info-workTime"><span class="users__info-time">${findData.workTime} </span><span class="line__circle"></span><span class="users__info-workType">${findData.workType}</span></span>
              <a class="users__info-duty">${findData.duty}</a>
              <p class="users__info-residence">${findData.residence}</p>
           </div>
           <button type="submit" class="btn__violet suc">Apply Now</button>
        </div>
      
        <p class="users__jobs-about">${findData.innerData.info}</p>
      
        <div class="jobs__about">
           <h4 class="jobs__about-title">Requirements</h4>
           <p class="jobs__about-subtitle jobs__about--requirement">${findData.innerData.requirement.info}</p>
           <div class="jobs__about-lists">
              <div class="lists__selections">
                 <span class="list__selection"></span>
                 <p id="demo" data-key="1" class="list__option">${findData.innerData.requirement.list[0].text}</p>
              </div>
              <div class="lists__selections">
                 <span class="list__selection"></span>
                 <p class="list__option">${findData.innerData.requirement.list[1].text}</p>
              </div>
              <div class="lists__selections">
                 <span class="list__selection"></span>
                 <p class="list__option">${findData.innerData.requirement.list[2]?.text}</p>
              </div>
              <div class="lists__selections">
                 <span class="list__selection"></span>
                 <p class="list__option">${findData.innerData.requirement.list[3]?.text}</p>
              </div>
           </div>
      
        </div>
        
        <div class="jobs__about">
           <h4 class="jobs__about-title">What You Will Do</h4>
           <p class="jobs__about-subtitle jobs__about--lorem">${findData.innerData.whatYouWillDo.info}</p>
           <div  class="jobs__about-lists">
              <div class="lists__selections">
                 <span class="selection__number">1</span>
                 <p  class="list__option list__option--number">${findData.innerData.whatYouWillDo.list[0].text}</p>
              </div>
              
              <div class="lists__selections">
                 <span class="selection__number">2</span>
                 <p class="list__option list__option--number">${findData.innerData.whatYouWillDo.list[1].text}</p>
              </div>
              <div class="lists__selections">
                 <span class="selection__number">3</span>
                 <p class="list__option list__option--number">${findData.innerData.whatYouWillDo.list[2].text}</p>
              </div>
              <div class="lists__selections">
                 <span class="selection__number">4</span>
                 <p class="list__option list__option--number">${findData.innerData.whatYouWillDo.list[3].text}</p>
              </div>
           </div>
        </div>
      </article>  
      `;
  footerInfoTitle.textContent = findData.duty;
}

function filterInput(terms, key, data) {
  terms = terms.toLowerCase();
  const currentItem = data.filter((item) => {
    const currentData = item[key]?.toLowerCase();
    return currentData.includes(terms);
  });
  return currentItem;
}

function searchBtn() {
  primaryBtn.addEventListener("click", filterBtn);
  userAboutForm.addEventListener("submit", filterBtn);
  searchFilter.addEventListener("click", filterBtn);
}

function filterBtn(e) {
  e.preventDefault();
  let resultTitle = filterInput(userAboutForm.text.value, "duty", data);
  let resultResidence = filterInput(
    userAboutForm.location.value,
    "residence",
    resultTitle
  );
  if (checkInput.checked) {
    let resultChecked = filterInput("Full Time", "workType", resultResidence);
    getData(resultChecked);
  } else {
    getData(resultResidence);
  }
  if (resultTitle.length < 1 || resultResidence.length < 1) {
    alert("don't find");
    userAboutForm.text.value = "";
    userAboutForm.location.value = "";
    getData(resultResidence);
  }
  formUser.classList.remove("clicked");
  overlay.classList.remove("change");
}

function filterSearch() {
  userFilter.addEventListener("click", (e) => {
    formUser.classList.toggle("clicked");
    overlay.classList.toggle("change");
  });
}

function changeMode() {
  toggle.classList.toggle("active");
  if (toggle.classList.contains("active")) {
    localStorage.setItem("mode", "dark");
    root.style.setProperty("--light-gray", "#121721");
    root.style.setProperty("--white", "#19202D");
    root.style.setProperty("--very-dark-blue", "#fff");
    root.style.setProperty("--dark-grey", "#FFF");
    root.style.setProperty("--light-violet", "#2b2d42");
    root.style.setProperty("--violet", "#fff");
    root.style.setProperty("--light-violet-active", "#adb5bd");
  } else {
    localStorage.removeItem("mode");
    root.style.setProperty("--light-gray", "#F4F6F8");
    root.style.setProperty("--white", "#FFF");
    root.style.setProperty("--very-dark-blue", "#19202D");
    root.style.setProperty("--dark-grey", "#6E8098");
    root.style.setProperty("--light-violet", "#e7eef9");
    root.style.setProperty("--violet", "#5964E0");
    root.style.setProperty("--light-violet-active", "#b8c0ff");
  }
}

function toggleModes() {
  toggle.addEventListener("click", changeMode);
}

function selectType() {
  iconDown.addEventListener("click", (e) => {
    selects.classList.toggle("visible");
  });

  let options = selects.querySelectorAll(".new__main-option");
  let spanElement = document.querySelector(".new__main-selects > span");

  options.forEach((item) => {
    item.addEventListener("click", (e) => {
      selects.classList.remove("visible");
      spanElement.textContent = item.textContent;
    });
  });
}

function getDataById(id, data) {
  return data.find((item) => {
    return item.id == id;
  });
}

function editPage() {
  let editData = getDataById(page.id, data);

  createForm.ID.value = editData.id;
  createForm.title.value = editData.image;
  typeSelect.textContent = editData.workType;
  createForm.duty.value = editData.duty;
  createForm.job.value = editData.job;
  createForm.residence.value = editData.residence;

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const newData = {
      id: createForm.ID.value,
      image: createForm.title.value,
      workType: typeSelect.textContent,
      duty: createForm.duty.value,
      job: createForm.job.value,
      residence: createForm.residence.value,
    };

    let updateData = data.map((item) => {
      if (item.id == page.id) {
        return { ...item, ...newData };
      }
      else{
        return item
      }
    });

    localStorage.setItem("jobsData", JSON.stringify(updateData));
    alert("Successfully Edit Data");
    window.location.href = "/index.html";
  });
}

function deleteData(id) {
  event.preventDefault();
  let deletePost = data.filter(item =>{
    return item.id != id;
  });
  getData(deletePost)
  localStorage.setItem("jobsData",JSON.stringify(deletePost));
}
