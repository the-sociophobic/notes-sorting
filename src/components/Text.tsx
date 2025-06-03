import type { FC } from 'react'

import Dropdown from './Dropdown'
import Input from './Input'
import Button from './Button'
import copyToClipboard from '../utils/copyToClipboard'


export type TextProps = {
  header: string
  value: string
  onChange?: (value: string) => void
  opened?: boolean
  copy?: boolean
  className?: string
  minHeight?: number
}


const Text: FC<TextProps> = ({
  header,
  value,
  onChange,
  opened,
  copy,
  className,
  minHeight
}) => {
  return (
    <div className={`d-flex flex-row ${className}`}>
      <div className='flex-grow-1'>
        <Dropdown
          header={header}
          opened={opened}
        >
          <Input
            value={value}
            onChange={onChange}
            className='w-100'
            minHeight={minHeight}
          />
        </Dropdown>
      </div>
      {copy &&
        <Button
          black
          onClick={() => {
            // console.log(value)
            copyToClipboard(value)
          }}
        >
          Скопировать          
        </Button>
      }
    </div>
  )
}


export default Text
