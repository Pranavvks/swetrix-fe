import React from 'react'
import cx from 'clsx'
import PropTypes from 'prop-types'

const NuxtJS = ({ theme, className }: {
  theme: 'dark' | 'light',
  className?: string,
}): JSX.Element => {
  const cn = cx({
    'fill-white': theme === 'dark',
    'fill-slate-800': theme === 'light',
  })

  return (
    <svg className={className} viewBox='0 0 221 65' fill='none'>
      <title>
        NuxtJS
      </title>
      <path d='M76.333 20.5005H82.8185L96.5631 42.4764V20.5005H102.55V51.6393H96.1087L82.3198 29.7091V51.6393H76.333V20.5005Z' className={cn} />
      <path d='M129.311 51.6393H123.732V48.1611C122.462 50.6089 119.877 51.9871 116.612 51.9871C111.441 51.9871 108.083 48.3393 108.083 43.0894V29.2178H113.662V41.9416C113.662 45.0111 115.568 47.1459 118.425 47.1459C121.555 47.1459 123.732 44.7437 123.732 41.4524V29.2178H129.311V51.6393Z' className={cn} />
      <path d='M148.724 51.2848L143.372 43.811L138.019 51.2848H132.076L140.333 39.5849L132.712 28.8633H138.79L143.372 35.3154L147.906 28.8633H154.031L146.364 39.5849L154.62 51.2848H148.724Z' className={cn} />
      <path d='M165.96 22.4565V29.2173H172.311V33.7999H165.96V44.9302C165.96 45.304 166.111 45.6626 166.381 45.9271C166.65 46.1916 167.015 46.3405 167.397 46.3411H172.311V51.6302H168.636C163.646 51.6302 160.381 48.7824 160.381 43.8042V33.8043H155.891V29.2173H158.708C160.022 29.2173 160.787 28.45 160.787 27.1804V22.4565H165.96Z' className={cn} />
      <path d='M186.374 44.5872V20.5005H192.359V42.7416C192.359 48.748 189.411 51.6393 184.422 51.6393H177.455V46.3502H184.577C185.053 46.3502 185.511 46.1645 185.848 45.8339C186.185 45.5032 186.374 45.0548 186.374 44.5872' className={cn} />
      <path d='M195.945 41.1847H201.708C202.027 44.6629 204.386 46.8781 208.196 46.8781C211.598 46.8781 213.959 45.5455 213.959 42.7869C213.959 36.113 196.892 40.739 196.892 28.8174C196.896 23.7023 201.387 20.1479 207.839 20.1479C214.553 20.1479 219.088 23.9283 219.365 29.7565H213.633C213.363 27.0435 211.195 25.2196 207.828 25.2196C204.698 25.2196 202.748 26.6435 202.748 28.8218C202.748 35.7174 220.037 30.5609 220.037 42.7021C220.037 48.4846 215.182 51.9998 208.198 51.9998C200.986 51.9998 196.269 47.7281 195.952 41.189' className={cn} />
      <path fillRule='evenodd' clipRule='evenodd' d='M29.7513 14.261C28.0767 11.3817 23.8903 11.3817 22.2157 14.261L3.96535 45.641C2.29077 48.5204 4.38399 52.1195 7.73316 52.1195H21.9804C20.5493 50.8688 20.0193 48.7051 21.1023 46.8487L34.9243 23.1556L29.7513 14.261Z' fill='#80EEC0' />
      <path d='M41.3151 21.1443C42.701 18.7885 46.1656 18.7885 47.5515 21.1443L62.6552 46.8188C64.0411 49.1746 62.3088 52.1194 59.537 52.1194H29.3296C26.5579 52.1194 24.8255 49.1746 26.2114 46.8188L41.3151 21.1443Z' fill='#00DC82' />
    </svg>
  )
}

NuxtJS.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string.isRequired,
}

NuxtJS.defaultProps = {
  className: '',
}

export default NuxtJS
