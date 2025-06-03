import { useState } from 'react'

import Text from './components/Text'

import './assets/styles/index.sass'


function App() {
  const [text, setText] = useState('')
  const [wordsText, setWordsText] = useState('')
  const paragraphs = text.split('\n\n')
  const words = wordsText.split(',').filter(word => word.length > 0)

  const res = paragraphs.filter(paragraph =>
    !words.some(word =>
      paragraph.toLowerCase().startsWith(word.toLowerCase())))
    .join('\n\n')

  const wordsParagraphs = words.map(word => {
    const wordParagraphs = paragraphs.filter(paragraph =>
      paragraph.toLowerCase().startsWith(word.toLowerCase()))

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
