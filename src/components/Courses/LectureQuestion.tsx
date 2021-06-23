import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { GoTriangleLeft } from 'react-icons/go'
import { Question } from '../../types/api.types'
import { updateQuestion, getQuestions } from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'

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
  const {
    id,
    text,
    replies,
    user: { profile = {} },
  } = question
  const { currentUser } = useContext(AuthContext)
  const replier = { ...currentUser }

  const [replyInput, setReplyInput] = useState('')

  const handleSubmit = async () => {
    try {
      await updateQuestion(id, {
        replies: [
          { reply: replyInput, user: replier.profile || {} },
          ...replies,
        ],
      })
      const data = await getQuestions()
      updateQuestionsList(data)
      setReplyInput('')
      toast.success('Reply submitted successfully')
    } catch (err) {
      const message = err.message.match(/(403|400)/)
        ? 'errors.invalid_auth'
        : 'errors.generic'
      toast.error(t(message))
    }
  }

  return (
    <div className="mx-5 my-5">
      <div className="flex">
        <div className="h-20 w-20 bg-brmg-primary mr-1" />

        <GoTriangleLeft size={30} className="text-brmg-text mt-2" />

        <div className="bg-white px-3 h-20 flex-grow">
          <div className="text-brmg-primary font-bold border-b-4">
            {profile.name}
          </div>
          <div>{text}</div>
        </div>
      </div>

      <div className="ml-28 my-2">
        {isLoggedIn && (
          <div className="flex mb-3 ml-28">
            <input
              type="text"
              className="mr-3 px-2 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
              placeholder="Your Reply"
              value={replyInput}
              onChange={e => setReplyInput(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-brmg-secondary hover:bg-brmg-primary text-white font-bold py-2 px-4 rounded"
            >
              {t('addReply')}
            </button>
          </div>
        )}
        {replies.map(reply => (
          <div className="flex my-2">
            <div className="h-20 w-20 bg-brmg-primary mr-1" />

            <GoTriangleLeft size={30} className="text-brmg-text mt-2" />

            <div className="bg-white px-3 h-20 flex-grow">
              <div className="text-brmg-primary font-bold border-b-4">
                {reply.user.name}
              </div>
              <div>{reply.reply}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LectureQuestions
