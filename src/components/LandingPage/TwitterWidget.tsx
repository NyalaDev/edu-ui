import React, { useState } from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const TwitterWidget: React.FC = () => {
  const arr = [
    '1393942312812691461',
    '1394964427074646020',
    '1386625779577106433',
    '1393679448600363016',
    '1393623123443036165',
  ]
  const [firstTweetId, setFirstTweetId] = useState(0)
  const [secondTweetId, setSecondTweetId] = useState(1)

  const totalTweets = arr.length

  const nextTweet = () => {
    setFirstTweetId(secondTweetId)
    if (secondTweetId >= totalTweets - 1) {
      setSecondTweetId(0)
    } else {
      setSecondTweetId(secondTweetId + 1)
    }
  }

  const previousTweet = () => {
    setSecondTweetId(firstTweetId)
    if (firstTweetId === 0) {
      setFirstTweetId(totalTweets - 1)
    } else {
      setFirstTweetId(firstTweetId - 1)
    }
  }

  return (
    <div className="flex items-center justify-around h-auto p-36">
      <button
        type="button"
        className="m-3 rounded-full h-12 w-12 border shadow-lg"
        onClick={previousTweet}
      >
        {'<'}
      </button>
      {arr.map(
        (tweetId, index) =>
          index === firstTweetId && (
            <div className="flex justify-center space-x-10 w-3/4">
              <TwitterTweetEmbed
                tweetId={arr[firstTweetId]}
                placeholder="Loading Tweet/"
                options={{ width: 550, cards: 'hidden' }}
              />
              <TwitterTweetEmbed
                tweetId={arr[secondTweetId]}
                placeholder="Loading Tweet"
                options={{ width: 400, cards: 'hidden' }}
              />
            </div>
          )
      )}
      <button
        type="button"
        className="m-3 rounded-full h-12 w-12 border shadow-lg"
        onClick={nextTweet}
      >
        {'>'}
      </button>
    </div>
  )
}

export default TwitterWidget
