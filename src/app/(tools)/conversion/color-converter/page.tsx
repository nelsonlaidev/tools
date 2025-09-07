'use client'

import { colord, extend, getFormat } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import cmykPlugin from 'colord/plugins/cmyk'
import hwbPlugin from 'colord/plugins/hwb'
import lchPlugin from 'colord/plugins/lch'
import namesPlugin from 'colord/plugins/names'
import { useState } from 'react'

import Container from '@/components/container'
import Title from '@/components/title'
import { Input } from '@/components/ui/input'

extend([hwbPlugin, cmykPlugin, lchPlugin, namesPlugin, a11yPlugin])

type ConversionItem = {
  label: string
  value: string
}

type ConversionList = {
  label: string
  data: ConversionItem[]
}

const ColorConverter = () => {
  const [value, setValue] = useState('#ffffff')
  const color = colord(value)
  const isValid = color.isValid()

  const lists: ConversionList[] = [
    {
      label: 'Conversion',
      data: [
        {
          label: 'HEX',
          value: color.toHex()
        },
        {
          label: 'RGB',
          value: color.toRgbString()
        },
        {
          label: 'HSL',
          value: color.toHslString()
        },
        {
          label: 'HWB',
          value: color.toHwbString()
        },
        {
          label: 'CMYK',
          value: color.toCmykString()
        },
        {
          label: 'LCH',
          value: color.toLchString()
        },
        {
          label: 'CSS Keyword',
          value: color.toName({ closest: true }) ?? 'Unknown'
        }
      ]
    },
    {
      label: 'Analysis',
      data: [
        {
          label: 'Is it a valid CSS value?',
          value: isValid ? 'Yes' : 'No'
        },
        {
          label: 'Format',
          value: getFormat(value) ?? '-'
        },
        {
          label: 'Hue (0-359)',
          value: `${color.hue()} deg`
        },
        {
          label: 'Brightness',
          value: `${Math.floor(color.brightness() * 100)}% (${color.isDark() ? 'Dark' : 'Light'})`
        },
        {
          label: 'Luminance',
          value: `${Math.floor(color.luminance() * 100)}%`
        },
        {
          label: 'Contrast',
          value: `${color.contrast()}:1`
        }
      ]
    }
  ]

  return (
    <Container className='flex flex-col items-center justify-center'>
      <Title title='Color Converter' />

      <div className='relative my-8 flex w-full max-w-[250px] items-center justify-between gap-4'>
        <label htmlFor='color' className='text-lg font-bold'>
          <div className='size-7 cursor-pointer rounded-lg' style={{ backgroundColor: value }} />
          <span className='sr-only'>Select color</span>
        </label>
        <input
          className='invisible absolute top-2 left-0'
          type='color'
          id='color'
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
      </div>

      <div className='my-12 grid w-full gap-4 sm:grid-cols-2'>
        {lists.map((list) => (
          <div key={list.label} className='rounded-lg border p-4'>
            <div className='mb-8 text-center text-3xl font-bold'>{list.label}</div>
            {list.data.map((item) => (
              <div className='mb-4 border-b-4' key={item.label}>
                <div className='text-sm font-medium'>{item.label}</div>
                <div className='my-2 text-lg font-bold'>{item.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  )
}

export default ColorConverter
