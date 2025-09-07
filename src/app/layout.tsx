import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

import { GeistSans } from 'geist/font/sans'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { env } from '@/env'
import { cn } from '@/utils/cn'

type LayoutProps = {
  children: React.ReactNode
}

const MY_NAME = 'Nelson Lai'
const SITE_URL = env.NEXT_PUBLIC_SITE_URL
const SITE_TITLE = 'Tools'
const SITE_DESCRIPTION =
  'Discover a powerful collection of web tools designed to streamline your workflow and boost productivity. Made by @nelsonlaidev.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  authors: {
    name: MY_NAME,
    url: 'https://nelsonlai.dev'
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: MY_NAME,
    description: SITE_DESCRIPTION,
    site: '@nelsonlaidev',
    siteId: '1152256803746377730',
    creator: '@nelsonlaidev',
    creatorId: '1152256803746377730',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION
      }
    ]
  },
  alternates: {
    canonical: SITE_URL
  },
  keywords: ['tools', 'free tools', 'web tools', 'tools for developers', 'tools for designers'],
  creator: 'nelsonlaidev',
  openGraph: {
    url: SITE_URL,
    type: 'website',
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en-US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION,
        type: 'image/png'
      }
    ]
  },
  icons: {
    icon: {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico'
    },
    apple: [
      {
        type: 'image/png',
        url: '/apple-touch-icon.png',
        sizes: '180x180'
      }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
        sizes: 'any'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon-32x32.png',
        sizes: '32x32'
      }
    ]
  }
}

export const viewport: Viewport = {
  themeColor: {
    color: '#000000'
  }
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <html lang='en-US' className={cn(GeistSans.variable, 'dark')}>
      <body>
        <Header />
        <main className='relative mx-auto max-w-4xl px-8 py-24'>{children}</main>
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

export default Layout
