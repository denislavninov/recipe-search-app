import React from "react";
import "./styles.css";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="shared-container">{children}</div>;
};
