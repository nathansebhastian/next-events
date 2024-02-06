'use server';

export async function getUser() {
  const userData = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await userData.json();
  return users;
}