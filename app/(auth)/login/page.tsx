"use client";

import Button, { ButtonType } from '@/components/Button'
import React from 'react'

import { useActionState } from "react";

import { signInAction, signUpAction } from "@/app/(auth)/actions";
import FormField from '@/components/FormField';
import CardContainer from '@/components/CardContainer';
import FieldGroup from '@/components/FieldGroup';
import { useSearchParams } from 'next/navigation';
import ErrorCard from '@/components/ErrorCard';

export default function Index({searchParams}: {
    searchParams?: { 
        success?: string,
        error?: string,
    }
}) {

    const [state, action, pending] = useActionState(signInAction, undefined);

    return <>
        <h1>Zaloguj się</h1>
        {state?.success && <ErrorCard message={"Błędny email lub hasło"}/>}
        <CardContainer>
            <form action={action}>
                <FieldGroup>
                    <FormField type={"email"} label='Email' name='email' />
                    <FormField type={"password"} label='Hasło' name='password' />
                    <Button type={ButtonType.Primary} disabled={pending}>Zaloguj się</Button>
                </FieldGroup>
            </form>
        </CardContainer>
    </>
    
}