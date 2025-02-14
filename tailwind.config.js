
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
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
          'sea-blue': '#0066FF', // bg-blue-700
          'blue': '#0890FE',       // bg-blue-700
          'light-blue': '#12BEFC', // bg-blue-500
          'sky-blue': '#7ACBFF', // bg-sky-400
          'baby-blue': '#ADDFFF', // bg-sky-200
          'purple': '#9908EA',     // bg-purple-500
          'pink': '#FB09C7',       // bg-pink-
          'red': '#FE0000',        // bg-red-600
          'grape-purple': '#780139',      // bg-brown-600
          'dark-red': '#610000', // bg-red-700
          'dark-pink': '#48002B',      // bg-brown-600
          'orange': '#EF900A', // bg-orange-600
          'gold': '#F9CC01',     // bg-orange-500
          'yellow': '#FAEF29',     // bg-yellow-500
          'lime': '#00DA05', // bg-lime-500
          'green': '#88F738',      // bg-green-500
        }
      }
    },
    plugins: [],
    screens: {
      'xs': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}

