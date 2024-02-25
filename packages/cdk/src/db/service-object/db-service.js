// const deleteItem = require("./item-method/delete-item");
const saveItem = require("./item-method/save-item");
// const latestPriceDateTime = require("./query-method/latest-price-date-time");
// const latestPrice = require("./query-method/latest-price");
// const emailAlertSubscribers = require("./query-method/email-alert-subscribers");

// require("dotenv").config();

module.exports = {
  // Item operations
  item: {
    saveItem,
    // deleteItem,
  },
  // Query operations
  query: {
    // latestPrice,
    // latestPriceDateTime,
    // emailAlertSubscribers,
  }
};
