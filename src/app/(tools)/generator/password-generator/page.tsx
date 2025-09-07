'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import Container from '@/components/container'
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PasswordGenerator = () => {
  const [length, setLength] = useState(10)
  const [upperCase, setUpperCase] = useState(true)
  const [lowerCase, setLowerCase] = useState(true)
  const [digits, setDigits] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [avoidSimilarChars, setAvoidSimilarChars] = useState(true)
  const [password, setPassword] = useState('')

  const handleGeneratePassword = () => {
    if (!upperCase && !lowerCase && !digits && !symbols) {
      toast.error('Please select at least one of character types.')
      return
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const symbolChars = '!@#$%^&*()_+-={}[]|:;<>,.?/~`'
    const similarChars = 'iloO01'

    let chars = ''

    if (upperCase) {
      chars += uppercaseChars
    }

    if (lowerCase) {
      chars += lowercaseChars
    }

    if (digits) {
      chars += digitChars
    }

    if (symbols) {
      chars += symbolChars
    }

    if (avoidSimilarChars) {
      chars = chars
        // eslint-disable-next-line unicorn/prefer-spread -- This is safer
        .split('')
        .filter((char) => !similarChars.includes(char))
        .join('')
    }

    let generatedPassword = ''

    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line sonarjs/pseudo-random -- Safe
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setPassword(generatedPassword)
  }

  const handleClearPassword = () => {
    setPassword('')
  }

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password)
      toast.success('Password copied to clipboard.')
    } catch {
      toast.error('Failed to copy password to clipboard.')
    }
  }

  const handleSavePassword = () => {
    const blob = new Blob([password], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.download = 'password.txt'
    link.href = url
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Container className='flex max-w-xl flex-col items-center justify-center'>
      <Title title='Password generator' />

      <div className='my-12 w-full max-w-3xl items-center justify-center space-y-4 rounded-md border p-6'>
        <div>
          <Label className='mb-2 block font-bold' htmlFor='length'>
            Length
          </Label>
          <Input
            id='length'
            type='number'
            min='1'
            value={length}
            onChange={(e) => {
              setLength(Number.parseInt(e.target.value))
            }}
          />
        </div>
        <div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='uppercase'
                checked={upperCase}
                onCheckedChange={(value: boolean) => {
                  setUpperCase(value)
                }}
              />
              <Label htmlFor='uppercase'>Uppercase letters</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='lowercase'
                checked={lowerCase}
                onCheckedChange={(value: boolean) => {
                  setLowerCase(value)
                }}
              />
              <Label htmlFor='lowercase'>Lowercase letters</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='digits'
                checked={digits}
                onCheckedChange={(value: boolean) => {
                  setDigits(value)
                }}
              />
              <Label htmlFor='digits'>Digits</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='symbols'
                checked={symbols}
                onCheckedChange={(value: boolean) => {
                  setSymbols(value)
                }}
              />
              <Label htmlFor='symbols'>Symbols</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='avoid-similar-chars'
                checked={avoidSimilarChars}
                onCheckedChange={(value: boolean) => {
                  setAvoidSimilarChars(value)
                }}
              />
              <Label htmlFor='avoid-similar-chars'>Avoid similar characters (e.g. 1 and l, 0 and O)</Label>
            </div>
          </div>
        </div>
        <div className='mb-4 flex gap-2'>
          <Button onClick={handleGeneratePassword} type='button'>
            Generate
          </Button>
          <Button onClick={handleClearPassword} type='button'>
            Clear
          </Button>
        </div>
        {password && (
          <div className='space-y-2'>
            <div className='font-bold'>Generated Password</div>
            <div className='rounded-md border p-2 break-all'>{password}</div>
            <div className='flex gap-2'>
              <Button onClick={handleCopyPassword} type='button'>
                Copy
              </Button>
              <Button onClick={handleSavePassword} type='button'>
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default PasswordGenerator
