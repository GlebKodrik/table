import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';

import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Theme
        preset={presetGpnDefault}
        id="theme"
      >
        <App />
      </Theme>
    </DndProvider>
  </React.StrictMode>,
);
