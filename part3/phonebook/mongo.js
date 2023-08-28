const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://fullstack:${password}@cluster0.kgtfke4.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const name = process.argv[3];
const number = process.argv[4];

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
      mongoose.connection.close();
    });
  });
} else if (process.argv.length < 5 && process.argv.length > 3) {
  console.log('give contact name and number as arguments');
  process.exit(1);
} else if (process.argv.length === 5) {
  const contact = new Contact({
    name,
    number,
  });

  contact.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
