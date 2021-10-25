const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  }
  catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id.toString() === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  }
  catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const base = data.filter(({ id }) => id.toString() !== contactId.toString())
    await fs.writeFile(contactsPath, JSON.stringify(base, null, 2));
    return base;
  }
  catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newUser = { name, email, phone, id: v4() }
    data.push(newUser);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newUser;
  }
  catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, name, email, phone) => {
  const body = { name, email, phone }
  try {
    const contact = await getContactById(contactId)
    const changeContact = { ...contact[0], ...body }
    const list = await listContacts()
    const newList = list.filter(({ id }) => id.toString() !== contactId.toString())
    newList.push(changeContact)
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
    return newList;
  } catch (error) {
    console.log(error)
  }
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}