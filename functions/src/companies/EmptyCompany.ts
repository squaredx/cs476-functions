import {ICompany} from "./ICompany";

/**
 * EmptyCompany follows the Null Object pattern. It corresponds to a 'null' company
 */
export class EmptyCompany implements ICompany {
  /**
     * Creates the empty company object with the given data
     * @param {FirebaseFirestore.DocumentData} data user data from registration
     * @return {string} company id of newly generated company
     */
  createDocument(data: FirebaseFirestore.DocumentData): Promise<string> {
    console.log("we are creating an empty company");
    return new Promise((resolve) => {
      resolve("");
    });
  }

  /**
     * Cleans up the user document after company doc is created
     * @param {string} userId creator's user id
     * @return {void} void
     */
  cleanUser(userId: string): Promise<void> {
    console.log("attempting to cleanUser from EmptyCompany");
    return new Promise(() => {});
  }
}
