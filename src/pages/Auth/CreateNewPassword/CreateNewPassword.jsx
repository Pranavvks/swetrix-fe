import React, { useState, useEffect, memo } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { createNewPassword } from 'api'
import Title from 'components/Title'
import routes from 'routes'
import Input from 'ui/Input'
import Button from 'ui/Button'
import { isValidPassword } from 'utils/validator'

const CreateNewPassword = ({
  createNewPasswordFailed, newPassword,
}) => {
  const history = useHistory()
  const { id } = useParams()
  const [form, setForm] = useState({
    password: '',
    repeat: '',
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [beenSubmitted, setBeenSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    validate()
  }, [form]) // eslint-disable-line

  const onSubmit = async (data) => {
    if (!isLoading) {
      setIsLoading(true)
      try {
        const { password } = data
        await createNewPassword(id, password)
  
        newPassword('Your password has been updated')
        history.push(routes.signin)
      } catch (e) {
        createNewPasswordFailed(e.toString())
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInput = event => {
    const t = event.target
    const value = t.type === 'checkbox' ? t.checked : t.value

    setForm(form => ({
      ...form,
      [t.name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    setBeenSubmitted(true)

    if (validated) {
      onSubmit(form)
    }
  }

  const validate = () => {
    const allErrors = {}

    if (!isValidPassword(form.password)) {
      allErrors.password = 'The password has to consist of at least 8 characters.'
    }

    if (form.password !== form.repeat || form.repeat === '') {
      allErrors.repeat = 'Passwords have to match.'
    }

    const valid = Object.keys(allErrors).length === 0

    setErrors(allErrors)
    setValidated(valid)
  }

  return (
    <Title title='Account recovery'>
      <div className='min-h-page bg-gray-50 flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
        <form className='max-w-7xl w-full mx-auto' onSubmit={handleSubmit}>
          <h2 className='mt-2 text-3xl font-extrabold text-gray-900'>
            Account recovery
        </h2>
          <Input
            name='password'
            id='password'
            type='password'
            label='Your new password'
            hint='Longer than 8 chars'
            value={form.password}
            placeholder='Password'
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted && errors.password}
          />
          <Input
            name='repeat'
            id='repeat'
            type='password'
            label='Repeat password'
            value={form.password}
            placeholder='Password'
            className='mt-4'
            onChange={handleInput}
            error={beenSubmitted && errors.repeat}
          />
          <div className='flex justify-between mt-3'>
            <Link to={routes.signin} className='underline text-blue-600 hover:text-indigo-800'>
              Sign in instead
            </Link>
            <Button type='submit' loading={isLoading} primary large>
              Save new password
            </Button>
          </div>
        </form>
      </div>
    </Title>
  )
}

export default memo(CreateNewPassword)
