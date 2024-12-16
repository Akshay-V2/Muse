import React from 'react';
import '../src/App.css';

import TimeWidget from './components/TimeWidget';
import Switcher from './components/switcher';

function App() {
    return (
        <>
        <div className='bg-frame'>
            <TimeWidget/>
            <Switcher/>
        </div>
        </>
    )
}

export default App
