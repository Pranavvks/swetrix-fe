import React, { useEffect } from 'react'
import { useLocation, Outlet } from '@remix-run/react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
// @ts-ignore
import { useAlert } from '@blaumaus/react-alert'
import _some from 'lodash/some'
import _includes from 'lodash/includes'
import _startsWith from 'lodash/startsWith'
import _endsWith from 'lodash/endsWith'
import 'dayjs/locale/ru'
import 'dayjs/locale/uk'

import Header from 'components/Header'
import Footer from 'components/Footer'

import { getAccessToken } from 'utils/accessToken'
import { authActions } from 'redux/reducers/auth'
import sagaActions from 'redux/sagas/actions'
import { errorsActions } from 'redux/reducers/errors'
import { alertsActions } from 'redux/reducers/alerts'
import { StateType, useAppDispatch } from 'redux/store'
import { isBrowser } from 'redux/constants'
import routesPath from 'routesPath'
import { getPageMeta } from 'utils/server'
import { authMe } from './api'

const minimalFooterPages = [
  '/projects', '/dashboard', '/settings', '/contact',
]

interface IApp {
  ssrTheme: 'dark' | 'light'
  ssrAuthenticated: boolean
}

const TITLE_BLACKLIST = [
  '/projects/', '/captchas/',
]

const App: React.FC<IApp> = ({ ssrTheme, ssrAuthenticated }) => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const { t } = useTranslation('common')
  const alert = useAlert()
  const {
    loading,
  } = useSelector((state: StateType) => state.auth)
  const reduxAuthenticated = useSelector((state: StateType) => state.auth.authenticated)
  const { error } = useSelector((state: StateType) => state.errors)
  const { message, type } = useSelector((state: StateType) => state.alerts)
  const accessToken = getAccessToken()
  const authenticated = isBrowser
    ? (loading ? !!accessToken : reduxAuthenticated)
    : ssrAuthenticated

  useEffect(() => {
    (async () => {
      if (accessToken && !reduxAuthenticated) {
        try {
          const me = await authMe()
          dispatch(authActions.loginSuccessful(me))
        } catch (e) {
          dispatch(authActions.logout())
          dispatch(sagaActions.logout(false, false))
        }
      }

      dispatch(authActions.finishLoading())
    })()
  }, [reduxAuthenticated]) // eslint-disable-line

  useEffect(() => {
    if (error) {
      alert.error(error.toString(), {
        onClose: () => {
          dispatch(errorsActions.clearErrors())
        },
      })
    }
  }, [error]) // eslint-disable-line

  useEffect(() => {
    if (message && type) {
      alert.show(message.toString(), {
        type,
        onClose: () => {
          dispatch(alertsActions.clearAlerts())
        },
      })
    }
  }, [message, type]) // eslint-disable-line

  useEffect(() => {
    if (_some(TITLE_BLACKLIST, (page) => _includes(pathname, page))) {
      return
    }

    const { title } = getPageMeta(t, undefined, pathname)
    document.title = title
  }, [t, pathname])

  const isMinimalFooter = _some(minimalFooterPages, (page) => _includes(pathname, page))

  const isReferralPage = _startsWith(pathname, '/ref/')
  const isProjectViewPage = _startsWith(pathname, '/projects/')
    && !_endsWith(pathname, '/new')
    && !_endsWith(pathname, '/subscribers/invite')
    && !_endsWith(pathname, '/subscribers/invite')
    && !_endsWith(pathname, '/password')
    && !_includes(pathname, '/alerts/')
    && !_includes(pathname, '/settings/')

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {pathname !== routesPath.main && !isReferralPage && !isProjectViewPage && (
        <Header ssrTheme={ssrTheme} authenticated={authenticated} />
      )}
      <Outlet />
      {!isReferralPage && !isProjectViewPage && (
        <Footer minimal={isMinimalFooter} authenticated={authenticated} />
      )}
    </>
  )
}

export default App
