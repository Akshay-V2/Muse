import React, { useState, useEffect, useRef } from 'react';
import { ClockClockwise, Play, Pause, ArrowFatLinesLeft, ArrowFatLinesRight } from "@phosphor-icons/react";

const Timer = () => {
    const [time, setTime] = useState(1500); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (!isActive && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    const handlePlayPauseClick = () => {
        setIsActive(!isActive);
    };

    const handleResetClick = () => {
        setIsActive(false);
        setTime(1500); // Reset to 25 minutes
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
        <div className='pomodoro'>
            <div className='timer-mode-card'>
                <ArrowFatLinesLeft size={40} weight="fill" className='timer-mode-icon'/>
                <div className='timer-mode-indicator'>WORK</div>
                <ArrowFatLinesRight size={40} weight="fill" className='timer-mode-icon'/>
            </div>

            <div className='timer-card'>
                <div className='timer-decor'/>
                <div className='timer-decor'/>
                <div className='timer-text unselectable'>{formatTime(time)}</div>
            </div>

            <div className='timer-button-container'>
                <div className='timer-button' onClick={handlePlayPauseClick}>
                    {isActive ? (
                        <Pause size={40} weight="fill" className='timer-button-icon'/>
                    ) : (
                        <Play size={40} weight="fill" className='timer-button-icon'/>
                    )}
                </div>
                <div className='timer-button' onClick={handleResetClick}>
                    <ClockClockwise size={40} weight="fill" className='timer-button-icon'/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Timer;