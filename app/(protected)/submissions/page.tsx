import style from "./submissions.module.scss";

import { redirect } from "next/navigation";
import React from "react";

import { createClient } from "@/utils/supabase/server";

import Section from "./section";

export default async function Page() {

  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const roleQuery = await supabase.schema("public").from("users")
    .select("role")
    .eq("id", user.data.user?.id);

  const isMod = (roleQuery.data && roleQuery.data[0]?.role in [ "moderator", "admin" ]) ?? false;

  let query = supabase
    .from("submissions")
    .select("*");

  if(!isMod) query = query.eq("contestant_id", user.data.user?.id);

  const { data } = await query;
  if (!data) return <main>Brak danych do wyświetlenia</main>;

  const newData = await Promise.all(data?.map(async (item) => {
    let contestant;

    const authorQuery = await supabase.from("users").select("*")
      .eq("user_id", item.contestant_id)
      .single();

    if(!authorQuery.data) {
      console.log("Author not found", authorQuery);
      contestant = null;
    } else {
      contestant = authorQuery.data;
    }

    const image = await supabase.storage
      .from("user_photos")
      .createSignedUrl(item.image_path, 180);

    return {
      id          : item.id,
      address     : item.loc_desc,
      description : item.description,
      image_path  : image.data?.signedUrl ?? "",
      contestant  : {
        id    : contestant.user_id,
        email : contestant.email
      },
      lat : item.loc.coordinates[1],
      lng : item.loc.coordinates[0]
    };
  }));


  return <main className={style.main}>
    <h1>Twoje zgłoszenia</h1>
    <div className={style.table}>{newData && <Section data={newData} />}</div>
  </main>;
}


