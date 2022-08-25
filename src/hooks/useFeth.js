import { useCallback, useState } from "react";
// import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFetch = () =>{
    const [error, setError] = useState(null);


    const sendRequest = useCallback( async (requestConfig, applyData) => {
      setError(null);
      try {
        
        const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method: "GET",
            headers:requestConfig.headers ? requestConfig.headers : {},
            body: JSON.stringify(requestConfig.body) ? JSON.stringify(requestConfig.body): null,
            
        });
        if (!response.ok) {
          throw new Error("Something went wrong", response.status);
        }

        const data = await response.json(); //databizdi JSON turundo data ga saktap beret
        applyData(data)
       

      } catch (error) {
        setError(error.message);
      }
    },[]);
  
   
    //custom hooktar bardik dannyilardy bere alat obj, array...
  return {
    error,
    sendRequest
  }
}
export default useFetch