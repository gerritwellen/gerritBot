const formatDistanceToNow = require("date-fns/formatDistanceToNow");

module.exports = function formatFromNow(timestamp) {
  return formatDistanceToNow(timestamp, { addSuffix: true });
};
