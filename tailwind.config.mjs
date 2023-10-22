const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
                'serif': ['Merriweather', ...defaultTheme.fontFamily.serif],
                'mono': ['Roboto Mono', ...defaultTheme.fontFamily.mono],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.600'),
                        h2: {
                            fontFamily: 'Merriweather, Georgia',
                            borderBottomWidth: theme('borderWidth.DEFAULT'),
                            borderColor: theme('colors.gray.200'),
                            lineHeight: theme('lineHeight.10'),
                        },
                        h3: {
                            fontFamily: 'Merriweather, Georgia',
                            lineHeight: theme('lineHeight.10'),
                        },
                        ul: {
                            li: {
                                marginTop: theme('spacing.0'),
                                marginBottom: theme('spacing.0'),
                            },
                        },
                        blockquote: {
                            p: {
                                fontFamily: theme('fontFamily.serif'),
                                color: theme('colors.gray.600'),
                                fontSize: theme('fontSize.sm'),
                            },
                            div: {
                                marginTop: '-' + theme('spacing.2'),
                                marginBottom: theme('spacing.6'),
                            },
                            cite: {
                                fontSize: theme('fontSize.sm'),
                                color: theme('colors.gray.600'),
                            }
                        }
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
