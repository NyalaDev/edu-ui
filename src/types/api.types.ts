export type User = {
  id: number
  email: string
  provider: 'local' | 'github'
  role: UserRole
  profile: Profile
}

export type Profile = {
  id: number
  name: string | null
  bio: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
  user: User
  profilepicture: {
    url: string
  }
}

export type UserSigninData = {
  identifier: string
  password: string
}

export type UserSigninResponse = {
  jwt: string
  user: User
}

export type UserSignupData = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  emailSubscription: boolean
  language: string
}

export type UserSignupResponse = UserSigninResponse

export type UserForgotPasswordData = {
  email: string
}

export type CourseRating = {
  courseId: number
  rating: number
  text: string
  lectureId: number
}
export type UserResetPasswordData = {
  password: string
  passwordConfirmation: string
}

export type UserPrToReviewData = {
  course: number
  link: string
  exercise: string
}

export type AppLocale = 'en' | 'ar' | 'am' | 'sw'

type CourseStatus = 'Published' | 'Draft' | 'Upcoming'

type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'

type ResourceType = 'link' | 'exercise'

type UserRole = {
  name: string
  type: string
}

export type UserSubscribeToMailingList = {
  email: string
  LANGUAGE: AppLocale
}

export type Tag = {
  id: number
  tagName: string
  tagSlug: string
}

export type LanguageResponse = {
  id: number
  iso2: string
  name: string
}

export type Resource = {
  url?: string
  text: string
  type: ResourceType
}

export type Lecture = {
  id: number
  title: string
  description?: string
  url: string
  duration: string
  position: number
  slug: string
  created_at: string
}

export type Course = {
  id: string
  strapiId: number
  title: string
  level: CourseLevel
  slug: string
  status: CourseStatus
  description: string
  github_repo: string
  instructor: User
  lectures: Lecture[]
  language: LanguageResponse
  tags: Tag[]
  resources: Resource[]
  price: number
  thumbnail: string | null
}
