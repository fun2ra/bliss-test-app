import React from "react";
import { Button } from "antd";

const LoadingScreen = ({ tryAgain }: {tryAgain:any}) => 
    <div className="try-again">
        <div>The server seems to have some error. You can try again</div>
        <Button onClick={tryAgain} type="primary">Try Again</Button>
    </div>
  
;

export default LoadingScreen;
