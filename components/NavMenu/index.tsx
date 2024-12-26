import React, { useEffect, useState } from 'react'
import NavButton from './Button';
import { createClient } from '@/utils/supabase/server';

import style from './nav-menu.module.scss';
import Link from 'next/link';

type Props = {}

export default async function NavMenu({ }: Props) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();


  return <nav className={style.container}>
    <div className={style.links}>
      <Link href="/">Nowe zgłoszenia</Link>
      {user && <Link href="/submissions">Przesłane</Link>}
    </div>
    {user ?
      <Link href="/settings" className={style.user}>Cześć <span className={style.username}>{user?.email}</span>!</Link>
      :
      <Link href="/login" className={style.user}>Siemasz, <span className={style.username}>zaloguj się</span>!</Link>
    }
  </nav>
}