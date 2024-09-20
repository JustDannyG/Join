let ordertContacts = [];

async function initContacts() {
  let contacts = await getData("contacts");
  let keys = Object.keys(contacts);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    let contactName = contacts[key].name;
    ordertContacts.push(contactName);
    // containerRef.innerHTML += contactName;
  }
  console.log(ordertContacts);
  ordertContacts.sort();
  console.log(ordertContacts);
  displayContacts();
}

function displayContacts() {
  let containerRef = document.getElementById("contacts-container");
  containerRef.innerHTML = "";
  for (let i = 0; i < ordertContacts.length; i++) {
    const contact = ordertContacts[i];
    containerRef.innerHTML += contact;
    console.log(contact);
  }
}
