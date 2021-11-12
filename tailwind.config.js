module.exports = {
    purge: [
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './_posts/*.md',
        './*.html',
    ],
    darkMode: 'media', // 'class'
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Roboto'],
                'mono': ['Roboto Mono'],
                'display': ['Merriweather'],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.500'),
                        h2: {
                            fontFamily: theme('fontFamily.display'),
                            borderBottomWidth: theme('borderWidth.DEFAULT'),
                            borderColor: theme('colors.gray.200'),
                            lineHeight: theme('lineHeight.10'),
                        },
                        h3: {
                            fontFamily: theme('fontFamily.display'),
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
                                fontFamily: theme('fontFamily.display'),
                                color: theme('colors.gray.500'),
                                fontSize: theme('fontSize.sm'),
                            },
                            div: {
                                marginTop: '-' + theme('spacing.2'),
                                marginBottom: theme('spacing.6'),
                            },
                            cite: {
                                fontSize: theme('fontSize.sm'),
                                color: theme('colors.gray.400'),
                            }
                        }
                    },
                },
                dark: {
                    css: {
                        color: theme('colors.gray.200'),
                        h2: {
                            color: theme('colors.white')
                        },
                        h3: {
                            color: theme('colors.white')
                        },
                        strong: {
                            color: theme('colors.white')
                        },
                        blockquote: {
                            p: {
                                color: theme('colors.gray.200'),
                            },
                            cite: {
                                color: theme('colors.gray.300'),
                            }
                        },
                    }
                }
            })
        },
    },
    variants: {
        extend: {
            typography: ['dark'],
            textColor: ['important'],
            textDecoration: ['important'],
            margin: ['important'],
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        function({ addVariant }) {
            addVariant('important', ({ container }) => {
                container.walkRules(rule => {
                    rule.selector = `.${rule.selector.slice(1)}\\!`
                    rule.walkDecls(decl => {
                        decl.important = true
                    })
                })
            })
        }
    ],
}
