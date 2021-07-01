import React from 'react'
import { handleAuthentication } from '../../services/auth'
import Spinner from '../../components/General/Spinner'

const Google: React.FC = () => {
  handleAuthentication('google')
  return (
    <div className="container section has-text-centered">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="is-size-5">You are about to sign in using google</div>
          <Spinner />
          <Spinner />
        </div>
      </div>
    </div>
  )
}
export default Google
