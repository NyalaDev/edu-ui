import React, { useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { AiOutlineTwitter } from 'react-icons/ai'
import Button from '../General/Button'

const TwitterWidget: React.FC = () => {
  const { t } = useTranslation()

  const tweets = [
    '1393942312812691461',
    '1394964427074646020',
    '1386625779577106433',
    '1393679448600363016',
    '1393623123443036165',
  ]
  const [carouselPosition, setCarouselPosition] = useState(0)

  const tweetsPerSlide = 1
  const totalSlides = Math.ceil(tweets.length / tweetsPerSlide)

  const nextTweets = () => {
    if (carouselPosition === totalSlides - 1) return
    setCarouselPosition(carouselPosition + 1)
  }

  const previousTweets = () => {
    if (carouselPosition === 0) return
    setCarouselPosition(carouselPosition - 1)
  }

  const getTweetsToShow = () => {
    const tweetCards: React.ReactElement[] = []
    const position = carouselPosition * tweetsPerSlide
    const finalPosition =
      position + tweetsPerSlide > tweets.length
        ? tweets.length
        : position + tweetsPerSlide
    for (let i = position; i < finalPosition; i += 1) {
      tweetCards.push(
        <TwitterTweetEmbed
          key={tweets[i]}
          tweetId={tweets[i]}
          placeholder="Loading"
          options={{ width: 5000, cards: 'hidden' }}
        />
      )
    }
    return tweetCards
  }
  return (
    <div>
      <div
        className="flex items-center justify-around pt-8 md:pt-32 pb-8 md:mb-16"
        style={{ height: '460px' }}
      >
        <button
          type="button"
          className="m-3 rounded-full h-12 w-12 border shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={previousTweets}
          disabled={carouselPosition === 0}
        >
          {'<'}
        </button>
        {getTweetsToShow()}
        <button
          type="button"
          className="m-3 rounded-full h-12 w-12 border shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={nextTweets}
          disabled={carouselPosition === totalSlides - 1}
        >
          {'>'}
        </button>
      </div>

      <div className="flex justify-center mb-12 md:mb-32">
        <div>
          <Button
            link
            mode="info"
            href="https://twitter.com/BarmagaIO"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineTwitter size="32" className="ml-2" />
            {t('landingPage.followOnTwitter')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TwitterWidget
