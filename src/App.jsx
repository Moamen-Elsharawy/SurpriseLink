import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SoundProvider } from './hooks/useSoundContext';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/layout/Layout';
import CreateInvitationPage from './features/create-invite/CreateInvitationPage';
import ViewInvitationPage from './features/view-invite/ViewInvitationPage';

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<CreateInvitationPage />} />
              <Route path="/invite/:id" element={<ViewInvitationPage />} />
            </Routes>
          </Layout>
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
