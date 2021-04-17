const moment = require('moment');
const momenttimezone = require('moment-timezone');


function get_current_datetime(tz_name=null){
  const format = "YYYY-MM-DD HH:mm:ss"
  const now = moment().format(format)  
  return now
}
module.exports = get_current_datetime
