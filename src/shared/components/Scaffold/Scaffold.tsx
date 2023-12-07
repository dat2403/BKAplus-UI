import React, {PropsWithChildren} from "react";
import LoadingPage from "../../../pages/LoadingPage/LoadingPage.tsx";

export enum TypeLoading {
  OVERLAY,
  REPLACE
}

interface ScaffoldProps extends PropsWithChildren {
  isLoading: boolean,
  error?: boolean,
  typeLoading?: TypeLoading
}

const Scaffold: React.FC<ScaffoldProps> = (props) => {
  const {children, isLoading, typeLoading, error} = props;

  if (!isLoading) {
    return children;
  }

  if (typeLoading == TypeLoading.OVERLAY) {
    return <div style={{
      position: "relative",
    }}>
      {children}
      <LoadingPage style={{
        position: "absolute",
        top: 0,
        background: "rgba(0,0,0,0.5)",
      }}/>
    </div>;
  }

  return <LoadingPage/>;
}

export default Scaffold;
