import { useState } from 'react';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';

const Switcher = (props) => {
    const [mode, setMode] = useState(0);

    const handleSwitch = (direction) => {
        let newMode;
        if (direction == 'fwd' && mode <= 2) {
            newMode = mode + 1;
            setMode(newMode);
        } else if (direction == 'rwd' && mode >= 1) {
            newMode = mode - 1;
            setMode(newMode);
        }

        if (props.onModeChange) {
            props.onModeChange(newMode);
        }
    }

    return (
        <>
        <div className='switcher-icons-holder'>
            <CaretLeft size={24} weight="fill" className='switcher-icons' onClick={() => handleSwitch('rwd')}/>
            <div className='switcher-dots-holder'>
                <div className={mode === 0 ? 'switcher-dots-active' : 'switcher-dots-inactive'}></div>
                <div className={mode === 1 ? 'switcher-dots-active' : 'switcher-dots-inactive'}></div>
                <div className={mode === 2 ? 'switcher-dots-active' : 'switcher-dots-inactive'}></div>
                <div className={mode === 3 ? 'switcher-dots-active' : 'switcher-dots-inactive'}></div>
            </div>
            <CaretRight size={24} weight="fill" className='switcher-icons' onClick={() => handleSwitch('fwd')}/>
        </div>
        </>
    )
}

export default Switcher;