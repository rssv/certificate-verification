import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useState } from 'react'
import AuthActionContext from '../context/authAction'
import { JSX } from 'react'


function MyApp({ Component, pageProps }: AppProps) {
  const app_tate = {
    action: 'Verify Certificate',
    isLoggedIn: false,
    user: {
        username: '',
        name: '',
        role:'',
        access_token: ''
    },
    sideButtons: <></>
  }
  const [appState, setAppState] = useState(app_tate);

  const actionChangeHandler = (newAction: string) => {
    setAppState((prevState) => {
      return {...prevState, action: newAction}
    })
  }

  const loadSideButtons = (newSideButtons: React.JSX.Element) => {
    setAppState((prevState) => {
      return {...prevState, sideButtons: newSideButtons}
    })
  }
  return (
    <AuthActionContext.Provider value={{...appState, onActionChange: actionChangeHandler, changeSideButtons: loadSideButtons}}>
      <Layout sideButtons={appState.sideButtons}>
        <Component {...pageProps} />
      </Layout>
    </AuthActionContext.Provider>
  )
}

export default MyApp
