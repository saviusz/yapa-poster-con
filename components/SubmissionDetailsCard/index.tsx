import style from "./style.module.scss";

import clsx from "clsx";
import React from "react";

type User = {
  id    : number;
  email : string;
};

type Submission = {
  address     : string;
  description : string;
  image       : string;
  lat         : number;
  lng         : number;
  contestant  : User;
};

interface Props {
  data       : Submission;
  className? : string;
}

export default function SubmissionDetailsCard({ data, className }: Props) {

  return (
    <div className={clsx(style.container, className)}>
      <img src={data.image} alt="Grafika" />
      <div className={style.props}>
        <div className={style.row}>
          <span className={style.label}>Adres</span>
          <span>{data.address}</span>
        </div>
        <div className={style.row}>
          <span className={style.label}>Opis</span>
          <span>{data.description}</span>
        </div>

        <div className={style.row}>
          <span className={style.label}>Koordynaty</span>
          <span>{data.lat}, {data.lng}</span>
        </div>

        {data.contestant
          && <>
            <div className={style.row}>
              <span className={style.label}>ID Zgłaszającego</span>
              <span>{data.contestant.id}</span>
            </div>
            <div className={style.row}>
              <span className={style.label}>Email Zgłaszającego</span>
              <span>{data.contestant.email}</span>
            </div>
          </>
        }
      </div>
    </div>
  );
}
