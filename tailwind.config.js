/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'brawl': {
          'black': '#000000',      // bg-black
          'dark-purple': '#382737', // bg-purple-900
          'dark-slate': '#353B51', // bg-gray-800
          'dusty-grey': '#605F5E', // bg-gray-900
          'light-gray': '#A1A1A1', // bg-gray-400
          'white': '#ffffff',      // bg-white
          'navy': '#19165B',       // bg-blue-900
          'dark-blue': '#0149B7', // bg-blue-800
          'blue': '#0890FE',       // bg-blue-700
          'light-blue': '#12BEFC', // bg-blue-500
          'sky-blue': '#7ACBFF', // bg-sky-400
          'purple': '#9908EA',     // bg-purple-500
          'pink': '#FB09C7',       // bg-pink-
          'red': '#FE0000',        // bg-red-600
          'orange': '#EF900A', // bg-orange-600
          'gold': '#F9CC01',     // bg-orange-500
          'yellow': '#FAEF29',     // bg-yellow-500
          'lime': '#00DA05', // bg-lime-500
          'green': '#88F738',      // bg-green-500
        }
      }
    },
    plugins: [],
  }
}
