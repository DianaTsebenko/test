import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Phonebook from 'components/Phonebook/Phonebook';
import ImageSearch from 'components/ImageSearch/ImageSearch';
import FeedbackWidget from 'components/Feedback/Feedback';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/feedbacks">Feedback Widget</Link>
          </li>
          <li>
            <Link to="/phonebook">Phonebook</Link>
          </li>
          <li>
            <Link to="/imagesearch">Image Search</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/feedbacks" element={<FeedbackWidget />} />
        <Route path="/phonebook" element={<Phonebook />} />
        <Route path="/imagesearch" element={<ImageSearch />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
