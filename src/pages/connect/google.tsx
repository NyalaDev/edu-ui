import React from 'react'
import { handleAuthentication } from '../../services/auth'
import Spinner from '../../components/Spinner'

const Google: React.FC = () => {
  handleAuthentication('google')
  return (
    <div className="container section has-text-centered">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="is-size-5">You are about to sign in using google</h1>
          <Spinner />
          <Spinner />
        </div>
      </div>
    </div>
  )
}
export default Google
