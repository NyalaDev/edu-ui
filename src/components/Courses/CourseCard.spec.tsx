import React from 'react'
import CourseCard from './CourseCard'
import {
  render,
  getByText,
  fireEvent,
  waitFor,
  screen
} from '@testing-library/react'
import { Course } from '../../types/api.types'

describe('CourseCard', () => {
  let course: Course
  beforeEach(() => {
    course = {
      id: 'Course_135',
      title: 'Build Multiplayer Tic Tac Toe',
      description: '<p>تعلم كيفية بناء لعبة Tic Tac Toe online&nbsp;</p>',
      slug: 'build-multiplayer-tic-tac-toe',
      status: 'Published',
      tags: [{ tagName: 'React' }],
      lectures: [
        { slug: 'part-1', url: 'https://www.youtube.com/watch?v=0zKlQtUeXic' },
        { slug: 'part-2', url: 'https://www.youtube.com/watch?v=XgyZ2iSHtGc' },
        { slug: 'part-3', url: 'https://www.youtube.com/watch?v=Kt7T1u_OcNk' },
        { slug: 'part-4', url: 'https://www.youtube.com/watch?v=TDHdTr4uKqw' }
      ],
      language: { id: 51, name: 'Arabic', iso2: 'ar' }
    } as Course
    const props = {
      course,
      image: 'http://image.png'
      // lectureId?: number
      // courseViewMode?: boolean
      // isCourseInProgress?: boolean
      // showTags?: boolean
      // lectureToPlayNext?: Lecture
    }
    render(<CourseCard {...props} />)
  })
  it('should render the course title', () => {
    expect(screen.getByText(course.title)).toBeDefined()
  })
  it('should render the course title', () => {
    expect(screen.getByText(course.title)).toBeDefined()
  })
})
