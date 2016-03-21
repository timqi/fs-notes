var rect = require('./rectangle-2');

function solveRect(l, b) {
  console.log("solving for l: "+l+" b:"+b);
  rect(l, b, function(err, rectangle) {
    if (err) {
      console.log(err);
    } else {
      console.log("area: "+rectangle.area());
      console.log("perimeter: "+rectangle.perimeter());
    }
  });
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
