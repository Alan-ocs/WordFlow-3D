// frontend/src/SplashScreen.jsx
import React from 'react';

function SplashScreen({ onFinish }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <h1>WordCloud</h1>
                <p>Interactive 3D Visualization</p>
            </div>
        </div>
    );
}

export default SplashScreen;