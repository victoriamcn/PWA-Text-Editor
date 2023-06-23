import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database (UPDATE)
export const putDb = async ( content) => {
  console.log('PUT to the database')

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('note', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction(['note'], 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('note');

  // Use a method to update existing content
  const request = store.add({ content: content});

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database (RETRIEVE)
export const getDb = async (content) => {
  console.log('GET from the database')

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('note', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction(['note'], 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('note');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
