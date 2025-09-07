'use client'

import Link from 'next/link'
import * as React from 'react'
import { useCallback, useMemo } from 'react'
import { useDebounce } from 'use-debounce'

import Hero from '@/components/hero'
import { Input } from '@/components/ui/input'
import { type Tool, TOOLS } from '@/lib/tool-groups'

type FilteredTools = {
  label: string
  tools: Tool[]
}

const useFilteredTools = (searchValue: string): FilteredTools[] => {
  const filter = useCallback(
    (tool: Tool): boolean =>
      tool.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue]
  )

  return useMemo(() => {
    if (!searchValue) return TOOLS

    return TOOLS.map((t) => ({
      label: t.label,
      tools: t.tools.filter((element) => filter(element))
    })).filter((t) => t.tools.length > 0)
  }, [searchValue, filter])
}

const HomePage = () => {
  const [value, setValue] = React.useState('')
  const [debouncedValue] = useDebounce(value, 300)
  const filteredTools = useFilteredTools(debouncedValue)

  return (
    <div>
      <Hero />
      <div className='flex flex-col space-y-12'>
        <Input
          type='text'
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value)
          }}
          placeholder='Search'
          className='w-full'
        />
        <div id='get-started' className='flex w-full scroll-mt-20 flex-col gap-6'>
          {filteredTools.map(({ label, tools }) => (
            <Card key={label} tools={tools} title={label} />
          ))}
          {filteredTools.length === 0 ? (
            <div className='text-center text-muted-foreground'>No results found.</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

type CardProps = {
  tools: Tool[]
  title: string
}

const Card = (props: CardProps) => {
  const { tools, title } = props

  return (
    <div className='w-full space-y-4 rounded-lg border p-4'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <div className='grid gap-4 sm:grid-cols-2'>
        {tools.map((tool) => (
          <Item key={tool.label} {...tool} />
        ))}
      </div>
    </div>
  )
}

const Item = (props: Tool) => {
  const { color, icon, label, description, link } = props
  const Icon = icon

  return (
    <Link href={link} className='flex items-start gap-4 rounded-lg bg-muted/50 p-6 transition-colors hover:bg-muted'>
      <div className='rounded-lg bg-accent p-2'>
        <Icon className='size-4' style={{ color }} />
      </div>
      <div className='space-y-1'>
        <h3 className='text-lg leading-none font-medium tracking-tight'>{label}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </Link>
  )
}

export default HomePage
