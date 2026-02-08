/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          active: '#37373d',
          border: '#3e3e42',
          header: '#323233',
          text: '#cccccc',
          textDim: '#858585',
          accent: '#007acc',
          green: '#4ec9b0',
          blue: '#569cd6',
          yellow: '#dcdcaa',
          orange: '#ce9178',
          purple: '#c586c0',
          pink: '#c678dd',
        }
      },
      fontFamily: {
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
