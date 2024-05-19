import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDE1tpI4v0mpnCypArjv4qlf4uo7WbKubE",
  authDomain: "advanced-software-dev-2024.firebaseapp.com",
  databaseURL: "https://advanced-software-dev-2024-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "advanced-software-dev-2024",
  storageBucket: "advanced-software-dev-2024.appspot.com",
  messagingSenderId: "361103031480",
  appId: "1:361103031480:web:d8a48d41cb711670e8084d",
  measurementId: "G-M07F3TFTMF"
};

//Initialise Firebase
const app = initializeApp(firebaseConfig);

//Initialise Realtime Database
const database = getDatabase(app);

//Add User Function
function addUser(user) {
  const usersRef = ref(database, 'users');
  const newUserRef = push(usersRef);
  set(newUserRef, user)
    .then(() => {
      console.log('User added successfully.');
    })
    .catch((error) => {
      console.error('Error adding user: ', error);
    });
}

//Add Task Function
function addTask(task) {
  const tasksRef = ref(database, 'tasks');
  const newTaskRef = push(tasksRef);
  set(newTaskRef, task)
    .then(() => {
      console.log('Task added successfully.');
    })
    .catch((error) => {
      console.error('Error adding task: ', error);
    });
}

//Add Note Function
function addNote(note) {
  const notesRef = ref(database, 'notes');
  const newNoteRef = push(notesRef);
  set(newNoteRef, note)
    .then(() => {
      console.log('Note added successfully.');
    })
    .catch((error) => {
      console.error('Error adding note: ', error);
    });
}
