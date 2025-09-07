'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import Container from '@/components/container'
import Title from '@/components/title'
import { Textarea } from '@/components/ui/textarea'
import StatItem from '@/components/word-counter/stat-item'
import { useTextStats } from '@/hooks/use-text-stats'

const WordCounter = () => {
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebounce(value, 300)
  const stats = useTextStats(debouncedValue)

  return (
    <Container className='flex max-w-5xl flex-col items-center justify-center'>
      <Title title='Word Counter' />

      <div className='my-12 grid w-full grid-cols-2 gap-2 sm:grid-cols-4'>
        <StatItem value={stats.words} label='words' />
        <StatItem value={stats.chars} label='characters' />
        <StatItem value={stats.charsWithoutSpaces} label='characters without spaces' />
        <StatItem value={stats.paragraphs} label='paragraphs' />
      </div>

      <Textarea
        placeholder='Type here ...'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        aria-label='Text to analyze'
      />
    </Container>
  )
}

export default WordCounter
