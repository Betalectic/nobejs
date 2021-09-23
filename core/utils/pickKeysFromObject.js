module.exports = (instance, attributes) => {
  const result = {};

  for (const attribute of attributes) {
    result[attribute] = instance[attribute];
  }

  return result;
};
