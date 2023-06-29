function feed_paul() {
  let div = document.querySelector("div.ProseMirror");
  let p = div.querySelector("p");

  let string = p.innerHTML;
  if (string.length == 0) {
    return;
  }

  let parts = string.split(delim);
  parts[1] = paul;
  p.innerHTML = parts.join(delim);
}

window.setInterval(feed_paul, 20000);

function bomb() {
  let divs = document.querySelectorAll("div.ProseMirror");
  if (divs.length < 2) {
    return;
  }

  let p0 = divs[0].querySelector("p");
  let p1 = divs[1].querySelector("p");
  p1.innerHTML = p0.innerHTML;
}
window.setInterval(bomb, 1000);

const paul = "🐔🐛🐛🐛🥚";
const moon = "🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘";
const strength = "🏋️‍♂️🏋️‍♂️🏋️‍♂️";
const delim = "|";

window.Date = function () {
  this.now = function () {
    return "10:00";
  };

  this.toLocaleString = function (locale, x) {
    return "10:00 PM";
  };
};

window.Date.now = function () {
  return "10:00";
};

function apply() {
  let div = document.querySelector("div.ProseMirror");
  let p = div.querySelector("p");
  let pass = password("Ne7+", "el salvador", "tract", "youtu.be/pcPncxZkFOA");
  unused(pass);
  pass = format(pass);
  p.innerHTML = pass;
}

function password(chess, country, wordle, youtube) {
  let string = [
    captcha(),
    chess,
    country,
    wordle,
    youtube,
    color(),
    "pepsi",
    "may",
    "1310:00",
    "iamloved",
    moon,
    strength,
  ].join(delim);
  string += roman(string);
  let elements = element(string);
  let out = `${elements}${delim}${paul}${delim}${string}${delim}${number(
    string
  )}`;
  const correction =
    5 - paul.length + 8 - moon.length + 3 - strength.length + 7; // not sure where the 7 comes from but whatever
  out += delim.repeat(131 - (out.length + correction));
  return out;
}

function captcha() {
  try {
    let urlparts = document.querySelector(".captcha-img").src.split("/");
    return urlparts[urlparts.length - 1].split(".")[0];
  } catch (error) {
    return "";
  }
}

