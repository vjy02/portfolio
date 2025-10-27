import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: {
                sm: {
                    css: {
                        h1: {
                            fontSize: "1rem",
                            lineHeight: "2.25rem",
                        },
                    },
                },
            },
        },
    },
    plugins: [typography],
};

export default config;
