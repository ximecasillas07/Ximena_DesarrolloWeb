/*
Pig Latin
*/

function igpayAtinlay(str) {
  // TODO: Initialize the word array properly
  if (typeof str !== "string"){
    str = document.getElementById("txtVal").value;
  }
  if (!str) return "";

  var returnArray = [];
    wordArray = str.trim().split(/\s+/);

  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
    returnArray.push(word.slice(beginning.length) + beginning + "ay");
  }
  var result = returnArray.join(" ");
  if(document.getElementById("pigLatLbl")){
    document.getElementById("pigLatLbl").textContent = result;
  }
  return result;
}
