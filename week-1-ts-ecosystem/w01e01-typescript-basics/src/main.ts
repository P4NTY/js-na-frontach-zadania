import Person from "./person";

const user = new Person({
  name: 'Andy',
  age: 30,
  email: 'andy@mail-me-tommorow.com',
  address: {
    street: 'Strange Alley',
    no: 23,
  },
});

console.log(`User ${user.getName()} is ${user.hasGivenAge() ? 'adult' : 'minor'}`);
console.log(`and has${user.hasAddress() ? '' : ' no'} address`);