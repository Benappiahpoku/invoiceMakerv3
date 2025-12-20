import { useHead } from '@vueuse/head'

export interface MetaOptions {
    title: string
    description?: string
    keywords?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    twitterTitle?: string
    twitterDescription?: string
    twitterImage?: string
}

/**
 * Composable for managing page meta tags dynamically
 * Provides SEO optimization for different routes and pages
 */
export function useMeta(options: MetaOptions) {
    const baseUrl = 'https://freeonlineinvoice.netlify.app'

    const metaTags = {
        title: options.title,
        meta: [
            {
                name: 'description',
                content: options.description
            },
            {
                name: 'keywords',
                content: options.keywords
            },
            // Open Graph
            {
                property: 'og:title',
                content: options.ogTitle || options.title
            },
            {
                property: 'og:description',
                content: options.ogDescription || options.description
            },
            {
                property: 'og:image',
                content: options.ogImage || `${baseUrl}/og-image.jpg`
            },
            {
                property: 'og:url',
                content: baseUrl
            },
            {
                property: 'og:type',
                content: 'website'
            },
            // Twitter
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:title',
                content: options.twitterTitle || options.title
            },
            {
                name: 'twitter:description',
                content: options.twitterDescription || options.description
            },
            {
                name: 'twitter:image',
                content: options.twitterImage || options.ogImage || `${baseUrl}/og-image.jpg`
            }
        ]
    }

    useHead(metaTags)
}