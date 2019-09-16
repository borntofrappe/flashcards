// utility function translating numbers in the [0-100] range into French
// for a more thorough explanation https://www.thefrenchexperiment.com/learn-french/numbers
export function translateNumber(number) {
  // array of numbers which are meant to be memorized
  // the remaining numbers are build on top of these values
  const startingNumbers = [
    {
      value: 0,
      french: 'zero',
    },
    {
      value: 1,
      french: 'un',
    },
    {
      value: 2,
      french: 'deux',
    },
    {
      value: 3,
      french: 'trois',
    },
    {
      value: 4,
      french: 'quatre',
    },
    {
      value: 5,
      french: 'cinq',
    },
    {
      value: 6,
      french: 'six',
    },
    {
      value: 7,
      french: 'sept',
    },
    {
      value: 8,
      french: 'huit',
    },
    {
      value: 9,
      french: 'neuf',
    },
    {
      value: 10,
      french: 'dix',
    },
    {
      value: 11,
      french: 'onze',
    },
    {
      value: 12,
      french: 'douze',
    },
    {
      value: 13,
      french: 'treize',
    },
    {
      value: 14,
      french: 'quatorze',
    },
    {
      value: 15,
      french: 'quinze',
    },
    {
      value: 16,
      french: 'seize',
    },
    {
      value: 20,
      french: 'vingt',
    },
    {
      value: 30,
      french: 'trente',
    },
    {
      value: 40,
      french: 'quarante',
    },
    {
      value: 50,
      french: 'cinquante',
    },
    {
      value: 60,
      french: 'soixante',
    },
    {
      value: 70,
      french: 'soixante-dix',
    },
    {
      value: 80,
      french: 'quatre-vingts',
    },
    {
      value: 90,
      french: 'quatre-vingt-dix',
    },
    {
      value: 100,
      french: 'cent',
    },
  ];

  // if the input number is in the startingNumbers return its french counterpart
  // otherwise continue building the number
  const match = startingNumbers.find(({ value }) => value === number);
  if(match) return match.french;

  // separate the tens from the unit (as in 85 -> 80 + 5)
  let tens = parseInt(number.toString()[0], 10) * 10;
  let unit = parseInt(number.toString()[1], 10);
  // define the string separating the french word (by default a dash, but for some numbers the word **et**)
  let separator = '-';

  /*
  french exception #1
  change the separator to the word **et**, for the following numbers
  [21, 31, 41, 51, 61. 71]
  */
  if (unit === 1 && (tens >= 20 && tens <= 70)) {
    separator = ' et ';
  }

  /* french exception #2
  change the numbers in the 70s and 90s digits when the unit is less than 7
  this is because seventy-two is actually sixty-twelve, ninety-five is actually four-twenties-fifteen

  I don't make the rules
  */
  if ((tens === 70 || tens === 90) && unit < 7) {
    tens -= 10;
    unit += 10;
  }

  // find the word describing the tens and unit
  let { french: tensFrench } = startingNumbers.find(({ value }) => value === tens);
  const { french: unitFrench } = startingNumbers.find(({ value }) => value === unit);

  /* french exception #3
  change the word for the 80s digits to remove the last letter
  this is because eighty-two is quatre-vingt-deux and not quatre-vingt**s**-deux
  */
  if (tens === 80) {
    tensFrench = tensFrench.slice(0, tensFrench.length - 1);
  }

  // return the translated number
  return `${tensFrench}${separator}${unitFrench}`;
}
