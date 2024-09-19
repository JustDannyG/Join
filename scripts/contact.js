async function initContacts(){
    let containerRef = document.getElementById("contacts-container")
     containerRef.innerHTML=""
    let contacts = await getData("contacts")
    let keys = Object.keys(contacts)
  
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        let contactName = contacts[key].name
        containerRef.innerHTML+=contactName
    }
}
