"use client";
import { use } from "react";
import Card from '../../../../components/Card';
import Link from 'next/link';

export default function Sessions({ params }) {
    // Unwrap params if it's a Promise (future-proof)
    const resolvedParams = typeof params?.then === "function" ? use(params) : params;
    const langCode = resolvedParams["lang-code"];

    return (
        <div className='min-h-screen p-8 bg-[#E3F6F5] flex flex-col gap-6'>
            <h1 className='text-6xl font-bold text-[#647FBC] text-center'>Senaryolar</h1>
            <div className='w-full max-w-5xl mx-auto gap-4 mt-8'>
                <Link href={`/${langCode}/sessions/1`}>
                    <Card
                        title="Restoran Diyaloğu"
                        description="Bir arkadaşınla restoranda geçen bir konuşma oturumu."
                        image="/placeholder.png"
                    />
                </Link>
            </div>
        </div>
    );
}
