let ordertContacts = [];

async function initContacts() {
  await getContacts();
  orderContacts();
  displayContacts();
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

function displayContacts() {
  const containerRef = document.getElementById("contacts-container");
  containerRef.innerHTML = "";
  for (let i = 0; i < ordertContacts.length; i++) {
    const contactName = ordertContacts[i].name;
    const contactEmail = ordertContacts[i].email;
    containerRef.innerHTML += `<div class="d-flex contact">
  <div class="user-circle center">AM</div>
  <span class="column"><span>${contactName}</span> <a href="mailto:${contactEmail}">${contactEmail}</a></span>
</div>
`;
  }
}
