import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./page.tsx",
        "./ContessaScroll.tsx",
    ],
    theme: {
        extend: {
            colors: {
                background: "#080808",
                accent: {
                    silver: "#ffffff",
                    amber: "#ffbf00",
                },
            },
            fontFamily: {
                impact: ["Impact", "Inter Tight", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            letterSpacing: {
                tighter: "-0.05em",
                wide: "0.1em",
            },
        },
    },
    plugins: [],
};
export default config;