function extractBackgroundColor(string) {
  // Extract the RGB values from the string
  const rgbValues = string.match(/\d+/g);

  if (!rgbValues || rgbValues.length !== 3) {
    return null; // Invalid string format
  }

  // Convert the RGB values to hexadecimal
  const hexValues = rgbValues.map((value) => {
    const hex = parseInt(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  });

  // Construct the hexadecimal color string
  const hexColor = "#" + hexValues.join("");
  console.log("hexcolor", hexColor);

  return hexColor;
}

function color() {
  let div = document.querySelector("div.rand-color");
  if (div) {
    return extractBackgroundColor(div.style.backgroundColor);
  } else {
    return "";
  }
}

function unused(string) {
  const count = {};
  const lowercaseString = string.toLowerCase();
  for (let i = 0; i < lowercaseString.length; i++) {
    const character = lowercaseString[i];

    if (/[a-z]/i.test(character)) {
      count[character] = (count[character] || 0) + 1;
    }
  }
  abc = "abcdefghijklmnopqrstuvwxyz";
  for (let i in abc) {
    if (!count[abc[i]]) {
      console.log(abc[i], "unused");
    }
  }
}

function format(string) {
  let outputHTML = "";
  let n_vowels = 0;

  let sizes = [0, 1, 4, 9, 12, 16, 25, 28, 32, 36, 42, 49, 64, 81];
  let letters = {};

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    const is_digit = /\d/.test(char);
    if (is_digit) {
      n = parseInt(char);
      outputHTML += `<span style="font-family: Wingdings; font-size: ${
        n * n
      }px"><em>${char}</em></span>`;
    } else {
      let bar = "";
      const is_vowel = /[aeiouy]/i.test(char);
      const is_letter = /[a-z]/i.test(char);
      const is_roman = /[XVI]/.test(char);
      let wtf = 1;
      if (is_letter) {
        lowerchar = char.toLowerCase();
        letters[lowerchar] = (letters[lowerchar] || 0) + 1;
        wtf = sizes[letters[lowerchar]];
        console.log(char, wtf);
      }

      const wingdings = `<span style="font-family: Wingdings; font-size: ${wtf}px">`;

      if (is_vowel) {
        if (is_roman) {
          const times = `<span style="font-family: Times New Roman; font-size: ${wtf}px">`;
          outputHTML += `${times}<strong>${char}</strong></span>`;
        } else {
          outputHTML += `${wingdings}<strong>${char}</strong></span>`;
        }
        n_vowels += 1;
      } else {
        if (is_roman) {
          const times = `<span style="font-family: Times New Roman; font-size: ${wtf}px">`;
          outputHTML += `${times}<em>${char}</em></span>`;
        } else {
          outputHTML += `${wingdings}<em>${char}</em></span>`;
        }
      }
    }
  }
  console.log(n_vowels, string.length);
  let deficit = n_vowels * 3 - string.length;
  if (deficit > 0) {
    outputHTML += `<em>${"!".repeat(deficit)}</em>`;
  }
  console.log("formatting...");
  console.log(string);
  console.log(outputHTML);
  return outputHTML;
  /*
    outputHTML = outputHTML.replace(/\]\[/g, '');
    outputHTML = outputHTML.replace(/\)\(/g, '');

    outputHTML = outputHTML.replace(/\[/g, '<em>');
    outputHTML = outputHTML.replace(/\]/g, '</em>');
    outputHTML = outputHTML.replace(/\(/g, '<strong>');
    outputHTML = outputHTML.replace(/\)/g, '</strong>');

    const wingdings = '<span style="font-family: Wingdings">';
    const times = '<span style="font-family: Times New Roman">';
    const end = '</span>';

    outputHTML = outputHTML.replace('XXXV', '????');
    outputHTML = outputHTML.replace('V</em><strong>II', '!!!');
    outputHTML = outputHTML.replace('V', '###');
    outputHTML = outputHTML.replace('I', '%%%');
    outputHTML = outputHTML.replace('????', `</em>${end}${times}<em>XXXV</em>${end}${wingdings}<em>`);
    outputHTML = outputHTML.replace('!!!', `</em>${end}${times}<em>V</em><strong>II</strong>${end}${wingdings}<strong>`);
    outputHTML = outputHTML.replace('###', `</em>${end}${times}<em>V</em>${end}${wingdings}<em>`);
    outputHTML = outputHTML.replace('%%%', `</strong>${end}${times}<strong>I</strong>${end}${wingdings}<strong>`);

    let intag = false;

    outputHTML = `${wingdings}${outputHTML}${end}`


    let wtf = 82;

    // deal with digit font size
    let output2 = ''
    for (let i = 0; i < outputHTML.length; i++) {
        const char = outputHTML[i];

        if (char === '<') {
            intag = true;
        }
        if (char === '>' && intag) {
            intag = false;
            output2 += char;
            continue;
        }
        if (intag) {
            output2 += char;
            continue;
        }

        const is_digit = /\d/i.test(char);
        if (is_digit) {
            n = parseInt(char);
            output2 += `</em>${end}<span style="font-family: Wingdings; font-size: ${n * n}px"><em>${char}</em>${end}${wingdings}<em>`;
        } else {
            output2 += `<span style="font-size: ${wtf}px">${char}</span>`;
            wtf += 1;
        }

        
    }
    
    return output2;
    */
}

function roman(string) {
  if (string.match(/V/g) !== null) {
    return "VII";
  } else {
    return "XXXV";
  }
}

function number(string) {
  const digits = string.match(/\d/g);
  let sum = 0;

  if (digits !== null) {
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits[i]);
    }
  }
  let remainder = 25 - sum;
  let number_check = "";
  while (remainder > 0) {
    let num = Math.min(remainder, 9);
    number_check += num;
    remainder -= num;
  }
  console.log(remainder);
  return number_check;
}

