import style from "./submissions.module.scss";

import { redirect } from "next/navigation";
import React from "react";

import { createClient } from "@/utils/supabase/server";

export default async function Page() {

  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const isMod = user.data.user?.role == "admin";

  let query = supabase
    .from("submissions")
    .select("*");

  if(!isMod) query = query.eq("contestant_id", user.data.user?.id);

  const { data } = await query;


  return <main className={style.main}>
    <h1>Twoje zgłoszenia</h1>
    <table className={style.table}>
      <thead>
        <tr>
          {/* <th>Obraz</th> */}
          {isMod && <th>Autor</th>}
          <th>Adres</th>
          <th>Opis miejsca</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(async (item) => {
          const image = await supabase.storage
            .from("user_photos")
            .createSignedUrl(item.image_path, 60);

          let contestant;

          const authorQuery = await supabase.auth.admin.getUserById(item.contestant_id);
          console.log("Author", authorQuery);

          if(!authorQuery.data) {
            console.log("Author not found", authorQuery);
            contestant = null;
          } else {
            contestant = authorQuery.data;
          }

          return <tr key={item.id}>
            {isMod && <td>{contestant?.user?.email ? contestant.user?.email : "-"}</td>}
            {/* <td><img src={image.data?.signedUrl} alt="Obrazek"/></td> */}
            <td>{item.loc_desc}{}</td>
            <td>{item.desc}</td>
            <td>{item.created_at}</td>
          </tr>;
        })}
      </tbody>
    </table>
  </main>;
}
