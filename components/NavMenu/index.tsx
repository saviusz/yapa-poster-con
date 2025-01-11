import style from "./nav-menu.module.scss";

import Link from "next/link";
import React from "react";

import { createClient } from "@/utils/supabase/server";

export default async function NavMenu() {

  const supabase = await createClient();
  const { data: { user }} = await supabase.auth.getUser();


  return <nav className={style.container}>
    <div className={style.links}>
      <Link href="/">Nowe zgłoszenia</Link>
      {user && <Link href="/submissions">Przesłane</Link>}
      <Link href="/rules">Regulamin</Link>
    </div>
    {user
      ? <Link href="/settings" className={style.user}>Cześć <span className={style.username}>{user?.email}</span>!</Link>
      : <Link href="/login" className={style.user}>Siemasz, <span className={style.username}>zaloguj się</span>!</Link>
    }
  </nav>;
}
