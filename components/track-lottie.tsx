import React from 'react';
import { DotLottieReact, DotLottieReactProps } from '@lottiefiles/dotlottie-react';

function TrackLottie({height, width}: DotLottieReactProps) {
  return (
    <DotLottieReact
      src="https://lottie.host/0627f63c-197a-4a9f-99b4-8ad30934c9da/oRO02qmXLV.lottie"
      loop
      autoplay
        height={height}
        width={width}
    />
  );
};

export default TrackLottie;

