var choreo = [];

for (var i = -4.5; i <= 5.5; i += 2) {
  choreo.push([{
    x: i * 50, y: 50
  }]);
}
for (var i = -5.5; i <= 4.5; i += 2) {
  choreo.push([{
    x: i * 50, y: -50
  }]);
}

var nums = [6, 1, 8, 3, 11, 9, 5, 2, 10, 4, 12, 7];

var realChoreo = {};
choreo.forEach(function(dancer, i) {
  realChoreo["" + nums[i]] = dancer.map(function(place) {
    return {
      x: place.x,
      y: 25 + place.y // offset due to formation1
    };
  });
});

realChoreo["SA"] = [{x: 800, y: 100}];

module.exports = {
  choreo: realChoreo
};
