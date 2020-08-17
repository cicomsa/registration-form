import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Content from './components/Content'

// To implement a dynamic way to write the bellow Routes
const App = () => {
  return (
    <Router>
      <Layout>
        {pathName => (
          <Route
            path={pathName}
            component={Content}
          />
        )}
      </Layout>
    </Router>
  )
}

export default App;
