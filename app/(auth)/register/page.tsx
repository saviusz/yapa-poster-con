"use client"

import Button, { ButtonType } from '@/components/Button'
import React, { useActionState } from 'react'

import { signUpAction } from "@/app/(auth)/actions";
import FormField from '@/components/FormField';
import CardContainer from '@/components/CardContainer';
import FieldGroup from '@/components/FieldGroup';
import { useSearchParams } from 'next/navigation';
import ErrorCard from '@/components/ErrorCard';

export default function Index() {
    
    const [state, action, pending] = useActionState(signUpAction, undefined);

    return <>
        <h1>Zarejestruj się</h1>
        {state && state.errors && <ErrorCard message={state.errors.misc ?? "Wystąpiły błędy, zobacz poniżej"}/>}
        <CardContainer>
            <form action={action}>
                <FieldGroup>
                    <FormField type={"email"} label='Email' name='email' />
                    <FormField type={"password"} label='Hasło' name='password' />
                    <FormField type={"password"} label='Powtórz hasło' name='r_password' />
                    <Button disabled={pending}>Zarejestruj się</Button>
                </FieldGroup>
            </form>
        </CardContainer>
    </>
}
