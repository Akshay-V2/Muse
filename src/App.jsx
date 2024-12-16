import { useState } from 'react';
import '../src/App.css';

import TimeWidget from './components/TimeWidget';
import Switcher from './components/switcher';
import Pomodoro from './components/Pomodoro';

function App() {
    const [currentMode, setCurrentMode] = useState(0);

    const handleModeChange = (newMode) => {
        if (newMode != null) {
            setCurrentMode(newMode);
        }
    }

    return (
        <>
        <div className='bg-frame'>
            {currentMode === 0  ? <Pomodoro/> : currentMode === 1 ? <TimeWidget/> : null }
            <Switcher onModeChange={handleModeChange}/>
        </div>
        </>
    )
}

export default App
