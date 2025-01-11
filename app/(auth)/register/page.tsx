"use client";

import Link from "next/link";
import React, { useActionState } from "react";

import { signUpAction } from "@/app/(auth)/actions";
import Button, { ButtonRank } from "@/components/Controls/Button";
import TextInput from "@/components/Controls/TextInput";
import ErrorCard from "@/components/ErrorCard";
import { FormCard } from "@/components/FormCard";

export default function Index() {

  const [ state, action, pending ] = useActionState(signUpAction, undefined);

  return <>
    <h1>Zarejestruj się</h1>
    {state?.errors
            && <ErrorCard message={state.errors.misc ?? JSON.stringify(state.errors)} />}
    <FormCard action={action}>
      <TextInput type="email" label='Email' name='email' placeholder="email@example.com" />
      <TextInput type={"password"} label='Hasło' name='password' placeholder="Hasło" />
      <TextInput
        type={"password"}
        label='Powtórz hasło'
        name='r_password'
        placeholder="Powtórz hasło" />
      <Button disabled={pending} rank={ButtonRank.Primary}>{pending ? "Rejestracja..." : "Zarejestruj się"}</Button>
      <p>Masz już konto? <Link href="/login">Zaloguj się!</Link></p>
    </FormCard>
  </>;
}
