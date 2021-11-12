module.exports = {
    purge: [
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './_posts/*.md',
        './*.html',
    ],
    darkMode: false,
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
                        blockquote: {
                            p: {
                                fontFamily: theme('fontFamily.display'),
                                color: theme('colors.gray.600'),
                                fontSize: theme('fontSize.sm'),
                            },
                            div: {
                                marginTop: '-' + theme('spacing.2'),
                                marginBottom: theme('spacing.6'),
                            },
                            cite: {
                                fontSize: theme('fontSize.sm'),
                                color: theme('colors.gray.500'),
                            }
                        }
                    },
                },
            })
        },
    },
    variants: {
        extend: {
            textColor: ['important'],
            textDecoration: ['important'],
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
