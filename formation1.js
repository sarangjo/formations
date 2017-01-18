var choreo = [];

for (var i = -3; i <= 3; i += 2) {
  for (var j = -1; j <= 1; j++) {
    choreo.push([{
      x: i*50, y: j*100
    }]);
  }
}

choreo.forEach(function(dancer, i) {
  var start = dancer[0];
  if (Math.floor(i / 3) % 2 == 0) {
    start = { x: start.x, y: start.y - 50 };
    dancer.push(start);
    start = { x: start.x + 100, y: start.y };
    dancer.push(start);
    start = { x: start.x, y: start.y + 100 };
    dancer.push(start);
    start = { x: start.x - 100, y: start.y };
    dancer.push(start);
    start = { x: start.x, y: start.y - 25 };
    dancer.push(start);
  } else {
    start = { x: start.x, y: start.y };
    dancer.push(start);
    start = { x: start.x - 100, y: start.y };
    dancer.push(start);
    start = { x: start.x, y: start.y };
    dancer.push(start);
    start = { x: start.x + 100, y: start.y };
    dancer.push(start);
    start = { x: start.x, y: start.y + 25 };
    dancer.push(start);
  }
  // dancer.push({
  //   r: start.r + ((i % 2) ? 1 : -1) * DIFF, theta: start.theta + ((i % 2) ? -1 : 1) * DANCER_ANGLE
  // });
});
//
// choreo.forEach(function(dancer, i) {
//   var intermediate = dancer[1];
//   dancer.push({
//     r: RADIUS, theta: intermediate.theta + ((i % 2) ? -1 : 1) * DANCER_ANGLE
//   });
// });

var realChoreo = {};
choreo.forEach(function(dancer, i) {
  realChoreo["" + (i + 1)] = dancer.map(function(place) {
    return {
      x: place.x,
      y: place.y
    };
  });
});

realChoreo["SA"] = [{x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}];

module.exports = {
  choreo: realChoreo
};
