import style from "./GenericInput.module.scss";

import clsx from "clsx";
import React, { PropsWithChildren } from "react";

export enum NoteStatus {
  Error
}

interface Props {
  label?      : string;
  note?       : string;
  noteStatus? : NoteStatus;
}

export default function GenericInput(props: PropsWithChildren<Props>) {

  return <div
    className={clsx(
      style.container,
      props.noteStatus === NoteStatus.Error && style.error
    )}>
    {props.label && <span className={style.label}>{props.label}</span>}
    {props.children}
    {props.note && <span className={style.note}>{props.note}</span>}
  </div>;
}