function element(string) {
  const elements = [
    "H",
    "He",
    "Li",
    "Be",
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
    "Na",
    "Mg",
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Ni",
    "Co",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
    "Cs",
    "Ba",
    "La",
    "Ce",
    "Pr",
    "Nd",
    "Pm",
    "Sm",
    "Eu",
    "Gd",
    "Tb",
    "Dy",
    "Ho",
    "Er",
    "Tm",
    "Yb",
    "Lu",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
    "Fr",
    "Ra",
    "Ac",
    "Th",
    "Pa",
    "U",
    "Np",
    "Pu",
    "Am",
    "Cm",
    "Bk",
    "Cf",
    "Es",
    "Fm",
    "Md",
    "No",
    "Lr",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fl",
    "Mc",
    "Lv",
    "Ts",
    "Og",
  ];
  let e_weight = 200;
  let has_two_letter = false;
  for (let i in elements) {
    let count = string.split(elements[i]).length - 1;

    if (count == 0) {
      continue;
    }
    if (elements[i].length > 1) {
      has_two_letter = true;
    }
    for (let j in elements) {
      if (i == j) {
        continue;
      }
      let count2 = elements[j].split(elements[i]).length - 1;
      let count3 = string.split(elements[j]).length - 1;
      if (count2 > 0) {
        count -= count3;
      }
    }
    e_weight -= (parseInt(i) + 1) * count;
    console.log(elements[i], parseInt(i) + 1, count, e_weight);
  }
  let element_check = "";
  if (!has_two_letter) {
    element_check = "He";
    e_weight -= 2;
  }
  let padders = [50, 16, 15, 9, 8, 7, 5, 2, 1];
  for (let i in padders) {
    while (e_weight >= padders[i]) {
      element_check += elements[padders[i] - 1];
      e_weight -= padders[i];
    }
  }
  return element_check;
}

function chess() {
  const svgURL = document.querySelector(".chess-img").src;
  const turn = document.querySelector(".chess-wrapper").querySelector(".move");
  const isWhiteTurn = turn.innerHTML.split("White").length > 1;

  fetchSVGAndConvertToFEN(svgURL, isWhiteTurn)
    .then((fen) => {
      console.log("Forsyth-Edwards Notation (FEN):", fen);
      // let stockfish = new Worker('http://starkeast01:49492/stockfish.min.js');
      let stockfish = new Worker(
        "https://cdn.jsdelivr.net/npm/stockfish@15.0.0/src/stockfish.min.js"
      );
      stockfish.postMessage(`position fen ${fen}`);
      stockfish.postMessage("go depth 8");
      stockfish.onmessage = (e) => {
        console.log(e.data);
      };
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function fetchSVGAndConvertToFEN(url, isWhiteTurn) {
  try {
    // Fetch the SVG file
    const response = await fetch(url);
    const svgText = await response.text();

    // Extract the ASCII representation from the SVG source code
    const asciiRegex = /<pre>(.*?)<\/pre>/s;
    const match = svgText.match(asciiRegex);
    if (!match) {
      throw new Error("ASCII representation not found in the SVG source code");
    }

    const asciiPosition = match[1];

    // Convert the ASCII position to FEN
    const fen = asciiToFEN(asciiPosition, isWhiteTurn);
    return fen;
  } catch (error) {
    console.error("Error fetching the SVG file:", error);
  }
}

function asciiToFEN(asciiPosition, isWhiteTurn) {
  const ranks = asciiPosition.trim().split("\n");
  let fen = "";

  for (let rank of ranks) {
    let fenRank = "";
    let emptySquares = 0;
    let splitrank = rank.split(" ");

    for (let char of splitrank) {
      if (char === ".") {
        emptySquares++;
      } else {
        if (emptySquares > 0) {
          fenRank += emptySquares;
          emptySquares = 0;
        }
        fenRank += char;
      }
    }

    if (emptySquares > 0) {
      fenRank += emptySquares;
    }

    fen += fenRank + "/";
  }

  fen = fen.slice(0, -1); // Remove trailing slash

  fen += isWhiteTurn ? " w" : " b";
  fen += " - 0 1"; // Assuming no information about castling rights and move counters

  return fen;
}

apply();
