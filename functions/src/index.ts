import * as functions from "firebase-functions";
import {ICompany} from "./companies/ICompany";
import {CompanyFactory} from "./company-factory";

export const populateFirestore = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from test!");
});

export const updateDashboard = functions.https.onRequest((request, response) => {
  // in dashboard object
  //  we would have a last updated property with the date stamp of the last time the dasboard was
  //  updated

  // Check when last updated
  //  if last updated within [10 mins]
  //  return


  // resulting object:
  /*
  {
    upcomingOrders: [5 latest order objects with state in-progress or open, ordered by date],
    upcomingBills: [5 soonest bills, ordered by date],
    projectedIncome: [use information from previous calculation to decide this]
    mostPopularProducts: [top 5 ordered products],
    inventorySituation: [top 5 lowest inventory stock],
  }
  */

  response.send("Hello from test!");
});


export const createCompany = functions.firestore.document("/users/{userId}").onCreate((snapshot, context) => {
  // get the userId from the parameters (in braces above)
  const userId = context.params.userId;
  // get the snapshot of the data from the user document
  const userData = snapshot.data();
  const companyType = userData["type"] ?? "default";

  // pass userData to factory instance to create correct company object
  const company: ICompany = CompanyFactory.getCompanyInstance(companyType);

  // use the company instance to process specialized tasks related to creating
  // the company document
  company.createDocument(userData);

  // return ensure that we update the user id to remove company data and link the new document to
  // the user: https://firebase.google.com/docs/functions/firestore-events#writing_data
  return 0;
});


