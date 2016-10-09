var app = {
  pow: function(num, power) {
    var result = 1;
    for (var i = 0; i < Math.abs(power); i++) {
    result *= num;
    }
    if (power >= 0) {
      return result;
    } else {
      return 1 / result;
    }
  }
};

try {
  module.exports = app;  
} catch (err) {

}
