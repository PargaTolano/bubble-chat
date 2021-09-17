import React,{useState, useEffect} from 'react';

import Lottie from 'react-lottie';

import {motion} from 'framer-motion';

import * as loading from '../../lottie/lf30_editor_swis6cn3.json';
import * as success from '../../lottie/lf30_editor_teppifzx.json';

import styles from '../../styles/Loading.module.css';

const loadingOptions = {
    loop:           true,
    autoplay:       true,
    animationData:  loading.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
  
const successOptions = {
    loop:           false,
    autoplay:       true,
    animationData:  success.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
    eventListeners:[
        {
          eventName: 'complete',
          callback: () => {
              console.log('the animation completed:');
            },
        },
    ]
};

export const LoadingScreen = ({loading, setPlaying}) => {

    useEffect(()=>{
        setPlaying(true);
    },[]);

    return (
        <motion.section 
            className={styles.loadingScreen}
            initial = {{x: '100%'}}
            animate = {{x: 0}}
            exit    = {{x: '-100%'}}
            transition = {{type:'tween', ease: 'easeInOut', duration: 0.5}}
        >
        {
            loading ? 
            
            <Lottie 
                options = { loadingOptions } 
                height  = { 300 } 
                width   = { 300 }
                isClickToPauseDisabled={true}
                segments={[0, 88]}
            /> 
            
            :
            
            <Lottie 
                options = { successOptions } 
                height  = { 300 } 
                width   = { 300 } 
                speed   = { 3 }
                isClickToPauseDisabled={true}
                eventListeners={[
                    {
                        eventName: 'complete',
                        callback: () => void setPlaying(false),
                    },
                ]}
            />
        }
        </motion.section>
        
    )
}

export default LoadingScreen;
