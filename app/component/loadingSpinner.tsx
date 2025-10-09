import React from 'react'
import { TrophySpin } from 'react-loading-indicators'

const LoadingSpinner = () => {
  return (
  <div className="bg-black w-full h-screen  flex justify-center items-center">
<TrophySpin color="#cdcdcd" size="medium" text="Loading" textColor="" /> 
    </div>

)
}

export default LoadingSpinner