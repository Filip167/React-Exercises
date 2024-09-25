function addCommas(num) {
  // Convert number to string to handle both integer and float
  let numStr = num.toString();
  
  // Split into whole and decimal parts
  let [whole, decimal] = numStr.split('.');

  // Handle negative numbers by extracting the negative sign
  let sign = whole[0] === '-' ? '-' : '';
  
  // Remove the negative sign from the whole part for formatting
  if (sign) {
    whole = whole.slice(1);
  }

  // Add commas to the whole part using regex
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return the formatted number (re-add the negative sign if necessary)
  return sign + (decimal ? `${whole}.${decimal}` : whole);
}
