import { useState, useEffect } from 'react';

function TimeWidget() {
    const daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(daysOfTheWeek[new Date().getDay()]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    },[]);

    const formatTime = (date) => {
        let hours = date.getHours();
        let mins = date.getMinutes();
        const ampm = hours >= 12 ? '' : '';

        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = hours < 10 ? '0' + hours : hours;
        mins = mins < 10 ? '0' + mins : mins;

        return `${hours}:${mins}`;
    }

    const indicAmPm = (date) => {
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        return `${ampm}`;
    }

    return(
        <>
        <div className='time-bx-1'>
            <div className='date rethink-sans'>{currentDate}</div>
            <div className='time-bx-2'>
                <div className='instrument-serif-regular time'>{formatTime(currentTime)}</div>
                <div className='ampm rethink-sans'>{indicAmPm(currentTime)}</div>
            </div>
        </div>
        </>
    )
}

export default TimeWidget