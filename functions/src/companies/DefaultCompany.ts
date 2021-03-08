import {ICompany} from "./ICompany";
import {db} from "../index";
import * as admin from "firebase-admin";

/**
   * Adds two numbers together.
   */
export class DefaultCompany implements ICompany {
  /**
     * Adds two numbers together.
     * @param {FirebaseFirestore.DocumentData} data asdsad
     * @return {string} company id
     */
  async createDocument(data: FirebaseFirestore.DocumentData): Promise<string> {
    console.log("Creating DefaultCompany");

    // TODO: Error checking

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
     * Adds two numbers together.
     * @param {string} userId asdsad
     * @return {void} asdsad
     */
  async cleanUser(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.collection("users").doc(userId).update({
        companyName: admin.firestore.FieldValue.delete(),
        companyDesc: admin.firestore.FieldValue.delete(),
      }).then(() => resolve()).catch((err) => reject(err));
    });
  }
}
