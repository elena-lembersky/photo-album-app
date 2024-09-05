const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

async function fetchUsers() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    const currentTime = new Date().toISOString();
    return response.data.map((user) => ({
      id: uuidv4(),
      name: user.name,
      email: user.email,
      albumCount: 0,
      createdAt: currentTime,
      updatedAt: currentTime,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

async function saveUsers(users) {
  const filePath = path.join(__dirname, '../data', 'users.json');
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

async function main() {
  const users = await fetchUsers();
  if (users.length > 0) {
    await saveUsers(users);
  }
}

main();
