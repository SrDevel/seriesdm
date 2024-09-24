/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'colors': {
        'blue': '#256eff', 100: '#00133a', 200: '#002774', 300: '#003aae', 400: '#004ee9', 500: '#256eff', 600: '#508aff', 700: '#7ba7ff', 800: '#a7c5ff', 900: '#d3e2ff',
        'primary': {
        DEFAULT: '#46237a', 100: '#0e0719', 200: '#1c0e31', 300: '#2a154a', 400: '#381c62', 500: '#46237a', 600: '#6633b1', 700: '#8a5bcf', 800: '#b192df', 900: '#d8c8ef'
      },
      'emerald': {
        DEFAULT: '#3ddc97', 100: '#092f1f', 200: '#115f3d', 300: '#1a8e5c', 400: '#23be7b', 500: '#3ddc97', 600: '#64e3ac', 700: '#8beac0', 800: '#b1f1d5', 900: '#d8f8ea'
      },
      'white': {
        DEFAULT: '#fcfcfc', 100: '#323232', 200: '#656565', 300: '#979797', 400: '#cacaca', 500: '#fcfcfc', 600: '#fdfdfd', 700: '#fdfdfd', 800: '#fefefe', 900: '#fefefe'
      },
      'folly': {
        DEFAULT: '#ff495c', 100: '#410007', 200: '#83000d', 300: '#c40014', 400: '#ff061f', 500: '#ff495c', 600: '#ff6c7b', 700: '#ff919c', 800: '#ffb6bd', 900: '#ffdade'
      },

      },
      
    },
  },
  plugins: [],
}

