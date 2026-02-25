'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface LoadingSpinnerProps {
  shouldFadeOut?: boolean
}

export default function LoadingSpinner({ shouldFadeOut = false }: LoadingSpinnerProps) {
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (shouldFadeOut) {
      setIsFadingOut(true)
    }
  }, [shouldFadeOut])
  return (
    <div className={`fixed inset-0 w-screen h-screen scale-200 flex items-center justify-center bg-white z-[60] ${isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      {/* Logo at the top with absolute positioning */}
     
      
      {/* Loading text */}
    <div className='flex items-center justify-center w-full gap-0 animate-zoomIn'>
      
      <div className="loader"></div>
      <div className='logo-container '>
          <Image 
          src="/assets/logoclean2.png" 
          alt="Loading Logo" 
          width={500}
          height={500}
          className="w-24 h-24 md:w-32 md:h-32 object-contain logo-image "
        />
      </div></div>
      
         
       
      <style jsx>{`
.loader2 {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #9b5b03ff;
  -webkit-mask: radial-gradient(circle closest-side at 50% 40%,#0000 94%, #000);
  transform-origin: 50% 40%;
  animation: l25 1s infinite linear;
}
@keyframes l25 {
  100% {transform: rotate(1turn)}
}
      `}</style>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.5s ease-in-out;
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-zoomIn {
          animation: zoomIn 0.6s ease-out;
        }
        
        .logo-container {
          animation: logoWave 3s ease-in-out infinite;
        }
        
        .logo-image {
          animation: logoZoom 2s ease-in-out infinite;
          transform-origin: center;
        }
        
        @keyframes logoWave {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        @keyframes logoZoom {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.1); 
          }
        }
        
        .loader {
          width: fit-content;
          font-size: 40px;
          font-family: system-ui, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          color: #0000;
          -webkit-text-stroke: 1px #fcb24bff;
          background: 
            linear-gradient(-60deg, #0000 45%, #9b5b03ff 0 55%, #0000 0) 
            0/300% 100% no-repeat text;
          animation: l3 2s linear infinite;
        }
        .loader:before {
          content: "Mex";
        }
        @keyframes l3 {
          0% { background-position: 100% }
        }
      `}</style>
    </div>
  )
}
