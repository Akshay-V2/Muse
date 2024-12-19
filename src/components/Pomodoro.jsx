import { useState, useEffect } from 'react';
import { Play, Pause, PencilSimple, ClockCounterClockwise } from '@phosphor-icons/react';

const Pomodoro = () => {
    const totalTime = 20*60; 
    const [timeRemaining, setTimeRemaining] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsRunning(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    },[isRunning, timeRemaining]);

    const handlePomoClick = () => {
        if (isRunning) {
            if (isFinished) {
                handlePomoReset();
            } else {
                handlePomoPause();
            }
        } else {
            handlePomoStart();
        }
    }

    const handlePomoStart = () => {
        setIsRunning(true);
        setIsFinished(false);
    }

    const handlePomoPause = () => {
        setIsRunning(false);
    }

    const handlePomoReset = () => {
        setTimeRemaining(totalTime);
        setIsRunning(false);
        setIsFinished(false);
    }

    // honestly my brain isnt braining on how the whole pomodoro time management works eventhough i wrote it.

    const formatTime = (time) => {
        let fMins = Math.floor(time / 60);
        let fSecs = time % 60;
        return `${fMins.toString().padStart(2, '0')}:${fSecs.toString().padStart(2, '0')}`;
    }

    return (
        <>
        <div className='pomo-full-holder'>
            <div className='pomo-icon-holder'><PencilSimple size={24} weight="fill" className='pomo-icon' /></div>
            <div className='pomo-text instrument-serif-regular'>{formatTime(timeRemaining)}</div>
            <div className='pomo-icon-holder' onClick={handlePomoClick}>{isRunning ? <Pause size={24} weight="fill" className='pomo-icon'/> : <Play size={24} weight="fill" className='pomo-icon' onClick={handlePomoClick}/>}</div>
            {isRunning ? <div className='pomo-icon-holder' id='reset' onClick={handlePomoReset}><ClockCounterClockwise size={24} weight="fill" className='pomo-icon' id='reset-icon'/></div> : null}
        </div>
        </>
    )
}

export default Pomodoro;