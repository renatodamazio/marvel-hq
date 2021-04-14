import React from 'react';
import loadingGif from '../images/load.gif';
function Loading() {
    return (
        <div className="loading" style={{backgroundImage: `url(${loadingGif})`}}></div>
    );
}

export default Loading;