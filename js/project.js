let curId = 1000;
const loadData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data));

  if (id == 1005) {
    curId = 0;
  } else {
    curId = id;
  }

  if (id == 1000) {
    colorChange("all");
  } else if (id == 1001) {
    colorChange("music");
  } else if (id == 1003) {
    colorChange("comedy");
  } else if (id == 1005) {
    colorChange("drawing");
  }
};
loadData(1000);

const displayData = (data) => {
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  if (!data.length) {
    mainContainer.innerHTML = `
    <div class="mx-auto">
    <img src="images/icon.png" class="w-100 mt-4" />
    <h1 class="text-danger text-center">Sorry! No content found!</h1>
    <div class="mt-4 text-center">
        <a class="home" href="./index.html">Home</a>
      </div>
    </div>
    
    `;
  }
  data.forEach((data) => {
   
    const icon = '<i class="ms-2 text-primary fa-regular fa-circle-check"></i>';
    const allSec = parseInt(data.others.posted_date / 60);
    const hour = parseInt(allSec / 60);
    const min = allSec - hour * 60;
    const time = `
    <div class="absolute py-2">
      <small class="bg-dark rounded-3 text-end text-light py-1 px-3">
        ${hour} hrs ${min} min ago
      </small>
    </div>`;
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
    <div class="p-2 border-c mb-5">
      <div id="show-time" class="mb-4 relative">
        <img class="w-100 inner-image rounded-3" src=${
          data.thumbnail
        } alt="thumbnail">
        
        ${data.others.posted_date ? time : ""}
      </div>
      <div class="row d-flex justify-content-center align-items-center mt-2 px-2">
        <div class="col-lg-3 col-sm-6 d-flex justify-content-center align-items-center">
          <img src="${
            data.authors[0].profile_picture
          }" alt="" class="profile" />
          
        </div>
        <div class="col-lg-8 col-sm-12 ms-4">
          <h6 class="dark">${data.title}</h6>
          <div class="d-flex justify-content-start align-items-center">
            <div><small class="text-secondary">${
              data.authors[0].profile_name
            }</small></div>
            <div id="v">
              ${data.authors[0].verified ? icon : ""}
            </div>
          </div>
          <small class="text-secondary">${data.others.views}</small>
        </div>
      </div>
    </div> `;

    mainContainer.appendChild(card);
  });
};

let con = false;

const loadData2 = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${curId}`)
    .then((res) => res.json())
    .then((data) => sortView(data.data));
};
loadData2();

const sortView = (view) => {
  con = true;
  if (con) {
    loadData2();
    con = false;
  }

  document.getElementById("sort-views").addEventListener("click", () => {
    const sortedView = view?.sort(
      (a1, a2) => parseFloat(a2.others.views) - parseFloat(a1.others.views)
    );

    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";
    displayData(sortedView);
    colorChange("sort-views");
  });
};

function colorChange(cat) {
  const list = ["all", "music", "comedy", "drawing", "sort-views"];
  if (cat == "sort-views") {
    const sortId = document.getElementById(cat);
    sortId.classList.add("btn-danger");
  } else {
    for (let i = 0; i < list.length; i++) {
      const id = document.getElementById(list[i]);

      if (list[i] == cat) {
        id.classList.add("btn-danger");
      } else {
        id.classList.remove("btn-danger");
        id.classList.add("btn-secondary");
      }
    }
  }
}


