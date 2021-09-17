import React, { useState }  from 'react';
import { AnimatePresence }  from 'framer-motion'
import LoadingScreen        from './LoadingScreen'

export const LoadingScreenWrapper = ({loading}) => {

    const [playing, setPlaying] = useState(false);

    return (
        <AnimatePresence>
            { 
                ( playing || loading ) 
                && 
                <LoadingScreen 
                    loading     = { loading }
                    setPlaying  = { setPlaying }
                /> 
            }
        </AnimatePresence>
    )
}

export default LoadingScreenWrapper
