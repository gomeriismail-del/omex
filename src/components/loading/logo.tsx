'use client'


export default function Logo() {


  return (
    <div className="flex">
 <div className="loader "></div>


      <style jsx>{`
.loader2 {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #643a00ff;
  -webkit-mask: radial-gradient(circle closest-side at 50% 40%,#0000 94%, #000);
  transform-origin: 50% 40%;
  animation: l25 1s infinite linear;
}
@keyframes l25 {
  100% {transform: rotate(1turn)}
}
      `}</style>


  <style jsx>{`
        .logo-container {
          animation: logoWave 3s ease-in-out infinite;
        }
        
        .logo-image {
          animation: logoZoom 2s ease-in-out infinite;
          transform-origin: center;
        }
        
        @keyframes logoWave {
          0%, 100% { 
            transform: translateX(-50%) translateY(0px); 
          }
          50% { 
            transform: translateX(-50%) translateY(-10px); 
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
          -webkit-text-stroke: 1px #885205ff;
          background: 
            linear-gradient(-60deg, #0000 45%, #643a00ff 0 55%, #0000 0) 
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
