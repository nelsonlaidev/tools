'use client'

import { useOs } from '@mantine/hooks'
import { useMemo, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import Container from '@/components/container'
import Title from '@/components/title'
import { cn } from '@/utils/cn'

type KeyType = {
  keyName: string
  style?: React.CSSProperties
  code: string
}

type KeyProps = {
  item: KeyType
  active: boolean
}

const Key = (props: KeyProps) => {
  const { active = false, item } = props

  return (
    <div
      className={cn(
        'flex h-[35px] w-8 items-center justify-center rounded-sm bg-[#333] text-sm text-white shadow-[rgb(34_34_34)_0px_4px_0px_5px]',
        active && 'bg-green-800'
      )}
      style={item.style}
    >
      {item.keyName}
    </div>
  )
}

const KeyboardTester = () => {
  const os = useOs()
  const isMacos = os === 'macos'
  const [activeKeys, setActiveKeys] = useState<Set<string>>(() => new Set())

  const layout: KeyType[] = useMemo(
    () => [
      { code: 'Escape', keyName: 'ESC' },
      { code: 'F1', keyName: 'F1' },
      { code: 'F2', keyName: 'F2' },
      { code: 'F3', keyName: 'F3' },
      { code: 'F4', keyName: 'F4' },
      { code: 'F5', keyName: 'F5' },
      { code: 'F6', keyName: 'F6' },
      { code: 'F7', keyName: 'F7' },
      { code: 'F8', keyName: 'F8' },
      { code: 'F9', keyName: 'F9' },
      { code: 'F10', keyName: 'F10' },
      { code: 'F11', keyName: 'F11' },
      { code: 'F12', keyName: 'F12' },
      { code: 'Backquote', keyName: '`' },
      { code: 'Digit1', keyName: '1' },
      { code: 'Digit2', keyName: '2' },
      { code: 'Digit3', keyName: '3' },
      { code: 'Digit4', keyName: '4' },
      { code: 'Digit5', keyName: '5' },
      { code: 'Digit6', keyName: '6' },
      { code: 'Digit7', keyName: '7' },
      { code: 'Digit8', keyName: '8' },
      { code: 'Digit9', keyName: '9' },
      { code: 'Digit0', keyName: '0' },
      { code: 'Minus', keyName: '-' },
      { code: 'Equal', keyName: '=' },
      { code: 'Backspace', keyName: '←', style: { width: 78 } },
      { code: 'Tab', keyName: 'Tab', style: { width: 42 } },
      { code: 'KeyQ', keyName: 'Q' },
      { code: 'KeyW', keyName: 'W' },
      { code: 'KeyE', keyName: 'E' },
      { code: 'KeyR', keyName: 'R' },
      { code: 'KeyT', keyName: 'T' },
      { code: 'KeyY', keyName: 'Y' },
      { code: 'KeyU', keyName: 'U' },
      { code: 'KeyI', keyName: 'I' },
      { code: 'KeyO', keyName: 'O' },
      { code: 'KeyP', keyName: 'P' },
      { code: 'BracketLeft', keyName: '[' },
      { code: 'BracketRight', keyName: ']' },
      { code: 'Backslash', keyName: '\\', style: { width: 42 } },
      { code: 'CapsLock', keyName: 'CAPS', style: { width: 52 } },
      { code: 'KeyA', keyName: 'A' },
      { code: 'KeyS', keyName: 'S' },
      { code: 'KeyD', keyName: 'D' },
      { code: 'KeyF', keyName: 'F' },
      { code: 'KeyG', keyName: 'G' },
      { code: 'KeyH', keyName: 'H' },
      { code: 'KeyJ', keyName: 'J' },
      { code: 'KeyK', keyName: 'K' },
      { code: 'KeyL', keyName: 'L' },
      { code: 'Semicolon', keyName: ';' },
      { code: 'Quote', keyName: "'" },
      { code: 'Enter', keyName: 'Enter', style: { width: 80 } },
      { code: 'ShiftLeft', keyName: 'Shift', style: { width: 80 } },
      { code: 'KeyZ', keyName: 'Z' },
      { code: 'KeyX', keyName: 'X' },
      { code: 'KeyC', keyName: 'C' },
      { code: 'KeyV', keyName: 'V' },
      { code: 'KeyB', keyName: 'B' },
      { code: 'KeyN', keyName: 'N' },
      { code: 'KeyM', keyName: 'M' },
      { code: 'Comma', keyName: ',' },
      { code: 'Period', keyName: '.' },
      { code: 'Slash', keyName: '/' },
      { code: 'ShiftRight', keyName: 'Shift', style: { width: 100 } },
      { code: 'ControlLeft', keyName: 'CTRL', style: { width: 52 } },
      {
        code: 'MetaLeft',
        keyName: isMacos ? '⌘' : '⊞',
        style: { width: 40 }
      },
      {
        code: 'AltLeft',
        keyName: isMacos ? 'option' : 'Alt',
        style: {
          width: 40,
          ...(isMacos && { fontSize: 9 })
        }
      },
      { code: 'Space', keyName: 'Space', style: { width: 316 } },
      {
        code: 'AltRight',
        keyName: isMacos ? 'option' : 'Alt',
        style: {
          width: 40,
          ...(isMacos && { fontSize: 9 })
        }
      },
      {
        code: isMacos ? 'MetaRight' : 'ContextMenu',
        keyName: isMacos ? '⌘' : '▤',
        style: { width: 40 }
      },
      { code: 'ControlRight', keyName: 'CTRL', style: { width: 52 } },
      { code: 'PrintScreen', keyName: 'PRTSC', style: { fontSize: 10 } },
      { code: 'ScrollLock', keyName: 'SCRLK', style: { fontSize: 10 } },
      { code: 'Pause', keyName: 'PAUSE', style: { fontSize: 10 } },
      { code: 'Insert', keyName: 'INS', style: { fontSize: 10 } },
      { code: 'Home', keyName: 'HOME', style: { fontSize: 10 } },
      { code: 'PageUp', keyName: 'PGUP', style: { fontSize: 10 } },
      { code: 'Delete', keyName: 'DEL', style: { fontSize: 10 } },
      { code: 'End', keyName: 'END', style: { fontSize: 10 } },
      { code: 'PageDown', keyName: 'PGDN', style: { fontSize: 10 } },
      { code: 'ArrowUp', keyName: '↑' },
      { code: 'ArrowLeft', keyName: '←' },
      { code: 'ArrowDown', keyName: '↓' },
      { code: 'ArrowRight', keyName: '→' },
      { code: 'NumLock', keyName: 'NUM', style: { fontSize: 10 } },
      { code: 'NumpadDivide', keyName: '/' },
      { code: 'NumpadMultiply', keyName: '*' },
      { code: 'NumpadSubtract', keyName: '-' },
      { code: 'Numpad7', keyName: '7' },
      { code: 'Numpad8', keyName: '8' },
      { code: 'Numpad9', keyName: '9' },
      { code: 'Numpad4', keyName: '4' },
      { code: 'Numpad5', keyName: '5' },
      { code: 'Numpad6', keyName: '6' },
      { code: 'Numpad1', keyName: '1' },
      { code: 'Numpad2', keyName: '2' },
      { code: 'Numpad3', keyName: '3' },
      { code: 'Numpad0', keyName: '0', style: { width: 80 } },
      { code: 'NumpadDecimal', keyName: '.' },
      { code: 'NumpadAdd', keyName: '+', style: { height: 86 } },
      { code: 'NumpadEnter', keyName: 'Enter', style: { height: 86, fontSize: 12 } }
    ],
    [isMacos]
  )

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    console.log(e)

    setActiveKeys((prev) => new Set(prev).add(e.code))
  }

  useEventListener('keydown', handleKeyDown)
  useEventListener('keyup', (e: KeyboardEvent) => {
    // Fix: handle PrintScreen key since it doesn't trigger on keydown
    if (e.code === 'PrintScreen') handleKeyDown(e)
  })

  return (
    <Container className='flex max-w-xl flex-col items-center justify-center'>
      <Title title='Keyboard Tester' />

      {os === 'undetermined' ? null : (
        <div className='my-12 flex items-center justify-center'>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-[45px]'>
                <div className='flex gap-4'>
                  {/* ESC */}
                  {layout.slice(0, 1).map((key) => (
                    <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                  ))}
                </div>
                <div className='flex gap-[14px]'>
                  {/* F1 - F4 */}
                  {layout.slice(1, 5).map((key) => (
                    <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                  ))}
                </div>
                <div className='flex gap-[14px]'>
                  {/* F5 - F8 */}
                  {layout.slice(5, 9).map((key) => (
                    <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                  ))}
                </div>
                <div className='flex gap-[14px]'>
                  {/* F9 - F12 */}
                  {layout.slice(9, 13).map((key) => (
                    <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                  ))}
                </div>
              </div>
              <div className='flex gap-[14px]'>
                {/* ` to backspace */}
                {layout.slice(13, 27).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* Tab to \ */}
                {layout.slice(27, 41).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* Caps Lock to Enter */}
                {layout.slice(41, 54).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* Left shift to Right shift */}
                {layout.slice(54, 66).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* Left CTRL to right CTRL */}
                {layout.slice(66, 73).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
            </div>

            {/* Control section */}
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                {/* Print screen to Pause */}
                {layout.slice(73, 76).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* Insert to Page up */}
                {layout.slice(76, 79).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* Delete to Page down */}
                {layout.slice(79, 82).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='h-[35px]' />
              <div className='flex gap-4'>
                <div className='size-8' />
                {/* Up arrow */}
                {layout.slice(82, 83).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
                <div className='size-8' />
              </div>
              <div className='flex gap-4'>
                {/* Left arrow to right arrow */}
                {layout.slice(83, 86).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
            </div>

            {/* Left of Number pad */}
            <div className='flex flex-col gap-4'>
              <div className='h-[35px]' />
              <div className='flex gap-4'>
                {/* Num Lock to * */}
                {layout.slice(86, 89).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* 7 to 9 */}
                {layout.slice(90, 93).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* 4 to 6 */}
                {layout.slice(93, 96).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* 1 to 3 */}
                {layout.slice(96, 99).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
              <div className='flex gap-4'>
                {/* 0 to . */}
                {layout.slice(99, 101).map((key) => (
                  <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
                ))}
              </div>
            </div>

            {/* Right of Number pad */}
            <div className='flex flex-col gap-4'>
              <div className='h-[35px]' />
              {/* - */}
              {layout.slice(89, 90).map((key) => (
                <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
              ))}
              {/* + */}
              {layout.slice(101, 102).map((key) => (
                <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
              ))}
              {/* Enter */}
              {layout.slice(102, 103).map((key) => (
                <Key key={key.code} item={key} active={activeKeys.has(key.code)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default KeyboardTester
