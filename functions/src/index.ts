import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import {ICompany} from "./companies/ICompany";
import {CompanyFactory} from "./company-factory";

// initialize the firebase admin sdk
admin.initializeApp();

// reference to the db for the factory methods
export const db = admin.firestore();

// configurable function constants
const NUM_OF_DOCS = 5;
const REFRESH_MINS = 10;

/* updateDashboard Function
 *----------------------------
 * http function that takes a companyId in from query parameters
 * and will either return the current dashboard if it exists and is
 * within the update threshold, OR will fetch the corresponding data
 * to create a new/updated dashboard.
 */
export const updateDashboard = functions.https.onRequest(async (request, response) => {
  // get the companyId from the http query params
  const companyId = (request.query.companyId as string) ?? "";

  // check to see if a company id was given
  if (!companyId) {
    response.status(401).json({message: "no company id given"});
    return;
  }

  // fetch the current dashboard document from firebase
  const dashboard = (await db.collection("dashboard").doc(companyId).get()).data();
  // create empty object to store result
  let result = {};

  // check to see if we need to update the dashboard
  const lastUpdatedTime = ((dashboard?.lastUpdated as admin.firestore.Timestamp)?.seconds ?? admin.firestore.Timestamp.now().seconds);
  const needsUpdating = lastUpdatedTime + (REFRESH_MINS * 3600) <= admin.firestore.Timestamp.now().seconds;


  // Only fetch new data if dashboard is empty OR we are exceeding update threshold
  if (!dashboard || Object.keys(dashboard).length === 0 || (dashboard && needsUpdating)) {
    console.log("new");
    // FETCH UPCOMING ORDERS
    const orders = (await db.collection(`company/${companyId}/orders`).orderBy("dueDate", "asc").limit(NUM_OF_DOCS).get()).docs.map((i) => i.data());

    // FETCH UPCOMING BILLS
    const bills = (await db.collection(`company/${companyId}/bills`).where("dueDate", ">=", admin.firestore.Timestamp.now()).orderBy("dueDate", "asc").limit(NUM_OF_DOCS).get()).docs.map((i) => i.data());

    // FETCH NUMBER OF PRODUCTS
    const products = (await db.collection(`company/${companyId}/products`).orderBy("creationDate", "desc").limit(NUM_OF_DOCS).get()).docs.map((i) => i.data());

    // FETCH NUMBER OF INVENTORY
    const inventory = (await db.collection(`company/${companyId}/inventory`).orderBy("creationDate", "desc").limit(NUM_OF_DOCS).get()).docs.map((i) => i.data());

    // sum the income from order
    const income = orders.reduce((accum, item) => accum + item.price, 0);
    // sum the debts from the bills
    const debt = bills.reduce((accum, item) => accum + item.price, 0);
    // calculate the income
    const projectedIncome = income - debt;

    // create dashboard object
    result = {
      upcomingOrders: orders,
      upcomingBills: bills,
      projectedIncome: projectedIncome,
      latestProducts: products,
      latestInventory: inventory,
      lastUpdated: admin.firestore.Timestamp.now(),
    };
  } else {
    // We do not need to refetch all the new data
    result = dashboard; // return the current dashboard
  }

  // Finally create the dashboard in firestore
  await db.collection("dashboard").doc(companyId).set(result);

  // return the result
  response.send(result);
});

/* createCompany Function
 *----------------------------
 * function that listens to creates in path /users/{userId}. This
 * corresponds to a new user account being created. As such, this function
 * will read the data from in the user doc and pass the information into the
 * CompanyFactory. The CompanyFactory will then decide what type of company to
 * create based upon the specified type. Will create a company document, cleanup
 * the user document, and then finally will link the company doc to the user doc.
 */
export const createCompany = functions.firestore.document("/users/{userId}").onCreate(async (snapshot, context) => {
  // get the userId from the parameters (in braces above)
  const userId = context.params.userId;
  // get the snapshot of the data from the user document
  const userData = snapshot.data();
  const companyType = userData["type"] ?? "default";

  // pass userData to factory instance to create correct company object
  const company: ICompany = CompanyFactory.getCompanyInstance(companyType);

  // use the company instance to process specialized tasks related to creating
  // the company document
  const companyId = await company.createDocument(userData);

  // check if companyId is set... if not the company was not created
  if (!companyId) {
    console.error(`unable to create company for ${userId}`);
    return -1;
  }

  // we need to remove the data from the user document (for cleanup purposes)
  company.cleanUser(userId);

  // return ensure that we update the user id to remove company data and link the new document to
  // the user: https://firebase.google.com/docs/functions/firestore-events#writing_data
  return snapshot.ref.set({
    companyLink: db.collection("users").doc(userId),
  }, {merge: true});
});


