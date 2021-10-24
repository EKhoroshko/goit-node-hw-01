const {
    listContacts,
    getContactById,
    removeContact,
    addContact, } = require('./contacts.js');

const chalk = require('chalk');

/*const argv = require('yargs').argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const list = await listContacts()
            console.log(list);
            return list;

        case 'get':
            const oneUser = await getContactById(id)
            console.log(oneUser);
            return oneUser;

        case 'add':
            const newList = await addContact(name, email, phone)
            console.log(newList);
            return newList;

        case 'remove':
            const remove = await removeContact(id)
            console.log(remove);
            return remove;

        default:
            console.warn(chalk.red(' Unknown action type!'));
    }
}

invokeAction(argv);*/

const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
            case 'list':
                const list = await listContacts()
                console.log(list);
                return list;

            case 'get':
                const getContact = await getContactById(id);
                console.log(getContact);
                return getContact;

            case 'add':
                const newList = await addContact(name, email, phone)
                console.log(newList);
                return newList;

            case 'remove':
                const remove = await removeContact(id)
                console.log(remove);
                return remove;

            default:
                console.warn(chalk.red(' Unknown action type!'));
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

invokeAction(argv);