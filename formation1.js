var choreo = [];

for (var i = -3; i <= 3; i += 2) {
  for (var j = -1; j <= 1; j++) {
    choreo.push([{
      x: i*50, y: j*100
    }]);
  }
}

// choreo.forEach(function(dancer, i) {
//   var start = dancer[0];
//   dancer.push({
//     r: start.r + ((i % 2) ? 1 : -1) * DIFF, theta: start.theta + ((i % 2) ? -1 : 1) * DANCER_ANGLE
//   });
// });
//
// choreo.forEach(function(dancer, i) {
//   var intermediate = dancer[1];
//   dancer.push({
//     r: RADIUS, theta: intermediate.theta + ((i % 2) ? -1 : 1) * DANCER_ANGLE
//   });
// });

var realChoreo = {};
choreo.forEach(function(dancer, i) {
  realChoreo["" + i] = dancer.map(function(place) {
    return {
      x: place.x,
      y: place.y
    };
  });
});

realChoreo["SA"] = [{x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}];

module.exports = {
  choreo: realChoreo
};
