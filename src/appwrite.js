import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APP_WRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APP_WRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APP_WRITE_COLLECTION_ID;
const POSTER_BASE_URL = import.meta.env.VITE_TMDB_POSTER_BASE_URL;
const VITE_APP_WRITE_ENDPOINT_URL = import.meta.env.VITE_APP_WRITE_ENDPOINT_URL;

const client = new Client()
  .setEndpoint(VITE_APP_WRITE_ENDPOINT_URL)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    console.log(result);

    // 2. If it does, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: POSTER_BASE_URL + movie.poster_path,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents;
  } catch (error) {
    console.error(error);
  }
};
