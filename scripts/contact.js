let ordertContacts = [];
let indexArray = [];
let firstNames = [];

async function initContacts() {
  await getContacts();
  orderContacts();
  displayContacts();
  console.log(firstNames);
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
function testfunction() {
  let;
}

function orderContacts() {
  ordertContacts.sort((a, b) => a.name.localeCompare(b.name));
}

function testMerge() {
  let;
}

function displayContacts() {
  const containerRef = document.getElementById("contacts-container");
  containerRef.innerHTML = "";
  for (let i = 0; i < ordertContacts.length; i++) {
    const contactName = ordertContacts[i].name;
    const contactEmail = ordertContacts[i].email;
    indexArray.push(i);
    containerRef.innerHTML += `<div class="d-flex contact">
  <div id="contact-circle${i}" class="contact-circle center"></div>
  <span class="column"><span>${contactName}</span> <a href="mailto:${contactEmail}">${contactEmail}</a></span>
</div>
`;
  }
  getFirstLettersOfName();
}

function getFirstLettersOfName() {
  for (let i = 0; i < indexArray.length; i++) {
    let contactCirleRef = document.getElementById(`contact-circle${i}`);
    const nameIndex = indexArray[i];
    let fullName = ordertContacts[nameIndex].name;
    let spliTName = fullName.split(" ");
    let fullNameLength = spliTName.length - 1;

    let firstName = spliTName[0].charAt(0);
    let LastName = spliTName[fullNameLength].charAt(0);
    console.log(firstName, LastName);
    contactCirleRef.innerHTML = `${firstName + LastName}`;
    firstNames.push(firstName);
  }
}
