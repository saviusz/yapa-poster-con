import { HTMLProps, PropsWithChildren } from "react";
import style from "./FormCard.module.scss";

export function FormCard({ children, ...rest }: PropsWithChildren<HTMLProps<HTMLFormElement>>) {

    return <div className={style.container}>
      <form className={style.form} {...rest}>
        {children}
      </form>
    </div>;
  }