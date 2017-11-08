const weightedResult = function(ratio, interests) {
  let int1 = interests[0].toString();
  let int2 = interests[1].toString();
  let int3 = interests[2].toString();
  result = {};
  if (ratio === 1) { result[int1] = 1 }
  if (ratio === 2) { result[int1] = 1; result[int2] = 1 }
  if (ratio === 3) { result[int1] = 1; result[int2] = 1; result[int3] = 1 }
  if (ratio === 4) { result[int1] = 2; result[int2] = 1; result[int3] = 1 }
  if (ratio === 5) { result[int1] = 2; result[int2] = 2; result[int3] = 1 }
  if (ratio === 6) { result[int1] = 3; result[int2] = 2; result[int3] = 1 }
  if (ratio === 7) { result[int1] = 4; result[int2] = 2; result[int3] = 1 }
  if (ratio === 8) { result[int1] = 4; result[int2] = 2; result[int3] = 2 }
  if (ratio > 8) { result[int1] = ratio; }
  return result;
};

module.exports = {
  weightedResult
};