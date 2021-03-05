import {ICompany} from "./ICompany";

/**
   * Adds two numbers together.
   */
export class DefaultCompany implements ICompany {
  /**
     * Adds two numbers together.
     * @param {FirebaseFirestore.DocumentData} data asdsad
     * @return {boolean} asdsad
     */
  createDocument(data: FirebaseFirestore.DocumentData): boolean {
    console.log("we are creating a default company");

    // MAYBE USE A FACTORY HERE?!

    // transfer company name, description to the company object
    // make a reference from the user to the company.

    // initialize a count of products, orders, bills, inventory
    // populate the number of each product in the document
    return true;
  }
}
