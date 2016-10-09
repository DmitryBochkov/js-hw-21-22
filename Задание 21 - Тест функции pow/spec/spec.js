var app = require('../js/app.js');

describe("Pow method", function() {
  it("should return the value of x to the power of y (positive number)", function() {
    // pepare
    var result;

    // act
    result = app.pow(2, 4);

    //assert
    expect(result).toBe(16);
  });

  it("should return the value of x to the power of y (zero)", function() {
    // pepare
    var result;

    // act
    result = app.pow(2, 0);

    //assert
    expect(result).toBe(1);
  });

  it("should return the value of x to the power of y (negative number)", function() {
    // pepare
    var result;

    // act
    result = app.pow(2, -3);

    //assert
    expect(result).toBe(0.125);
  });
});
