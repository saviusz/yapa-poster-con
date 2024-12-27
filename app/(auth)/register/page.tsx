"use client"

import Button from '@/components/Controls/Button'
import React, { useActionState } from 'react'

import { signUpAction } from "@/app/(auth)/actions";
import ErrorCard from '@/components/ErrorCard';
import { FormCard } from '@/components/FormCard';
import TextInput from '@/components/Controls/TextInput';

export default function Index() {

    const [state, action, pending] = useActionState(signUpAction, undefined);

    return <>
        <h1>Zarejestruj się</h1>
        {state && state.errors && <ErrorCard message={state.errors.misc ?? "Wystąpiły błędy, zobacz poniżej"} />}
        <FormCard action={action}>
            <TextInput type={"email"} label='Email' name='email' />
            <TextInput type={"password"} label='Hasło' name='password' />
            <TextInput type={"password"} label='Powtórz hasło' name='r_password' />
            <Button disabled={pending}>Zarejestruj się</Button>
        </FormCard>
    </>
}
