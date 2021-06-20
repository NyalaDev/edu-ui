import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Question } from '../../types/api.types'
import { updateQuestion, getQuestions } from '../../services/api'

type Props = {
  question: Question
  isLoggedIn: boolean
  updateQuestionsList: (data: Question[]) => void
}

const LectureQuestions: React.FC<Props> = ({
  question,
  isLoggedIn,
  updateQuestionsList,
}) => {
  const { t } = useTranslation()
  const { id, text, replies } = question

  const [replyInput, setReplyInput] = useState('')

  const handleSubmit = async () => {
    try {
      await updateQuestion(id, {
        replies: [{ reply: replyInput }, ...replies],
      })
      const data = await getQuestions()
      updateQuestionsList(data)
      toast.success('Reply submitted successfully')
    } catch (err) {
      const message = err.message.match(/(403|400)/)
        ? 'errors.invalid_auth'
        : 'errors.generic'
      toast.error(t(message))
    }
  }

  return (
    <div>
      <div>{text}</div>

      <div className="ml-10">
        {isLoggedIn && (
          <div>
            <input
              type="text"
              className="px-2 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
              placeholder="Your Reply"
              value={replyInput}
              onChange={e => setReplyInput(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
        {replies.map(reply => (
          <div>{reply.reply}</div>
        ))}
      </div>
    </div>
  )
}

export default LectureQuestions
