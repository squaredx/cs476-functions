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
  createDocument(data: FirebaseFirestore.DocumentData): boolean {
    console.log("we are creating an empty company");
    return true;
  }
}
