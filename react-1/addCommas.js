function addCommas(num) {
    let numStr = num.toString();
    let [whole, decimal] = numStr.split('.');
  
    let sign = whole[0] === '-' ? '-' : '';
    if (sign) {
      whole = whole.slice(1);
    }
  
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return sign + (decimal ? `${whole}.${decimal}` : whole);
  }
  
  module.exports = addCommas;
  
