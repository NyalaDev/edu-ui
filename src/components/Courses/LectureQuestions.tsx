import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { orderBy } from 'lodash'
import { addQuestion, getQuestions } from '../../services/api'
import { Question } from '../../types/api.types'
import LectureQuestion from './LectureQuestion'

type Props = {
  questions: Question[]
  isLoggedIn: boolean
  lectureId: number
}

const LectureQuestions: React.FC<Props> = ({
  questions,
  isLoggedIn,
  lectureId,
}) => {
  const { t } = useTranslation()
  const [questionInput, setQuestionInput] = useState('')
  const [questionsList, setQuestionList] = useState(questions)

  const updateQuestionsList = data => {
    setQuestionList(data)
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
      toast.success('Question submitted successfully')
    } catch (err) {
      const message = err.message.match(/(403|400)/)
        ? 'errors.invalid_auth'
        : 'errors.generic'
      toast.error(t(message))
    }
  }

  return (
    <div>
      <h3>Questions</h3>
      {isLoggedIn && (
        <div>
          <input
            type="text"
            className="px-2 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
            placeholder="Your Question"
            value={questionInput}
            onChange={e => setQuestionInput(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      {questionsList.map(question => (
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
