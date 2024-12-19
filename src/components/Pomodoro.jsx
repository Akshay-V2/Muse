import { useState, useEffect } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { Play, Pause, PencilSimple, ClockCounterClockwise, Coffee, Suitcase, Island, CaretUp, CaretDown, CheckFat, ThumbsDown, Tooth, CurrencyEth } from '@phosphor-icons/react';

const Pomodoro = () => {
    const [totalTime, setTotalTime] = useState(20*60);
    const [timeRemaining, setTimeRemaining] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
    const [currentMode, setCurrentMode] = useState("work");

    const [workTime, setWorkTime] = useState(20*60);
    const [breakTime, setbreakTime] = useState(5*60);
    const [breakATime, setbreakATime] = useState(10*60);

    let bellDing = new Audio('./sounds/bellding.mp3');

    useEffect(() => {
        let interval;
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsRunning(false);
                        setIsFinished(true);
                        bellDing.play();
                        confetti();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    },[isRunning, timeRemaining]);
    
    useEffect(() => {
        if (currentMode === "work") {
            setTotalTime(workTime);
        } else if (currentMode === "break") {
            setTotalTime(breakTime);
        } else if (currentMode === "break*") {
            setTotalTime(breakATime);
        }
    },[currentMode, workTime, breakTime, breakATime]);

    useEffect(() => {
        if (workTime < 0) {
            setWorkTime(0);
        } else if (workTime > 3600) {
            setWorkTime(3600);
        }

        if (breakTime < 0) {
            setbreakTime(0);
        } else if (breakTime > 600) {
            setbreakTime(600);
        }

        if (breakATime < 0) {
            setbreakATime(0);
        } else if (breakATime > 1800) {
            setbreakATime(1800);
        }
        
    },[workTime, breakTime, breakATime])

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
        setWorkTime(20*60);
        setbreakTime(5*60);
        setbreakATime(10*60);
    }

    // honestly my brain isnt braining on how the whole pomodoro time management works eventhough i wrote it.

    const formatTime = (time) => {
        let fMins = Math.floor(time / 60);
        let fSecs = time % 60;
        return `${fMins.toString().padStart(2, '0')}:${fSecs.toString().padStart(2, '0')}`;
    }

    const toggleEditMenu = () => {
        if (isEditMenuOpen === false) {
            document.querySelector('.pomo-edit-menu').style.scale = "1";
            handlePomoPause();
            setIsEditMenuOpen(true);
        } else {
            document.querySelector('.pomo-edit-menu').style.scale = "0";
            setIsEditMenuOpen(false);
        }   
    }

    const modeChangeApply = () => {
        handlePomoReset();
        document.querySelector('.pomo-edit-menu').style.scale = "0";
        setIsEditMenuOpen(false);
    }

    const changePomoTime = (modifier) => {
        if (currentMode === "work") {
            setWorkTime(prevTime => prevTime + modifier); 
        } else if (currentMode === "break") {
            setbreakTime(prevTime => prevTime + modifier);
        } else if (currentMode === "break*") {
            setbreakATime(prevTime => prevTime + modifier);
        }
    }

    return (
        <>
        <div className='pomo-full-holder'>
            <div className='pomo-icon-holder' onClick={toggleEditMenu}><PencilSimple size={24} weight="fill" className='pomo-icon' /></div>
            <div className='pomo-text instrument-serif-regular'>{formatTime(timeRemaining)}</div>
            <div className='pomo-icon-holder' onClick={handlePomoClick}>{isRunning ? <Pause size={24} weight="fill" className='pomo-icon'/> : <Play size={24} weight="fill" className='pomo-icon' onClick={handlePomoClick}/>}</div>
            {isRunning ? <div className='pomo-icon-holder' id='reset' onClick={handlePomoReset}><ClockCounterClockwise size={24} weight="fill" className='pomo-icon' id='reset-icon'/></div> : null}
        </div>

        <div className='pomo-edit-menu'>
            <div className='pomo-edit-mode-container'>
                <div className={currentMode === "work" ? "pomo-edit-mode mode-active" : "pomo-edit-mode"} id='work' onClick={() => {setCurrentMode("work")}}>
                    <Suitcase size={16} weight="fill" className={currentMode === "work" ? "pomo-edit-mode-icon mode-active" : "pomo-edit-mode-icon"} id='work' />
                    <div className={currentMode === "work" ? "pomo-edit-mode-text rethink-sans mode-active" : "pomo-edit-mode-text rethink-sans"} id='work'>WORK</div>
                </div>
                <div className={currentMode === "break" ? "pomo-edit-mode mode-active" : "pomo-edit-mode"} id='break' onClick={() => {setCurrentMode("break")}}>
                    <Coffee size={16} weight="fill" className={currentMode === "break" ? "pomo-edit-mode-icon mode-active" : "pomo-edit-mode-icon"} id='break' />
                    <div className={currentMode === "break" ? "pomo-edit-mode-text rethink-sans mode-active" : "pomo-edit-mode-text rethink-sans"} id='break'>BREAK</div>
                </div>
                <div className={currentMode === "break*" ? "pomo-edit-mode mode-active" : "pomo-edit-mode"} id='break*' onClick={() => {setCurrentMode("break*")}}>
                    <Island size={16} weight="fill" className={currentMode === "break*" ? "pomo-edit-mode-icon mode-active" : "pomo-edit-mode-icon"} id='break*' />
                    <div className={currentMode === "break*" ? "pomo-edit-mode-text rethink-sans mode-active" : "pomo-edit-mode-text rethink-sans"} id='break*'>BREAK*</div>
                </div>
            </div>

            <div className='pomo-edit-text-full'>
                <div className='pomo-edit-carets'>
                    <CaretUp size={52} weight="fill" className='pomo-edit-mode-icon' onClick={() => {changePomoTime(+60)}}/>
                    <CaretDown size={52} weight="fill" className='pomo-edit-mode-icon' onClick={() => {changePomoTime(-60)}}/>
                </div>

                <div className='pomo-text instrument-serif-regular'>{formatTime(totalTime)}</div>

                <div className='pomo-edit-carets'>
                    <CaretUp size={52} weight="fill" className='pomo-edit-mode-icon' onClick={() => {changePomoTime(+10)}}/>
                    <CaretDown size={52} weight="fill" className='pomo-edit-mode-icon' onClick={() => {changePomoTime(-10)}}/>
                </div>
            </div>

            <div className='pomo-edit-buttons-holder'>
                <button className='pomo-edit-button' onClick={modeChangeApply}>
                    <CheckFat size={24} weight="fill" className='pomo-edit-button-icon' />
                    <div className='pomo-edit-button-text rethink-sans'>Confirm</div>
                </button>
                <button className='pomo-edit-button' onClick={toggleEditMenu}>
                    <ThumbsDown size={24} weight="fill" className='pomo-edit-button-icon' />
                    <div className='pomo-edit-button-text rethink-sans'>Deny</div>
                </button>
            </div>
        </div>
        </>
    )
}

export default Pomodoro;