
function ToInt(id) {
  var x = $('#' + id).val();
  return parseInt(x);
}

// use this to keep track of our primes
class Sieve
{
  constructor(index, value)
  {
    this.index = index;
    this.value = value;
  }
}

// we know 2,3,5,7 are prime
function isPrime(n, args, id, result){
  if(n >= args.length) return result;
  // Or result to itself
  result |= id == args[n];
  return isPrime(n+1, args, id, result);
}

// find numbers who are factors
// find sqrt of numbers that are factors
function isPrimeFactor(n, args, id, result){
  if(n >= args.length) return result;
  // And results to itself
  result &= id % args[n] != 0;
  result &= Math.sqrt(id) % 1 != 0;
  return isPrimeFactor(n+1, args, id, result);
}

function mapPrime(id, args){
  return (
    isPrime(0, args, id, false) ? true :
    isPrimeFactor(0, args, id, true)
  );
}

function main(low, high) {
  const list = Array
    .from({length: high}, (_, id) => (new Sieve(id, false)))
    .map((_, id, val) => ( val.value = mapPrime(id, [2,3,5,7])))
    .map((_, id) => (id < 2 ? new Sieve(id, false) : new Sieve(id, _ )))
    .filter((val) => ( val.index >= low && val.value == true ))
    .map((_) => ( _.index ));
  return list.join(", ");
}
