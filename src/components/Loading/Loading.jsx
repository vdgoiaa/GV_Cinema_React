import React from 'react'
import Loader from 'react-loader-spinner';

const Loading = () => {
    return (
        <div style={{textAlign:"center",marginTop:"300px",height:"100vh"}}>
            <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
            />
        </div>
    )
}
export default Loading;
