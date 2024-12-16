import React from 'react';
import { Play, Pause, PencilSimple } from '@phosphor-icons/react';

const Pomodoro = () => {
    return (
        <>
        <div className='pomo-full-holder'>
            <div className='pomo-icon-holder'><PencilSimple size={24} weight="fill" className='pomo-icon' /></div>
            <div className='pomo-text instrument-serif-regular'>25:00</div>
            <div className='pomo-icon-holder'><Play size={24} weight="fill" className='pomo-icon' /></div>
        </div>
        </>
    )
}

export default Pomodoro;