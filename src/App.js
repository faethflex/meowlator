import { useState } from 'react';
import './App.css';

const morse = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
  'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
  'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
  'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
  'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
  'y': '-.--', 'z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  '\'': '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..--.-',
  '"': '.-..-.',
  '$': '...-..-',
  '@': '.--.-.',
  '¿': '..-.-',
  '¡': '--...-',
};

const morseReversed = Object.fromEntries(Object.entries(morse).map(([k, v]) => [v, k]));

function isMeow(input) {
  return /^[meow MEOW]+$/.test(input);
}

function toMeow(english) {
  return english
    .split('')
    .map((c) => morse[c.toLowerCase()] || '')
    .join(' ')
    .replace(/\./g, 'meow')
    .replace(/-/g, 'MEOW')
    .replace(/ +/g, ' ');
}

function toEnglish(meow) {
  return meow
    .replace(/meow/g, '.')
    .replace(/MEOW/g, '-')
    .split(' ')
    .map((w) => morseReversed[w] || '')
    .join('')
    .replace(/ +/g, ' ');
}

function App() {
  const [englishText, setEnglishText] = useState("");
  const [meowText, setMeowText] = useState("");

  const handleEnglishChange = e => {
    const value = e.target.value.toLowerCase();
    if (value && !morse[value.substr(-1)]) return false;
    setEnglishText(value);
    setMeowText(toMeow(value));
  };

  const handleMeowChange = e => {
    const value = e.target.value.replace(/(\r\n|\n|\r)/gm, "");
    if (value && !isMeow(value)) return false;
    setMeowText(value);
    setEnglishText(toEnglish(value));
  };

  return (
    <>
      <textarea
        onChange={handleEnglishChange}
        value={englishText}
        placeholder="???"
      />
      <textarea
        onChange={handleMeowChange}
        value={meowText}
        placeholder="meow"
      />
    </>
  );
}

export default App;
