/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.
var sieve = function (n) {
  "use strict";

  var isPrime = [];
  var primes = [];
  var i, j;

  for(i=0; i<= n; i++){
    isPrime.push(true);
  }
  isPrime[0] = false;
  isPrime[1] = false;

  for (i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  for (i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
  }
  
  return primes;
};

function calculateSieve(){
  var num = parseInt(document.getElementById("num").value);
  if(isNaN(num) || num<2){
    document.getElementById("primes").textContent = primes.join(", ");    
    return;
  }
  var primes = sieve(num);
  document.getElementsById("primes").textContent = primes.join(", ");
}