import {CircularProgress} from "@chakra-ui/react";
import React from "react";

interface IProps {
  loading: boolean;
}

const Spinner: React.FunctionComponent<IProps> = props => {
  return props.loading ? (
    <div
      style={{
        display: "block",
        position: "absolute",
        left: 0,
        right: 0,
        background: "rgba(255,255,255,0.8)",
        transition: "all .3s ease",
        top: 0,
        bottom: 0,
        textAlign: "center"
      }}
    >
      <CircularProgress isIndeterminate color="main.300" />
    </div>
  ) : null;
};

export default Spinner;
