import React from 'react';
import { ThemeProvider } from '@livechat/ui-kit';
import Chat from './components/chat';


const App = () => (
  <ThemeProvider>
    <Chat />
  </ThemeProvider>
);

export default App;
