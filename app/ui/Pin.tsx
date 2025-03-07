import React from 'react'
import cx from 'clsx'
import PropTypes from 'prop-types'

interface IPin {
  label: string,
  className?: string,
}

const ActivePin = ({ label, className }: IPin): JSX.Element => (
  <p className={cx('px-2 inline-flex text-sm leading-5 font-normal rounded-full bg-green-100 text-green-800 dark:bg-emerald-400 dark:text-green-900', className)}>
    {label}
  </p>
)

const InactivePin = ({ label, className }: IPin): JSX.Element => (
  <p className={cx('px-2 inline-flex text-sm leading-5 font-normal rounded-full bg-red-100 text-red-800 dark:bg-red-300 dark:text-red-900', className)}>
    {label}
  </p>
)

const WarningPin = ({ label, className }: IPin): JSX.Element => (
  <p className={cx('px-2 inline-flex text-sm leading-5 font-normal rounded-full bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900', className)}>
    {label}
  </p>
)

const CustomPin = ({ label, className }: IPin): JSX.Element => (
  <p className={cx('px-2 inline-flex text-sm leading-5 font-normal rounded-full', className)}>
    {label}
  </p>
)

const propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
}

const defaultProps = {
  className: '',
}

ActivePin.propTypes = propTypes
ActivePin.defaultProps = defaultProps

WarningPin.propTypes = propTypes
WarningPin.defaultProps = defaultProps

InactivePin.propTypes = propTypes
InactivePin.defaultProps = defaultProps

CustomPin.propTypes = propTypes
CustomPin.defaultProps = defaultProps

export {
  ActivePin,
  InactivePin,
  WarningPin,
  CustomPin,
}
