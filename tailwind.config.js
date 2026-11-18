/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: { extend: { colors: { vice: { bg: '#0b0614', card: '#160d25', pink: '#ff3399', cyan: '#00f0ff' } } } },
  plugins: [],
};
