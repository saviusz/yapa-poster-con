import style from "./status-card.module.scss";

import clsx from "clsx";
import React from "react";

interface Props {
  title?  : string;
  message : string;
  type?   : "error" | "success";
}

export default function StatusCard({ title, message, type = "error" } : Props) {
  return <div className={clsx(style.container, type == "success" && style.success)}>
    <span>{title ?? "Błąd"}:</span> {message}
  </div>;
}
