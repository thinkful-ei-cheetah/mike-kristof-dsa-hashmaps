const { HashMap } = require('./dsa-hashmaps');

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

// 1. HashMap class
function main() {
  const lotr = new HashMap();
  const data = [
    { Hobbit: 'Bilbo' },
    { Hobbit: 'Frodo' },
    { Wizard: 'Gandolf' },
    { Human: 'Aragon' },
    { Elf: 'Legolas' },
    { Maiar: 'The Necromancer' },
    { Maiar: 'Sauron' },
    { RingBearer: 'Gollum' },
    { LadyOfLight: 'Galadriel' },
    { HalfElven: 'Arwen' },
    { Ent: 'Treebeard' }
  ];
  data.forEach(item => {
    const key = Object.keys(item);
    lotr.set(key[0], item[key[0]])
  })

  console.log(lotr);
  // the duplicated keys cause reinsertion at the same 
  // location it's not an instance of a collision because 
  // the keys are the same.

  console.log(lotr.get('Maiar'));
  console.log(lotr.get('Hobbit'));
}

// main();

// 2. WhatDoesThisDo
const WhatDoesThisDo = function() {
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1, 10);
  map1.set(str2, 20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3, 20);
  map2.set(str4, 10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};
// WhatDoesThisDo();
// map1 ran 20 and map2 ran 10, because the keys are duplicates

// 3. Demonstrate understanding of Hash maps
/*
1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 
into a hash map of length m = 11 using open addressing and a hash function k mod m.

|22|88|  |  |4 |15|28|17|59|31|10
 0  1  2  3  4  5  6  7  8  9  10

15 has a collision leading it to 5th slot
17 has a collision leading it to 7th slot
88 has a collision leading it to 2nd slot
59 has multiple collision so it is shifted to next avaliable slot

2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 
into the hash map with collisions resolved by separate chaining. Let the hash table have 
a length m = 9, and let the hash function be k mod m.

|  |{28, 19, 10}|20|12|  |5 |{15, 33}|  |17|  
 0    1          2  3  4  5  6        7  8  9

28, 19, 10 has collision on slot 1
15, 33 has collision on slot 6
*/


// 4. Remove duplicates
function removeDuplicates(str) {
  const stringHolder = new Map();
  let result = '';
  str.split('').forEach(letter => {
    if (!stringHolder.has(letter)) {
      stringHolder.set(letter, '');
      result += letter;
    }
  });
  return result;
}
// console.log(removeDuplicates('google hello world'));

// 5. Any permutation a palindrome
function palindrome(str) {
  const result = new Map();
  for (let i = 0; i < str.length; i++) {
    if (!result.delete(str[i])) {
      result.set(str[i], 1);
    }
  }
  if (result.size <= 1) {
    return true;
  } else {
    return false;
  }
}
// console.log(palindrome('racecar'));

// 6. Anagram grouping
const sort = (word) => word.split('').sort().join('');
function anagrams(words) {
  let map = new Map();
  words.forEach(word => {
    const groupedWords = sort(word);
    const group = map.get(groupedWords) || [];
    map.set(groupedWords, [...group, word]);
  })
  return Array.from(map.values());
}
console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

