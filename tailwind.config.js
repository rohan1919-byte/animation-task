/** Palette: a bright morning-road scene */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        haze: "#D6E6EC",     // sky background
        harbor: "#0E2A3B",   // headline + text
        coral: "#FF5A36",    // the car / accent
        asphalt: "#1B2430",  // road
        lane: "#F6D743",     // road markings
        mist: "#F3F8FA",     // light surfaces
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
