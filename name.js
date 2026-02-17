export function fullName(firstName, lastName) {
  return firstName + " " + lastName;
}

function helloWorld() {
  const name = fullName("Amir", "EL AROUSSI");
  console.log("Hello world " + name);
}

helloWorld();
