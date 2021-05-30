const crypto = require("crypto");
module.exports = function getDigest(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 7);
};
