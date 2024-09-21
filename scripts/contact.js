let ordertContacts = [];
let indexArray = [];
let firstNames = [];
let groupedContacts = {};

async function initContacts() {
  await getContacts();
  orderContacts();
  groupContactsByFirstLetter();
  displayGroupedContacts();
}

async function getContacts() {
  const contacts = await getData("contacts");
  const keys = Object.keys(contacts);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const contact = contacts[key];
    ordertContacts.push(contact);
  }
}

function orderContacts() {
  ordertContacts.sort((a, b) => a.name.localeCompare(b.name));
}

function groupContactsByFirstLetter() {
  for (let i = 0; i < ordertContacts.length; i++) {
    const contact = ordertContacts[i];
    const firstLetter = contact.name.charAt(0);

    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = [];
    }
    groupedContacts[firstLetter].push(contact);
  }
}

function displayGroupedContacts() {
  const containerRef = document.getElementById("contacts-container");
  containerRef.innerHTML = "";
  let indexCircle = 0;

  for (const letter in groupedContacts) {
    containerRef.innerHTML += `<h3>${letter}</h3>`;
    const contactsGroup = groupedContacts[letter];

    for (let i = 0; i < contactsGroup.length; i++) {
      const contact = contactsGroup[i];
      const contactName = contact.name;
      const contactEmail = contact.email;

      indexArray.push(indexCircle);

      containerRef.innerHTML += `
        <div class="d-flex contact">
          <div id="contact-circle${indexCircle}" class="contact-circle center"></div>
          <span class="column">
            <span>${contactName}</span> 
            <a href="mailto:${contactEmail}">${contactEmail}</a>
          </span>
        </div>
      `;

      indexCircle++;
    }
    containerRef.innerHTML += `<div class="group-separator"></div>`;
  }
  getFirstLettersOfName();
}

function getFirstLettersOfName() {
  for (let i = 0; i < indexArray.length; i++) {
    let contactCircleRef = document.getElementById(`contact-circle${i}`);
    const nameIndex = indexArray[i];
    let fullName = ordertContacts[nameIndex].name;
    let spliTName = fullName.split(" ");
    let fullNameLength = spliTName.length - 1;
    let firstName = spliTName[0].charAt(0);
    let lastName = spliTName[fullNameLength].charAt(0);

    contactCircleRef.innerHTML = `${firstName}${lastName}`;
    updateCircleColor(i);
  }
}
function updateCircleColor(i) {
  const contactCircleRef = document.getElementById(`contact-circle${i}`);
  const rgb = [255, 0, 0];

  rgb[0] = Math.round(Math.random() * 255);
  rgb[1] = Math.round(Math.random() * 255);
  rgb[2] = Math.round(Math.random() * 255);

  const brightness = Math.round((parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000);
  const textColour = brightness > 125 ? "black" : "white";
  const backgroundColour = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";

  contactCircleRef.style.backgroundColor = backgroundColour;
  contactCircleRef.style.color = textColour;
}

// function updateCircleColor(i) {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);

// }
