import React from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import {HtmlProps} from "../../shared/utility/Util.ts";

interface LoadingPageProps extends HtmlProps<HTMLDivElement> {

}

const LoadingPage: React.FC<LoadingPageProps> = (props) => {
  return <div
    {...props}
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...props.style
    }}>
    <ProgressSpinner
      style={{width: "50px", height: "50px"}}
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"/>
  </div>;
};

export default LoadingPage;
