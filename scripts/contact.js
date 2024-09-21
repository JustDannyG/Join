let contacts = [];
let indexArray = [];
let firstNames = [];

async function initContacts() {
  await getContacts();
  // displayContacts();
  // console.log(firstNames);
}

async function getContacts() {
  const contactsData = await getData("contacts");
  const keys = Object.keys(contactsData);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const contact = contactsData[key];
    console.log(contact);
    contacts.push(contact);
  }
  sortByAlphabet(contacts);
}

function sortByAlphabet(arr) {
  arr.sort((a, b) => a.name.localeCompare(b.name));
  return arr;
}



function renderContacts() {
  let containerRef = document.getElementById("contacts-container");
  containerRef.innerHTML = '';
  let firstLetter = '';
  contacts.forEach(contact => {

    if (firstLetter !== contact.name.charAt(0).toUpperCase()) {
      firstLetter = contact.name.charAt(0).toUpperCase();
      console.log(firstLetter);
      containerRef.innerHTML += `<div>${firstLetter}</div>`;
    }
    console.log(contact.name);
    console.log(contact.email);
    containerRef.innerHTML += `
    <div>
      <span class="initals">${createInititals(contact.name)}</span>
      <div>
        <p>${contact.name}</p>
        <a href="#">${contact.email}</a>
      </div>
    </div>
    `

  });
}


function createInititals(selectName) {
  let firstsChar = selectName;
  parts = firstsChar.split(' ');
  if (parts.length == 1) {
      neededPartOne = parts[0].slice(0, 1);
      return neededPartOne;
  } else if (parts.length == 2) {
      neededPartOne = parts[0].slice(0, 1);
      neededPartTwo = parts[1].slice(0, 1);
      return neededPartOne + neededPartTwo;
  } else if (parts.length == 3) {
      neededPartOne = parts[0].slice(0, 1);
      neededPartThree = parts[2].slice(0, 1);
      return neededPartOne + neededPartThree;
  }
}







// function renderContacts() {
//   const containerRef = document.getElementById("contacts-container");
//   containerRef.innerHTML = "";
//   for (let i = 0; i < contacts.length; i++) {
//     const contactName = contacts[i].name;
//     const contactEmail = contacts[i].email;
//     containerRef.innerHTML += `<div class="d-flex contact">
//   <div id="contact-circle${i}" class="contact-circle center"></div>
//   <span class="column"><span>${contactName}</span> <a href="mailto:${contactEmail}">${contactEmail}</a></span>
// </div>
// `;
//   }
//   getFirstLettersOfName();
// }

// function getFirstLettersOfName() {
//   for (let i = 0; i < indexArray.length; i++) {
//     let contactCirleRef = document.getElementById(`contact-circle${i}`);
//     const nameIndex = indexArray[i];
//     let fullName = ordertContacts[nameIndex].name;
//     let spliTName = fullName.split(" ");
//     let fullNameLength = spliTName.length - 1;

//     let firstName = spliTName[0].charAt(0);
//     let LastName = spliTName[fullNameLength].charAt(0);
//     console.log(firstName, LastName);
//     contactCirleRef.innerHTML = `${firstName + LastName}`;
//     firstNames.push(firstName);
//   }
// }

