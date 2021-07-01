import React from 'react'
import { handleAuthentication } from '../../services/auth'
import Spinner from '../../components/General/Spinner'
import useLanguage from '../../hooks/useLanguage'

const Github: React.FC = () => {
  const { language } = useLanguage()
  handleAuthentication('github', language)
  return (
    <div className="container section has-text-centered">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="is-size-5">You are about to sign in using Github</div>
          <Spinner />
        </div>
      </div>
    </div>
  )
}
export default Github
