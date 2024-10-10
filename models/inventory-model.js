const pool = require("../database/");

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c 
       ON i.classification_id = c.classification_id 
       WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("Error fetching inventory by classification ID:", error);
    throw error; // re-throw the error to handle it in the controller
  }
}

module.exports = { getClassifications, getInventoryByClassificationId };
