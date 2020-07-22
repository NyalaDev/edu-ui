import { withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export default withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    url: Yup.string().url().required(),
    course: Yup.number().min(1).required(),
  }),
  mapPropsToValues: () => {
    return {
      title: '',
      description: '',
      url: '',
      course: '',
    }
  },
  handleSubmit: async (values, bag) => {
    try {
      const { data } = await axios.post(
        `${process.env.GATSBY_STRAPI_API_URL}/lectures`,
        values
      )
      console.log(data)
      alert('Saved')
      bag.resetForm()
    } catch (e) {
      bag.setSubmitting(false)
      alert('Opps, Failed to save. Check console log')
      console.error(e)
    }
  },
})
