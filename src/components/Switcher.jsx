import React from 'react';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';

const Switcher = () => {
    return (
        <>
        <div className='switcher-icons-holder'>
            <CaretLeft size={24} weight="fill" className='switcher-icons'/>
            <div className='switcher-dots-holder'>
                <div className='switcher-dots-active'></div>
                <div className='switcher-dots-inactive'></div>
                <div className='switcher-dots-inactive'></div>
                <div className='switcher-dots-inactive'></div>
            </div>
            <CaretRight size={24} weight="fill" className='switcher-icons'/>
        </div>
        </>
    )
}

export default Switcher;