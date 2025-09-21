"use client";
import { use } from "react";
import Card from '../../../../components/Card';
import Link from 'next/link';
import { StarsBackground } from '@/components/ui/stars-background';

export default function Sessions({ params }) {
    // Unwrap params if it's a Promise (future-proof)
    const resolvedParams = typeof params?.then === "function" ? use(params) : params;
    const langCode = resolvedParams["lang-code"];

    return (
        <div className='p-8 flex flex-col gap-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-[#E3F6F5] text-center drop-shadow-lg'>
                Senaryolar
            </h1>
            <div className='w-full max-w-5xl mx-auto gap-4 mt-8'>
                <Link href={`/${langCode}/sessions/1`}>
                    <Card
                        title="Restoran Diyaloğu"
                        description="Restoranda bir garsonla yemek siparişi verme pratiği yap."
                        image="/placeholder.png"
                        className="bg-gradient-to-r from-[#232526] via-[#181A1B] to-[#1a2540] border-2 border-[#647FBC] text-[#E3F6F5] shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
                        titleClassName="text-[#AED6CF] font-bold"
                        descriptionClassName="text-[#91ADC8]"
                    />
                </Link>
            </div>
            <StarsBackground starDensity={0.00015} />
        </div>
    );
}
