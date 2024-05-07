import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";


export default function Landing() {
  return (
  
      <div className="h-screen">
        <SplineComponent />
      </div>
   
  );
}

function SplineComponent() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  

  return (
    <Fragment>
      <Spline 
      className={isSplineLoaded || "hidden"}
     
      scene="https://prod.spline.design/LMzEJWw7BUv9tfqj/scene.splinecode" />
    </Fragment>
  );
}
