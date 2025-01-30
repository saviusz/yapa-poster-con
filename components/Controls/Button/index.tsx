import style from "./button.module.scss";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

export enum ButtonRank {
  Normal,
  Primary
}

interface Props {
  children      : string;
  rank?         : ButtonRank;
  onClick?      : () => void;
  className?    : string;
  href?         : string;
  [key: string] : any;
}

export default function Button({ children, rank, onClick, className, href, ...rest }: Props) {

  let btnClass = style.normal;

  if (rank == ButtonRank.Primary) btnClass = style.primary;


  return href
    ? <Link className={clsx(style.container, btnClass, className)} href={href} {...rest}>{children}</Link>
    : <button className={clsx(style.container, btnClass, className)} onClick={onClick} {...rest}>{children}</button>;
}
