import {ICompany} from "./ICompany";

/**
 * Adds two numbers together.
 */
export class EmptyCompany implements ICompany {
  /**
   * Adds two numbers together.
   * @param {FirebaseFirestore.DocumentData} data asdsad
   * @return {boolean} asdsad
   */
  createDocument(data: FirebaseFirestore.DocumentData): Promise<string> {
    console.log("we are creating an empty company");
    return new Promise((resolve) => {
      resolve("");
    });
  }

  /**
   * Adds two numbers together.
   * @param {string} userId asdsad
   * @return {void} asdsad
   */
  cleanUser(userId: string): Promise<void> {
    console.log("attempting to cleanUser from EmptyCompany");
    return new Promise(() => {});
  }
}
