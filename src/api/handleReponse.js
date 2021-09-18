
/**
 * 
 * @param   {{status : number, statusText : string, data : any}} axiosResponse
 * @returns {Promise<any>}
 */
export const handleResponse = async ({status, statusText, data})=>{

    if( status !== 200 ){
        if( status !== 403 && status !== 401){
            return Promise.reject({ status, statusText });
        }
        //reject and log out in browser
    }

    return data;
}; 