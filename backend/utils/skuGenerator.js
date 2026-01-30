const generateSKU = (name, category) => {
  const brand = "AET";
  const namePart = name.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const catPart = category.substring(0, 2).toUpperCase();
  const timePart = Date.now().toString(36).toUpperCase().slice(-4);

  return `${brand}-${catPart}-${namePart}-${timePart}`;
};
module.exports = generateSKU;
