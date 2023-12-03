import React, {useEffect} from 'react';
import Layout from "@Layout";
import {useRouter} from 'next/router';

export default function Home() {
    let router = useRouter()
    useEffect(()=> {
        router.push('dashboard')
    },[])
    return (
        <Layout></Layout>
    )
}