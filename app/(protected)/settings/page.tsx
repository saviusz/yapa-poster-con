import { signOutAction } from '@/app/(auth)/actions'
import Button from '@/components/Button'
import { createClient } from '@/utils/supabase/server';
import React from 'react'


export default async function Page() {

  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return <>
    <h2>Dane</h2>
    <table>
      <tbody>
        <tr>
          <td>Email:</td>
          <td>{user.data.user?.email}</td>
        </tr>
        <tr>
          <td>Identyfikator:</td>
          <td>{user.data.user?.id}</td>
        </tr>
        <tr>
          <td>Rola:</td>
          <td>{user.data.user?.role}</td>
        </tr>
        <tr>
          <td>Utworzono:</td>
          <td>
            {user.data.user?.created_at
              ? Intl.DateTimeFormat('pl-PL', { dateStyle: 'long' }).format(
                  new Date(user.data.user?.created_at)
                )
              : 'Nieznana data utworzenia konta'}
          </td>
        </tr>
      </tbody>
    </table>

    <Button onClick={signOutAction}>Wyloguj</Button>
  </>
}
