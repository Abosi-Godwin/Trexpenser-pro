/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light: {
                    // General UI
                    background: "#ffffff", // Main background
                    sectionBackground: "#f0f2fd", // Soft off-white section background
                    navbarFooter: "#e4e7fb", // Light pastel purple for structure
                    dividers: "#e4e7fb", // Soft gray-blue for section separation
                    text: "#272145", // Deep navy for readability

                    // Dashboard-Specific
                    sidebarHeaderBackground: "#e4e7fb", // Sidebar & header background
                    mainBackground: "#f0f2fd", // Dashboard main section background
                    cardBackground: "#ffffff", // White for cards
                    iconColor: "#5e4ab8", // Rich purple-blue for icons

                    // Accents
                    primaryCTA: "#7866d5", // Main button color (purple)
                    secondaryAccent: "#b0b4f1" // Hover effects & subtle highlights
                },

                dark: {
                    // General UI
                    background: "#12141c", // Darker, but not pure black
                    sectionBackground: "#1a1d26", // Slightly lighter for contrast
                    navbarFooter: "#191c25", // Deep navy/charcoal for structure
                    dividers: "#303341", // Medium gray-blue for section separation
                    text: "#ffffff", // Clean white text for readability

                    // Dashboard-Specific
                    sidebarHeaderBackground: "#191c25", // Sidebar & header background
                    mainBackground: "#12141c", // Dashboard main section background
                    cardBackground: "#252834", // **Lighter** gray for cards, ensuring more contrast
                    iconColor: "#a5b4fc", // Light lavender-blue for icons (better visibility)

                    // Accents
                    primaryCTA: "#a5b4fc", // CTA buttons (brighter blue for contrast)
                    secondaryAccent: "#7c74e0" // Hover effects & minor highlights
                }
            },
            width: {
                "1/10": "10%",
                "9/10": "90%"
            },
            height: {
                "1/10": "10%",
                "9/10": "90%"
            },
            gridTemplateColumns: {
                transactions: "2fr 2fr",
                mine: "1fr 5fr 1fr",
                quarter: "80% 20%",
                backQuarter: "15% 85%"
            }
        }
    },
    plugins: [],
    darkMode: "class"
};
