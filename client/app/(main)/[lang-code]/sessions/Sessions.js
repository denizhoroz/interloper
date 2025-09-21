"use client";
import { useEffect, useState } from "react";
import Card from '../../../../components/Card';
import Link from 'next/link';
import { StarsBackground } from '@/components/ui/stars-background';
import { useParams } from "next/navigation";

export default function Sessions({ params }) {
    const clientParams = useParams();
    const langCode = (params && params["lang-code"]) || clientParams["lang-code"];
    const [sessions, setSessions] = useState([]);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/sessions`)
            .then(res => res.json())
            .then(data => setSessions(data.sessions || []))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='p-8 flex flex-col gap-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-[#E3F6F5] text-center drop-shadow-lg'>
                Senaryolar
            </h1>
            <div className='w-full max-w-5xl mx-auto gap-4 mt-8 flex flex-col'>
                {sessions.map(session => (
                    <Link key={session.session_n} href={`/${langCode}/sessions/${session.session_n}`}>
                        <Card
                            title={session.title}
                            description={session.description || "Senaryo açıklaması yok."}
                            image="/placeholder.png"
                            className="bg-gradient-to-r from-[#232526] via-[#181A1B] to-[#1a2540] border-2 border-[#647FBC] text-[#E3F6F5] shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
                            titleClassName="text-[#AED6CF] font-bold"
                            descriptionClassName="text-[#91ADC8]"
                        />
                    </Link>
                ))}
            </div>
            <StarsBackground starDensity={0.00015} />
        </div>
    );
}
