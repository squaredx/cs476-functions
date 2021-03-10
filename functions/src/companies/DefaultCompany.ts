import {ICompany} from "./ICompany";
import {db} from "../index";
import * as admin from "firebase-admin";

/**
   * Default company handler for creating
   * a company in Firebase on user creation
   */
export class DefaultCompany implements ICompany {
  /**
     * Creates the default company object with the given data
     * @param {FirebaseFirestore.DocumentData} data user data from registration
     * @return {string} company id of newly generated company
     */
  async createDocument(data: FirebaseFirestore.DocumentData): Promise<string> {
    console.log("Creating DefaultCompany");

    // Error checking: see if company name provided
    // shouldn't crash but warn us because this is not
    // ideal
    if (!data.companyName) {
      console.warn("Company created without name!");
    }

    // create a new doc with template data in the company collection
    const doc = await db.collection("company").add({
      companyName: data.companyName ?? "",
      companyDesc: data.companyDesc ?? "",
      numProducts: 0,
      numOrders: 0,
      numBills: 0,
      numInventory: 0,
    });

    // RETURN THE COMPANY ID
    return doc.id;
  }

  /**
     * Cleans up the user document after company doc is created
     * @param {string} userId creator's user id
     * @return {void} void
     */
  async cleanUser(userId: string): Promise<void> {
    // remove the company data from the user document
    return new Promise((resolve, reject) => {
      db.collection("users").doc(userId).update({
        companyName: admin.firestore.FieldValue.delete(),
        companyDesc: admin.firestore.FieldValue.delete(),
      }).then(() => resolve()).catch((err) => reject(err));
    });
  }
}
