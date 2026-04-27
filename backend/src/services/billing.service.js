'use strict';

// Price list per garment type (in ₹)
const PRICE_LIST = {
  shirt:       50,
  pants:       80,
  saree:      150,
  suit:       200,
  jacket:     120,
  bedsheet:   100,
  curtain:    130,
  dress:       90,
  tshirt:      40,
  default:     60,
};

const getUnitPrice = (garmentType) => {
  const key = garmentType.toLowerCase().trim();
  return PRICE_LIST[key] || PRICE_LIST.default;
};

const calculateItems = (items) => {
  return items.map(item => {
    const unit_price = item.unit_price || getUnitPrice(item.garment_type);
    const subtotal   = unit_price * item.quantity;
    return { ...item, unit_price, subtotal };
  });
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
};

module.exports = { getUnitPrice, calculateItems, calculateTotal, PRICE_LIST };