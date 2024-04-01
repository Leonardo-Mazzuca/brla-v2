/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'heading-blue': '#0A1F27',
        'heading-blue-secondary' : '#0A1F27',
        'heading-blue-light' : '#1f3645',
        'heading-blue-800': '#1F2A37',
        
        'primary-green' : '#00DD85',
    
        'gray-400' : '#9CA3AF',
        'gray-500' : '#6B7280',
        'gray-600' : '#4B5563',
        'gray-800' : '#1F2A37',

       
      },
    },
  },
  
  plugins: [
    require('flowbite/plugin')({
      charts: true,
  }),
]
}