import React from 'react'

const NoSharedProjects = ({ t }: {
  t: (key: string) => string,
}): JSX.Element => (
  <div className='flex flex-col py-6 sm:px-6 lg:px-8'>
    <div className='max-w-7xl w-full mx-auto text-gray-900 dark:text-gray-50'>
      <h2 className='text-2xl mb-4 text-center leading-snug'>
        {t('profileSettings.noSharedProjects')}
      </h2>
    </div>
  </div>
)

export default NoSharedProjects
