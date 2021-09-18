import React, { useState }  from 'react';
import { AnimatePresence }  from 'framer-motion'
import LoadingScreen        from './LoadingScreen'

import { useLoadingScreen } from '../../hooks/useLoadingScreen';
import { globals } from '../../config/globals';

export const LoadingScreenWrapper = (props) => {

    const {
        playing,
        setPlaying,
    } = useLoadingScreen();

    return (
        <AnimatePresence>
            { 
                ( playing || globals.loading.get ) 
                && 
                <LoadingScreen 
                    loading     = { globals.loading.get }
                    setPlaying  = { setPlaying }
                /> 
            }
        </AnimatePresence>
    )
}

export default LoadingScreenWrapper
