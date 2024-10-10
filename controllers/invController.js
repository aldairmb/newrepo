const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    
    // Check if any data is returned
    if (!data || data.length === 0) {
      return res.status(404).render("errors/error", {
        title: "Not Found",
        message: "No vehicles found for this classification.",
        nav: await utilities.getNav(),
      });
    }

    const grid = await utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();
    const className = data[0].classification_name; // Get the classification name for the title

    res.render("inventory/classification", {
      title: `${className} Vehicles`,
      nav,
      grid,
    });
  } catch (error) {
    console.error("Error in buildByClassificationId:", error);
    next(error); // Pass error to the Express error handler
  }
};

module.exports = invCont;
