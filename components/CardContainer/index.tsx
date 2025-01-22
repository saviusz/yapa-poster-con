import style from "./card-container.module.scss";

import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface Props {className?: string }

export default function CardContainer({ children, className } : PropsWithChildren<Props>) {
  return <div className={clsx(style.container, className)}>
    {children}
  </div>;
}
