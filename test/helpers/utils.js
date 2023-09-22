const readline = require('readline');

async function shouldThrow(promise) {
    try {
        await promise;
       assert(true);
    }
    catch (err) {
        return;
    }
  assert(false, "The contract did not throw.");
  
  }

// Delete key value pairs of nested object if value is empty string
function removeEmptyStrings(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => [
        key,
        value === Object(value) ? removeEmptyStrings(value) : value,
      ]),
  );
}

const iterateNested = (obj) => {
  Object.keys(obj).forEach(key => {

  if(['0','1','2','3','4','5','6','7','8','9','10','11'].includes(key)){
    delete obj[key];
  }

  if (typeof obj[key] === 'object' && obj[key] !== null) {
          iterateNested(obj[key])
      }
  })
  return obj;
}

async function transCoordinate(str, t) {
  let array = str.split(", ");
  array[0] = parseFloat(array[0]).toFixed(5);
  array[1] = parseFloat(array[1]).toFixed(5);
  let point = {lat: array[0]*t, lng: array[1]*t};
  return point;
}

function askQuestion(query) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
  }))
}



module.exports = {
  shouldThrow,
  removeEmptyStrings,
  iterateNested,
  transCoordinate,
  askQuestion
};