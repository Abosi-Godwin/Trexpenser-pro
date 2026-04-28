/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light: {
                    background: "#fafbff",
                    sectionBackground: "#f0f2fd",
                    navbarFooter: "#e8eaf8",
                    dividers: "#dde0f5",
                    text: "#1a1836", 
                    subtext: "#6b7280",  

                    sidebarHeaderBackground: "#e8eaf8",
                    mainBackground: "#f0f2fd",
                    cardBackground: "#ffffff",
                    iconColor: "#5e4ab8",

                    primaryCTA: "#6c57d4", 
                    secondaryAccent: "#ede9ff",  
                    success: "#10b981",  
                    danger: "#ef4444", 
                    warning: "#f59e0b"  
                },

                dark: {
                    background: "#0f1117",  
                    sectionBackground: "#161923",
                    navbarFooter: "#13161f",
                    dividers: "#252836",
                    text: "#f1f3ff",  
                    subtext: "#8b92a5",  

                    sidebarHeaderBackground: "#13161f",
                    mainBackground: "#0f1117",
                    cardBackground: "#1c1f2e", 
                    iconColor: "#a78bfa", 

                    primaryCTA: "#7c6fe0", 
                    secondaryAccent: "#2d2b52",  
                    success: "#059669",
                    danger: "#dc2626",
                    warning: "#d97706"
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
