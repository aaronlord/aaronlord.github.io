import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import fontaine from 'astro-fontaine'

export default defineConfig({
  site: 'https://aaron.codes',
  integrations: [
        mdx(),
        sitemap(),
        tailwind(),
        fontaine({
            remoteFontFaceStylesheetURLs: [
                'https://fonts.googleapis.com/css2?family=Merriweather&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Ubuntu+Mono&display=fallback'
            ],
            fonts: [
                {
                    family: 'Roboto',
                },
                {
                    family: 'Ubuntu Mono',
                },
                {
                    family: 'Merriweather',
                    fallbacks: ['Georgia', 'serif'],
                }
            ],
            defaultFallbacks: [
                'ui-sans-serif',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
            ],
        })
    ]
});
