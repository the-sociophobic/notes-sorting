import { useState } from 'react'

import Text from './components/Text'

import './assets/styles/index.sass'
import Input from './components/Input'


function App() {
  const [lineIndex, setLineIndex] = useState(1)
  const [text, setText] = useState('')
  const [wordsText, setWordsText] = useState('')
  const paragraphs = text
    .split(/(\r?\n){2,}/g)
    .filter(paragraph => paragraph.length > 0 && paragraph !== '\n')
  console.log(paragraphs)
  const words = wordsText.split(',').filter(word => word.length > 0)

  const res = paragraphs.filter(paragraph =>
    !words.some(word =>
      paragraphMatch(paragraph, word, lineIndex)))
    .join('\n\n')

  const wordsParagraphs = words.map(word => {
    const wordParagraphs = paragraphs.filter(paragraph =>
      paragraphMatch(paragraph, word, lineIndex))

    return {
      word,
      paragraph: wordParagraphs.join('\n\n')
    }
  })
    .filter(({ paragraph }) => paragraph.length > 0)

  return (
    <div className='container'>
      <h3 className='h3'>
        Вход
      </h3>
      <div className='d-flex flex-row'>
        <Input
          type='number'
          value={lineIndex}
          onChange={setLineIndex}
          label='номер строки'
        />
      </div>
      <Text
        header='Исходный текст'
        opened
        value={text}
        onChange={setText}
        className='mb-1'
      />
      <Text
        header='Слова черех запятую без пробелов'
        opened
        value={wordsText}
        onChange={setWordsText}
        className={'mb-4'}
        minHeight={70}
      />

      <h3 className='h3'>
        Выход
      </h3>
      {(text.length > 0 && wordsText.length > 0 && wordsParagraphs.length > 0) ? (
        <>
          {res.length > 0 ?
            <Text
              header='Почищенный текст'
              copy
              value={res}
              className={'mb-4'}
            />
            :
            <div className='my-3'>
              В конечном тексте не осталось параграфов
            </div>
          }
          {wordsParagraphs.map(({ word, paragraph }) =>
            <Text
              header={`Слово «${word}»`}
              copy
              value={paragraph}
              className={'mb-1'}
            />
          )}
        </>
      )
        :
        'Совпадений не найдено. Текст не изменился'
      }
    </div>
  )
}

export default App


const lineMatch = (line: string, word: string) => {
  const wordModified = word.toLowerCase().replace('с', 'c')
  let lineModified = line.toLowerCase().replace('с', 'c')

  while (lineModified.startsWith(' ')) {
    lineModified = lineModified.slice(1)
  }

  return lineModified.startsWith(wordModified + ' ')
  || lineModified.startsWith(wordModified + '\n')
  || lineModified === wordModified
}
  
const paragraphMatch = (
  paragraph: string,
  word: string,
  lineIndex: number
) => {
  const lines = paragraph.split('\n')
  const line = lines[lineIndex - 1]

  if (!line)
    return false

  return lineMatch(line, word)
}
