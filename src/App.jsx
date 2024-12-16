import { useState } from 'react';
import '../src/App.css';

import TimeWidget from './components/TimeWidget';
import Switcher from './components/switcher';

function App() {
    const [currentMode, setCurrentMode] = useState(0);

    const handleModeChange = (newMode) => {
        setCurrentMode(newMode);
        console.log(newMode);
    }

    return (
        <>
        <div className='bg-frame'>
            {currentMode === 0  ? <TimeWidget/> : '' }
            <Switcher onModeChange={handleModeChange}/>
        </div>
        </>
    )
}

export default App
