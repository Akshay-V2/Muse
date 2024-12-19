import { useState } from 'react';
import '../src/App.css';

import TimeWidget from './components/TimeWidget';
import Switcher from './components/Switcher';
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
            {currentMode === 0  ? <TimeWidget/> : currentMode === 1 ? <Pomodoro/> : null }
            <Switcher onModeChange={handleModeChange}/>
        </div>
        </>
    )
}

export default App
