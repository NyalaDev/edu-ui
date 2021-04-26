import { withFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { signUp } from '../../services/api'

export default withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords should match!')
      .required(),
  }),
  mapPropsToValues: () => ({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    emailSubscription: false,
    language: '',
  }),
  handleSubmit: async (values, bag) => {
    try {
      await signUp(values)
      toast.success('Success! You can login now')

      bag.resetForm()
    } catch (e) {
      bag.setSubmitting(false)
      // FIXME: Add proper massage handler
      toast.error('Invalid Username OR Email. Please try again')
    }
  },
})
