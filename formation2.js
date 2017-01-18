// Things we set
const RADIUS = 200;
const N = 12;
const DANCER_ANGLE = Math.PI / (N/2);

// Step Angle
// const STEP_ANGLE = Math.PI * 30 / 31;
// const SMALL_ANGLE = Math.PI - (DANCER_ANGLE / 2) -
// const DIFF = RADIUS - (Math.sin(DANCER_ANGLE / 4) * RADIUS / Math.sin(Math.PI - (STEP_ANGLE / 2)));

const DIFF = 50;

const CENTER = {x: 300, y: 300};

var choreo = [];

for (var i = 1; i <= N; i++) {
   choreo.push([{
     r: RADIUS, theta: (Math.PI / N) + (i * DANCER_ANGLE)
   }]);
}

choreo.forEach(function(dancer, i) {
  var start = dancer[0];
  dancer.push({
    r: start.r + ((i % 2) ? 1 : -1) * DIFF, theta: start.theta + ((i % 2) ? -1 : 1) * DANCER_ANGLE
  });
});

choreo.forEach(function(dancer, i) {
  var intermediate = dancer[1];
  dancer.push({
    r: RADIUS, theta: intermediate.theta + ((i % 2) ? -1 : 1) * DANCER_ANGLE
  });
});

var realChoreo = {};
choreo.forEach(function(dancer, i) {
  realChoreo["A" + i] = dancer.map(function(place) {
    return {
      x: CENTER.x + place.r * Math.cos(place.theta),
      y: CENTER.y + place.r * Math.sin(place.theta)
    };
  });
});

realChoreo["SA"] = [{x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}];

module.exports = {
  choreo: realChoreo
};
