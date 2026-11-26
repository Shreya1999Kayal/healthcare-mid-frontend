
import React from 'react'

import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Toaster } from 'sonner'
import theme from './theme/public.theme'
import Routes from './routes/PublicRoutes'



function App() {

  return (
    <React.Fragment>

      <ThemeProvider theme={theme}>
         <CssBaseline/>  {/*resets browser default styles //to convert mui to normal css */}
      
      <Toaster richColors position="top-center" />
      <RouterProvider router={Routes}/>

      </ThemeProvider>

    </React.Fragment>

  )
}

export default App

