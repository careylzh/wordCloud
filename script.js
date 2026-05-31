const form = document.getElementById('word-form');
const input = document.getElementById('word-input');
const cloud = document.getElementById('word-cloud');
const clearButton = document.getElementById('clear-button');

const fillerWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from', 'if',
  'in', 'into', 'is', 'it', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'with',
  'you', 'your', 'we', 'our', 'they', 'them', 'this', 'that', 'these', 'those'
]);

const frequencies = new Map();

const seedWords = [
  'design', 'design', 'research', 'prototype', 'prototype', 'prototype',
  'iteration', 'interface', 'story', 'system', 'form', 'the', 'and', 'of'
];

seedWords.forEach(addWord);
renderCloud();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const raw = input.value.trim();
  if (!raw) return;

  addWord(raw);
  renderCloud();
  form.reset();
  input.focus();
});

clearButton.addEventListener('click', () => {
  frequencies.clear();
  renderCloud();
  input.focus();
});

function addWord(word) {
  const normalized = normalizeWord(word);
  if (!normalized) return;
  frequencies.set(normalized, (frequencies.get(normalized) || 0) + 1);
}

function normalizeWord(word) {
  return word
    .toLowerCase()
    .replace(/[^a-z0-9'-]/gi, '')
    .trim();
}

function renderCloud() {
  const entries = [...frequencies.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const maxFrequency = entries[0]?.[1] || 1;

  cloud.innerHTML = '';

  if (!entries.length) {
    cloud.innerHTML = '<p class="hint">Your word cloud is empty. Add a word to begin.</p>';
    return;
  }

  entries.forEach(([word, count]) => {
    const span = document.createElement('span');
    const significant = isSignificant(word, count, maxFrequency);
    span.className = `word ${significant ? 'significant' : 'insignificant'}`;
    span.textContent = word;
    span.style.fontSize = `${scaleFont(count, maxFrequency)}rem`;
    span.title = `${word}: ${count}`;
    cloud.appendChild(span);
  });
}

function isSignificant(word, count, maxFrequency) {
  if (fillerWords.has(word)) return false;
  return count >= Math.max(2, Math.ceil(maxFrequency * 0.45));
}

function scaleFont(count, maxFrequency) {
  const min = 1.1;
  const max = 4.6;
  if (maxFrequency === 1) return 1.4;
  return (min + ((count - 1) / (maxFrequency - 1)) * (max - min)).toFixed(2);
}
