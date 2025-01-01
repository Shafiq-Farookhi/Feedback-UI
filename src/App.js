import { v4 as uuid4 } from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import About from './pages/About';
import AboutIcon from './components/AboutIcon';
import { FeedbackProvider } from './context/FeedbackContext';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuid4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  return (
    <FeedbackProvider>
    <Router>
    <Header />
    <div className='container'>
      <Routes>
        <Route exact path='/' element={
          <>
          <FeedbackForm handleAdd={addFeedback}/>
          <FeedbackStats />
          <FeedbackList handleDelete={deleteFeedback}/>
          </>
        }>
          </Route>
      <Route path='/about' element={<About />}></Route>
      </Routes>
    </div>  
    <AboutIcon />
    </Router>
    </FeedbackProvider>
  )
}

export default App;
