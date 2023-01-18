//variable declaration (const)
const listViewDiv = document.getElementById("listView");

//generates random id for the product
function randomIdGenerator(number) {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(number).substring(1);
  };
  return S4() + S4();
}

//MAINTANANCE
function p(text) {
  console.log(text);
}
//END OF MAINTANANCE

//image loader variables :)
//try catch cause it throws an error which is not fatal but still no errors means cool code:)
try {
  var imageLoader = document.getElementById('inputImage');
  imageLoader.addEventListener('change', handleImage, false);
  var canvas = document.getElementById('loadInCanvas');
  var ctx = canvas.getContext('2d');
  

  //TODO: MAKE IT CHECK THE DAMN FILE
  function handleImage(e){
    p(canvas);
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
          p("loading in!");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
            p("printing");
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  
}
catch{
  p("Not creation page");
}
//end of loader

function getDescById(itemId) {
  return randomIdGenerator(36) + randomIdGenerator(36);
}
function getNameBytId(itemId) {
  return randomIdGenerator(36);
}
function getContactById(itemId) {
  return randomIdGenerator(10);
}

function getElementDataFromDB(elementId) {}

function getAllListelements() {}

function loadListElement(elementId) {
  const prodName = getNameBytId(elementId);
  const prodDesc = getDescById(elementId);

  const buttonId = "button_" + elementId;
  const html = `<div id=${elementId} class="listObject">
    <img class="descImg" src=""/>
    <div class="descriptor">
        <h2 class="objectName">${prodName}</h2>
        <p class="overText">Описание: </p>
        <div class="descContents">
            <p class="descText">${prodDesc}</p>
            <img class="describingImage" src="attachedImages/tree.jpg"/>
        </div>
    </div>
    <div class="interactivePart">
        <button id=${buttonId} class="numberReveal" onclick="revealContactInfo(${
    "'" + elementId
  }')">Показать Контакт</button>
        <button class="favButton">Добавить в избранное</button>
        <button class="deleteButton">Удалить Товар</button>
    </div>
</div>`;


  if (listViewDiv!=null)
  {
    listViewDiv.innerHTML = listViewDiv.innerHTML + html;
  }
  
}

function addNewItemToDB(eventName, eventDesc, contacts, eventImg) {
  let itemId = randomIdGenerator(16);


  let base64Img=document.getElementById("loadInCanvas").toDataURL();
  //base64Img = btoa(base64Img);

  var data = new FormData();
  data.append("eventImg", base64Img);
  data.append("eventImgType", (itemImg[0].type).replace("image/", ""));
  data.append("itemId", itemId);
  data.append("eventName", eventName);
  data.append("eventDesc", eventDesc);
  data.append("contacts", contacts);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xmlhttp.open("POST", "server.php");
  xmlhttp.send(data);
}

function removeItemFromDB(itemId) {}

function revealContactInfo(contactInfoId) {
  let button = null;
  try {
    button = document.getElementById("button_" + contactInfoId);
  } catch {
    console.log("no such button was found");
    return false;
  }
  button.innerHTML = getContactById(contactInfoId);
}

function createNewItem() {}

//add a new favourite to the local storage of the browser
function favourite(elementId) {
  let currentFavourites = localStorage.getItem("favs");

  if (currentFavourites == "null") {
    currentFavourites = "";
  }

  console.log(currentFavourites);
  currentFavourites += "/" + elementId;

  localStorage.setItem("favs", currentFavourites);
}

//find and remoe the favourited elements id from local storage of the browser
function removeFromFavourites(elementId) {
  let currentFavourites = localStorage.getItem("favs");

  if (currentFavourites === "null") {
    currentFavourites = currentFavourites.replace(elementId, "");
    currentFavourites = currentFavourites.replace("//", "/");

    console.log(currentFavourites);
    localStorage.setItem("favs", currentFavourites);
  }
}

//checks if any of the favourites have been already removed from the database
function scoutFavourites() {
  const currentFavourites = localStorage.getItem("favs");

  const favArray = currentFavourites.split("/");
  favArray.forEach((id) => {
    console.log(id);
    if (getElementDataFromDB(id) === false) {
      removeFromFavourites(id);
    }
  });
}

//for (var i=1; i<=10; i+=1)
//{
//loadListElement(randomIdGenerator(16))
//}

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string
    !isNaN(parseFloat(str))
  ); //and ensure strings of whitespace fail
}

function openItemCreator() {
  window.location.href = "creation.html";
}

function checkCreationData() {
  addNewItemToDB(
    1,
    2,
    3,
    4
  );
  try{
  const inputedName = document.getElementById("nameInput").innerText;
  const inputedDesc = document.getElementById("descInput").innerText;
  const inputedContacts = document.getElementById("contactInput").innerText;
  const inputedFiles = document.getElementById("inputImage").files;
  if (
    inputedName.length >= 5 &&
    inputedDesc.length >= 1 &&
    inputedContacts.length === 8 &&
    inputedCost.length >= 1
  )
  addNewItemToDB(
    inputedName,
    inputedDesc,
    inputedContacts,
    inputedFiles
  );
  }
  catch{
    document.getElementById("errorMessager").innerText="ВВЕДИТЕ ВСЕ ПОЛЯ (картинка не обязательно)"
  }
}

loadListElement(randomIdGenerator());
