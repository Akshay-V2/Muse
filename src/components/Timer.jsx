import React, { useState, useEffect, useRef } from 'react';
import { ClockClockwise, Play, Pause, ArrowFatLinesLeft, ArrowFatLinesRight } from "@phosphor-icons/react";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const Timer = () => {
    const [time, setTime] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    let bellDing = new Audio('/sounds/bellding.mp3');
    let switchModeSound = new Audio('/sounds/switchMode.wav');

    useEffect(() => {
        if (isActive && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        setIsActive(false);
                        setTime(1500); // Reset to 25 minutes
                        bellDing.play();
                        confetti();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if ((!isActive && intervalRef.current) || time === 0) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, time]);

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

    const modes = ['WORK', 'BREAK', 'LONG BREAK'];
    const [modeIndex, setModeIndex] = useState(0);
    const [mode, setMode] = useState("WORK");

    const changeModePositive = () => {
        setModeIndex((prevIndex) => (prevIndex + 1) % modes.length);
    }

    const changeModeNegative = () => {
        setModeIndex((prevIndex) => (prevIndex - 1 + modes.length) % modes.length);
    }

    useEffect(() => {
        setMode(modes[modeIndex]);
        switch (modeIndex) {
            case 0:
                setTime(1500); // 25 minutes
                setIsActive(false);
                break;
            case 1:
                setTime(300); // 5 minutes
                setIsActive(false);
                break;
            case 2:
                setTime(900); // 15 minutes
                setIsActive(false);
                break;
            default:
                setTime(1500); // 25 minutes
                setIsActive(false);
        }
        switchModeSound.play();
    },[modeIndex]);

    return (
        <>
        <div className='pomodoro'>
            <div className='timer-mode-card'>
                <ArrowFatLinesLeft size={40} weight="fill" className='timer-mode-icon' onClick={changeModeNegative}/>
                <div className='timer-mode-indicator unselectable'>{modes[modeIndex]}</div>
                <ArrowFatLinesRight size={40} weight="fill" className='timer-mode-icon' onClick={changeModePositive}/>
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