import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

import { Logo } from './ui/logo'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 saturate-100 backdrop-blur-[10px]'>
      <div className='mx-auto flex h-[60px] max-w-4xl items-center justify-between px-8'>
        <Link href='/' aria-label='Home'>
          <Logo width={24} height={24} />
        </Link>
        <a target='_blank' rel='noopener noreferrer' href='https://github.com/nelsonlaidev/tools' aria-label='GitHub'>
          <SiGithub />
        </a>
      </div>
    </header>
  )
}

export default Header
