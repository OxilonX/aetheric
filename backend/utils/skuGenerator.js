const generateSKU = (name, category) => {
  const brandPrefix = "AET";

  const namePart = name.replace(/\s+/g, "").substring(0, 3).toUpperCase();

  const catPart = category.substring(0, 2).toUpperCase();

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  return `${brandPrefix}-${catPart}-${namePart}-${randomSuffix}`;
};

module.exports = generateSKU;
