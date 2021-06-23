import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { addQuestion, getQuestions } from '../../services/api'
import { Question } from '../../types/api.types'
import LectureQuestion from './LectureQuestion'

type Props = {
  isLoggedIn: boolean
  lectureId: number
}

const LectureQuestions: React.FC<Props> = ({ isLoggedIn, lectureId }) => {
  const { t } = useTranslation()

  const [questions, setQuestions] = useState<Question[]>([])
  const [questionInput, setQuestionInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions()
        setQuestions(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const updateQuestionsList = data => {
    setQuestions(data)
  }

  const handleSubmit = async () => {
    try {
      await addQuestion({
        text: questionInput,
        replies: [],
        lecture: lectureId,
      })
      const data = await getQuestions()
      updateQuestionsList(data)
      setQuestionInput('')
      toast.success('Question submitted successfully')
    } catch (err) {
      const message = err.message.match(/(403|400)/)
        ? 'errors.invalid_auth'
        : 'errors.generic'
      toast.error(t(message))
    }
  }

  return (
    <div className="bg-gray-300">
      <div className="text-3xl mb-5 ml-2">{t('questions')}</div>
      {isLoggedIn && (
        <div className="flex mb-3">
          <input
            type="text"
            className="p-2 mx-3 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
            placeholder="Your Question"
            value={questionInput}
            onChange={e => setQuestionInput(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-brmg-secondary hover:bg-brmg-primary text-white font-bold py-2 px-4 rounded"
          >
            {t('addQuestion')}
          </button>
        </div>
      )}
      {questions.map(question => (
        <LectureQuestion
          question={question}
          isLoggedIn={isLoggedIn}
          updateQuestionsList={updateQuestionsList}
        />
      ))}
    </div>
  )
}

export default LectureQuestions
