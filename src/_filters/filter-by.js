module.exports = function (value, filterKey, filterValues) {
  return value.filter((item) => filterValues.includes(getByPath(item, filterKey)));
};

function getByPath(value, path) {
  let result = value;
  let [pathSegment, ...pathSegments] = path.split('.');
  while (pathSegment) {
    result = result[pathSegment];
    pathSegment = pathSegments.shift();
  }
  return result;
}
