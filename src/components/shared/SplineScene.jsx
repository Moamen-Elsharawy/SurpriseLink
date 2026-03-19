import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = () => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) return <div className="absolute inset-0 z-[-1] bg-mesh opacity-20" />;

  return (
    <div className="absolute inset-0 z-[-1] opacity-70">
      <Suspense fallback={<div className="w-full h-full bg-mesh opacity-30" />}>
        <Spline 
          scene="https://prod.spline.design/Lsqn6Z2p0UqN0YQG/scene.splinecode" 
          onError={() => setHasError(true)}
        />
      </Suspense>
    </div>
  );
};

export default SplineScene;
