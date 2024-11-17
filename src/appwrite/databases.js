import { databases } from "./config";
import { ID } from "appwrite";

const collections = [
  {
    databaseId: import.meta.env.VITE_DATABASE_ID,
    collectionId: import.meta.env.VITE_COLLECTION_ID_POKEMONS,
    name: "pokemons",
  },
];

const db = {};

collections.forEach((col) => {
  db[col.name] = {
    list: (queries) =>
      databases.listDocuments(col.databaseId, col.collectionId, queries),

    get: (id, queries) =>
      databases.getDocument(col.databaseId, col.collectionId, id, queries),

    create: (payload) =>
      databases.createDocument(
        col.databaseId,
        col.collectionId,
        ID.unique(),
        payload,
      ),

    update: (id, payload) =>
      databases.updateDocument(col.databaseId, col.collectionId, id, payload),

    delete: (id) =>
      databases.deleteDocument(col.databaseId, col.collectionId, id),
  };
});

export default db;
