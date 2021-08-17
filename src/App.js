import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from 'routes'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import cx from 'classnames'
import _some from 'lodash/some'
import _includes from 'lodash/includes'

import Header from 'components/Header'
import Footer from 'components/Footer'

import ScrollToTop from 'hoc/ScrollToTop'
import { getAccessToken } from 'utils/accessToken'
import { authMe } from './api'
import { authActions } from 'redux/actions/auth'
import { errorsActions } from 'redux/actions/errors'
import { alertsActions } from 'redux/actions/alerts'

const MainPage = lazy(() => import('pages/MainPage'))
const SignUp = lazy(() => import('pages/Auth/Signup'))
const SignIn = lazy(() => import('pages/Auth/Signin'))
const ForgotPassword = lazy(() => import('pages/Auth/ForgotPassword'))
const CreateNewPassword = lazy(() => import('pages/Auth/CreateNewPassword'))
const Dashboard = lazy(() => import('pages/Dashboard'))
const Docs = lazy(() => import('pages/Docs'))
const Features = lazy(() => import('pages/Features'))
const UserSettings = lazy(() => import('pages/UserSettings'))
const VerifyEmail = lazy(() => import('pages/Auth/VerifyEmail'))
const ProjectSettings = lazy(() => import('pages/Project/Settings'))
const ViewProject = lazy(() => import('pages/Project/View'))
const Billing = lazy(() => import('pages/Billing'))
const Privacy = lazy(() => import('pages/Privacy'))
const Terms = lazy(() => import('pages/Terms'))

const minimalFooterPages = [
  '/projects', '/dashboard', '/settings',
]

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const alert = useAlert()
  const { loading, authenticated } = useSelector(state => state.auth)
  const { error } = useSelector(state => state.errors)
  const { message, type } = useSelector(state => state.alerts)
  const accessToken = getAccessToken()

  useEffect(() => {
    (async () => {
      if (accessToken) {
        try {
          const me = await authMe()

          dispatch(authActions.loginSuccess(me))
          dispatch(authActions.finishLoading())
        } catch (e) {
          dispatch(authActions.logout())
        }
      }
    })()
  }, [dispatch, accessToken])

  useEffect(() => {
    if (error) {
      alert.error(error.toString(), {
        onClose: () => {
          dispatch(errorsActions.clearErrors())
        }
      })
    }
  }, [error]) // eslint-disable-line

  useEffect(() => {
    if (message && type) {
      alert.show(message.toString(), {
        type,
        onClose: () => {
          dispatch(alertsActions.clearAlerts())
        }
      })
    }
  }, [message, type]) // eslint-disable-line

  const isMinimalFooter = _some(minimalFooterPages, (page) => _includes(location.pathname, page))

  return (
    (!accessToken || !loading) && (
      <>
        <Header authenticated={authenticated} />
        <ScrollToTop>
          <Suspense fallback={<div className={cx({ 'min-h-page': !isMinimalFooter, 'min-h-min-footer': isMinimalFooter })} />}>
            <Switch>
              <Route path={routes.main} component={MainPage} exact />
              <Route path={routes.signin} component={SignIn} exact />
              <Route path={routes.signup} component={SignUp} exact />
              <Route path={routes.dashboard} component={Dashboard} exact />
              <Route path={routes.user_settings} component={UserSettings} exact />
              <Route path={routes.verify} component={VerifyEmail} exact />
              <Route path={routes.change_email} component={VerifyEmail} exact />
              <Route path={routes.reset_password} component={ForgotPassword} exact />
              <Route path={routes.new_password_form} component={CreateNewPassword} exact />
              <Route path={routes.new_project} component={ProjectSettings} exact />
              <Route path={routes.project_settings} component={ProjectSettings} exact />
              <Route path={routes.project} component={ViewProject} exact />
              <Route path={routes.billing} component={Billing} exact />
              <Route path={routes.docs} component={Docs} exact />
              <Route path={routes.features} component={Features} exact />
              <Route path={routes.privacy} component={Privacy} exact />
              <Route path={routes.terms} component={Terms} exact />
              <Redirect to={routes.main} />
            </Switch>
          </Suspense>
        </ScrollToTop>
        <Footer minimal={isMinimalFooter} authenticated={authenticated} />
      </>
    )
  )
}

export default App
