module.exports = function addCorsHeader() {
  console.log("(+) Inside addCorsHeader()");

  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json"
  };
}