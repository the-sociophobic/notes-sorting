import { useState } from 'react'

import Text from './components/Text'

import './assets/styles/index.sass'
import Button from './components/Button'


export type SearchType = 'first' | 'second'


function App() {
  const [searchType, setSearchType] = useState<SearchType>('first')
  const [text, setText] = useState('')
  const [wordsText, setWordsText] = useState('')
  const paragraphs = text.split('\n\n')
  const words = wordsText.split(',').filter(word => word.length > 0)

  const res = paragraphs.filter(paragraph =>
    !words.some(word =>
      paragraphMatch(paragraph, word, searchType)))
    .join('\n\n')

  const wordsParagraphs = words.map(word => {
    const wordParagraphs = paragraphs.filter(paragraph =>
      paragraphMatch(paragraph, word, searchType))

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
        <Button
          black={searchType === 'first'}
          onClick={() => setSearchType('first')}
        >
          Первая строка
        </Button>
        <Button
          black={searchType === 'second'}
          onClick={() => setSearchType('second')}
        >
          Вторая строка
        </Button>
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


const lineMatch = (line: string, word: string) =>
  line.toLowerCase().startsWith(word.toLowerCase() + ' ')
  || line.toLowerCase().startsWith(word.toLowerCase() + '\n')
  || line === word

const paragraphMatch = (
  paragraph: string,
  word: string,
  searchType: SearchType
) => {
  const lines = paragraph.split('\n')

  if (searchType === 'first') {
    return lineMatch(lines[0], word)
  }

  if (searchType === 'second' && lines[1]) {
    return lineMatch(lines[1], word)
  }

  return false
}
