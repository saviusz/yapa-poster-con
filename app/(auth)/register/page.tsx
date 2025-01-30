"use client";

import style from "./register.module.scss";

import Link from "next/link";
import React, { useActionState } from "react";

import { signUpAction } from "@/app/(auth)/actions";
import Button, { ButtonRank } from "@/components/Controls/Button";
import TextInput from "@/components/Controls/TextInput";
import { FormCard } from "@/components/FormCard";
import StatusCard from "@/components/StatusCard";

export default function Index() {

  const [ state, action, pending ] = useActionState(signUpAction, undefined);

  return <main>
    <h1>Zarejestruj się</h1>
    {state?.errors?.misc
      && <StatusCard message={state.errors.misc} />}
    <FormCard action={action}>
      <TextInput type="email" label='Email' name='email' placeholder="email@example.com" error={state?.errors?.email}/>
      <TextInput type={"password"} label='Hasło' name='password' placeholder="Hasło" error={state?.errors?.password} />
      <TextInput
        type={"password"}
        label='Powtórz hasło'
        name='r_password'
        placeholder="Powtórz hasło"
        error={state?.errors?.r_password}/>
      <div className={style.error}>{state?.errors?.terms}</div>
      <div className={style.termsRow}>
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms">Akceptuję <Link href="/rules">regulamin konkursu</Link></label></div>
      <div><Button disabled={pending} rank={ButtonRank.Primary}>{pending ? "Rejestracja..." : "Zarejestruj się"}</Button></div>
      <p>Masz już konto? <Link href="/login">Zaloguj się!</Link></p>
    </FormCard>
  </main>;
}
