/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // permite tema escuro
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: "var(--primary)",
            secondary: "var(--secondary)",
            accent: "var(--accent)",
            background: "var(--background)",
            foreground: "var(--foreground)",
        },
    },
  },
  plugins: [],
};
