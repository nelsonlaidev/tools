import Link from 'next/link'

import { buttonVariants } from './ui/button'

const Hero = () => {
  return (
    <div className='my-12 space-y-8'>
      <h1 className='text-3xl font-extrabold'>
        The <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>Best</span>{' '}
        Online Tools
      </h1>
      <p className='leading-6 text-muted-foreground'>
        Discover a powerful collection of web tools designed to streamline your workflow and boost productivity. Made by{' '}
        <Link href='https://github.com/nelsonlaidev' className='text-white'>
          @nelsonlaidev
        </Link>
        . I hope to practice my skills.
      </p>
      <div className='flex gap-4'>
        <Link href='#get-started' className={buttonVariants()}>
          Get started
        </Link>
        <Link href='https://github.com/nelsonlaidev/tools' className={buttonVariants({ variant: 'outline' })}>
          Source code
        </Link>
      </div>
    </div>
  )
}

export default Hero
