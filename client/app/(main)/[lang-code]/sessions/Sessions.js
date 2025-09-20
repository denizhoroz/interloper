"use client";
import { use } from "react";
import Card from '../../../../components/Card';
import Link from 'next/link';

export default function Sessions({ params }) {
    // Unwrap params if it's a Promise (future-proof)
    const resolvedParams = typeof params?.then === "function" ? use(params) : params;
    const langCode = resolvedParams["lang-code"];

    return (
        <div className='p-8 flex flex-col gap-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-[#FAFDD6] text-center'>Senaryolar</h1>
            <div className='w-full max-w-5xl mx-auto gap-4 mt-8'>
                <Link href={`/${langCode}/sessions/1`}>
                    <Card
                        title="Restoran Diyaloğu"
                        description="Restoranda bir garsonla yemek siparişi verme pratiği yap."
                        image="/placeholder.png"
                    />
                </Link>
            </div>
        </div>
    );
}
