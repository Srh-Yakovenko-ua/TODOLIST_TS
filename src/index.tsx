import React from 'react';
import './index.css';
// @ts-ignore
import {createRoot} from 'react-dom/client';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import AppWithRedux from './AppWithRedux';
import {store} from './state/store';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<Provider store={store}>
    <AppWithRedux/>
</Provider>);



serviceWorker.unregister();
