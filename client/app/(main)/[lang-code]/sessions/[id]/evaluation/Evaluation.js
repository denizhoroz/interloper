// Stretch out eval blocks to sides

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EvaluationPage() {
    const params = useParams();
    const { id } = params;
    const [criteria, setCriteria] = useState([]);
    const [scores, setScores] = useState({});
    const [critiques, setCritiques] = useState({});
    const [scenario, setScenario] = useState({
        title: "",
        description: "",
        details: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // Fetch scenario info from sessions.json via API
        fetch(`${API_BASE_URL}/api/sessions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setScenario({
                    title: data.title || "",
                    description: data.description || "",
                    details: data.details || [],
                });
            });

        // Fetch evaluation info
        fetch(`${API_BASE_URL}/api/sessions/${id}/evaluation`)
            .then((res) => res.json())
            .then((data) => {
                setCriteria(data.criteria || []);
                setScores(data.scores || {});
                setCritiques(data.critiques || {});
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-[#181A1B]">
                <div className="flex flex-col items-center justify-center bg-[#232526] rounded-xl shadow-lg p-8 border-2 border-[#647FBC]">
                    <span className="text-4xl mb-4 animate-bounce text-[#AED6CF]">🍽️</span>
                    <p className="text-2xl text-[#91ADC8] font-bold mb-2">
                        Değerlendirme yükleniyor...
                    </p>
                    <div className="w-16 h-16 border-4 border-[#647FBC] border-t-[#AED6CF] rounded-full animate-spin"></div>
                </div>
                <StarsBackground starDensity={0.0003} />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-screen p-0">
            <div className="w-screen flex flex-col gap-6 items-stretch justify-center">
                {/* Scenario Overview */}
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-4xl flex flex-col justify-center items-center bg-[#232526] rounded-2xl shadow-lg p-6 mb-6 border-4 border-[#647FBC] text-center">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <h2 className="text-2xl font-extrabold text-[#AED6CF] text-left drop-shadow-lg">
                                Senaryo Özeti
                            </h2>
                        </div>
                        <h3 className="text-xl font-bold text-[#AED6CF] mb-1">
                            {scenario.title}
                        </h3>
                        <p className="text-lg text-[#91ADC8] mb-2 italic">
                            {scenario.description}
                        </p>
                        {scenario.details && scenario.details.length > 0 && (
                            <ul className="list-disc list-inside text-[#91ADC8] space-y-1 pl-2 text-center">
                                {scenario.details.map((item, idx) => (
                                    <li key={idx} className="text-lg font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {/* Evaluation Section */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#AED6CF] mb-6 text-center drop-shadow-lg">
                        Senaryo Değerlendirmesi
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
                        {criteria.map((c) => (
                            <div
                                key={c.key}
                                className="flex flex-col justify-center bg-[#232526] rounded-2xl p-6 shadow-xl text-center w-full min-h-[10rem] gap-2 border-4 border-[#647FBC] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:border-[#AED6CF]"
                            >
                                <label className="text-lg font-bold text-[#AED6CF] mb-1 tracking-wide">
                                    {c.label}
                                </label>
                                <div className="w-full h-6 bg-[#181A1B] rounded-full overflow-hidden border-2 border-[#647FBC] mb-1 flex items-center">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] transition-all"
                                        style={{ width: `${(scores[c.key] / 10) * 100}%` }}
                                    />
                                </div>
                                <span className="text-lg text-[#AED6CF] mb-1 font-semibold">
                                    Puan: {scores[c.key]}/10
                                </span>
                                <div className="text-lg w-full bg-[#181A1B]/80 rounded-lg p-4 border-4 border-[#647FBC] text-[#91ADC8] text-left min-h-[2rem] break-words whitespace-pre-line">
                                    {critiques[c.key]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <StarsBackground starDensity={0.00025} />
        </div>
    );
}