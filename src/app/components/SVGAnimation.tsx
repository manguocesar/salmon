'use client';
import React from 'react';

export const SVGAnimation = () => {
  return (
    <div className="animate-swim absolute left-[-20vh] z-50">
      <svg
        fill="#dd6b20"
        height="100px"
        width="100px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-46.6 -46.6 559.20 559.20"
        xmlSpace="preserve"
        transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
        stroke="#dd6b20"
        strokeWidth="0.00466002"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="2.8"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M465.451,317.234c-12.17-31.123-30.336-59.4-53.586-83.713c22.997-24.738,40.819-53.413,52.549-84.871 c1.543-4.14-0.562-8.747-4.701-10.291c-4.139-1.542-8.748,0.561-10.291,4.701c-11.042,29.615-27.868,56.319-49.044,79.154 c-10.955-10.151-22.869-19.497-35.664-27.94c-47.319-31.226-103.063-47.548-161.249-47.183 c-38.872,0.385-76.404,8.184-111.554,23.182C58,184.74,27.853,205.205,2.305,231.098c-1.493,1.514-2.323,3.56-2.305,5.686 c0.018,2.126,0.881,4.158,2.4,5.646c25.927,25.406,56.398,45.314,90.568,59.172c35.383,14.351,73.016,21.48,111.838,21.162 c58.221-0.432,113.777-17.542,160.663-49.481c12.6-8.582,24.313-18.046,35.067-28.294c21.408,22.442,38.558,48.776,50.012,78.071 c1.235,3.158,4.255,5.089,7.453,5.089c0.969,0,1.954-0.177,2.911-0.551C465.028,325.989,467.059,321.349,465.451,317.234z M204.683,306.765c-70,0.536-135.397-24.297-185.173-70.146c49.093-46.793,114.142-72.837,184.082-73.529 c70.802-0.481,137.105,26.014,185.442,70.592C341.358,278.907,275.464,306.24,204.683,306.765z"></path>
        </g>
      </svg>

      <style jsx>{`
        @keyframes swim {
          1% {
            transform: translateX(-100vw) translateY(-100px);
          }

          100% {
            transform: translateX(160vw) translateY(200px);
          }
        }
        .animate-swim {
          animation: swim 20s linear;
        }
      `}</style>
    </div>
  );
};
