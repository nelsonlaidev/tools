'use client'

import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/utils/cn'

import { buttonVariants } from './ui/button'

const BackButton = () => {
  return (
    <Link href='/' className={cn(buttonVariants({ variant: 'outline' }), 'group')}>
      <ArrowLeftIcon className='mr-2 size-4 transition-transform group-hover:-translate-x-0.5' /> Back
    </Link>
  )
}

export default BackButton
