/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
      "use strict";

      if (typeof n !== "number") {
        n = parseInt(document.getElementById("num").value);
      }

      var sequence = [];

      if (isNaN(n) || n <= 1) {
        if (document.getElementById("pf")) {
          document.getElementById("pf").textContent = "Please enter an integer greater than 1";
        }
        return sequence;
      }

      // 1. Mientras n sea divisible entre 2
      while (n % 2 === 0) {
        sequence.push(2);
        n = n / 2;
      }

      // 2. Probar impares desde 3 hasta la raíz cuadrada de n
      for (var i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
          sequence.push(i);
          n = n / i;
        }
      }

      // 3. Si queda un número primo mayor a 2
      if (n > 2) {
        sequence.push(n);
      }

      // Mostrar en pantalla
      if (document.getElementById("pf")) {
        document.getElementById("pf").textContent = sequence.join(", ");
      }

      return sequence;
    };