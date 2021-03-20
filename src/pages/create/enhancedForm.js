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
  mapPropsToValues: () => ({
    title: '',
    description: '',
    url: '',
    course: '',
  }),
  handleSubmit: async (values, bag) => {
    try {
      await axios.post(`${process.env.GATSBY_STRAPI_API_URL}/lectures`, values)
      bag.resetForm()
    } catch (e) {
      bag.setSubmitting(false)
    }
  },
})
