import { useState } from 'react';
import { globals }  from '../config/globals';

export const useLoadingScreen = ()=>{

    const [get, set] = useState(false);

    globals.loading.get = get;
    globals.loading.set = set;

    const [playing, setPlaying] = useState(false);

    return {
        playing, 
        setPlaying
    }
    
}