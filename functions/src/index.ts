import * as functions from "firebase-functions";

export const populateFirestore = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from test!");
});

export const updateDashboard = functions.https.onRequest((request, response) => {
  // in company object
  //  we would have a last updated property with the date stamp of the last time the dasboard was
  //  updated

  //Check when last updated
  //  if last updated within [10 mins]
  //  return


  //resulting object:
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

export const createCompany = functions.https.onRequest((request, response) => {
  //MAYBE USE A FACTORY HERE?!

  //transfer company name, description to the company object
  //make a reference from the user to the company.

  //initialize a count of products, orders, bills, inventory
  
  //populate the number of each product in the document
  response.send("Hello from test!");
});


