// Things we set
const RADIUS = 180;
const N = 12;
const DANCER_ANGLE = Math.PI / (N/2);

// Step Angle
// const STEP_ANGLE = Math.PI * 30 / 31;
// const SMALL_ANGLE = Math.PI - (DANCER_ANGLE / 2) -
// const DIFF = RADIUS - (Math.sin(DANCER_ANGLE / 4) * RADIUS / Math.sin(Math.PI - (STEP_ANGLE / 2)));

const DIFF = 60;

var choreo = [];

for (var i = 1; i <= N; i++) {
   choreo.push([{
     r: RADIUS, theta: (Math.PI / N) + (i * DANCER_ANGLE)
   }]);
}

choreo.forEach(function(dancer, i) {
  var start = dancer[0];
  dancer.push({
    r: start.r + ((i % 2) ? -1 : 1) * DIFF, theta: start.theta + ((i % 2) ? 1 : -1) * DANCER_ANGLE
  });
});

choreo.forEach(function(dancer, i) {
  var intermediate = dancer[1];
  dancer.push({
    r: RADIUS, theta: intermediate.theta + ((i % 2) ? 1 : -1) * DANCER_ANGLE
  });
});

var nums = [8, 9, 6, 3, 2, 1, 4, 5, 7, 10, 11, 12];

var realChoreo = {};
choreo.forEach(function(dancer, i) {
  realChoreo["" + nums[i]] = dancer.map(function(place) {
    return {
      x: place.r * Math.cos(place.theta),
      y: 25 + place.r * Math.sin(place.theta) // offset from formation1
    };
  });
});

realChoreo["SA"] = [{x: 800, y: 100}, {x: 800, y: 100}, {x: 800, y: 100}];

module.exports = {
  choreo: realChoreo
};
