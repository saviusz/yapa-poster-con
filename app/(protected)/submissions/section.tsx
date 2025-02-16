"use client";
import style from "./submissions.module.scss";

import { useState } from "react";

import SubmissionDetailsCard from "@/components/SubmissionDetailsCard";

interface SectionProps {
  data: {
    id          : string;
    address     : string;
    description : string;
    image_path  : string;
    lat         : number;
    lng         : number;
    contestant: {
      id    : string;
      email : string;
    } | null;
  }[];
}

export default function Section({ data } : SectionProps) {

  const [ openID, setOpenID ] = useState<string | undefined>(undefined);

  return <>{data.map((item) => {
    const handleClick = () => {
      if (openID === item.id) {
        setOpenID(undefined);
      } else {
        setOpenID(item.id);
      }
    };

    return <div className={style.row} key={item.id}>
      <div className={style.table_row} onClick={handleClick}>
        <span>{item.address}</span>
        {item.contestant && <span>{item.contestant.email}</span>}
      </div>
      {openID === item.id && <SubmissionDetailsCard
        className={style.details}
        data={{
          address     : item.address,
          description : item.description || "-",
          image       : item.image_path,
          lat         : item.lat,
          lng         : item.lng,
          contestant  : {
            id    : (item.contestant && item.contestant.id) ?? "",
            email : (item.contestant && item.contestant.email) ?? ""
          }
        }} />}
    </div>;
  })}
  </>;
}
