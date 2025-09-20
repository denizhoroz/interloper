// Stretch out eval blocks to sides

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
        fetch(`${API_BASE_URL}/api/sessions/${id}/evaluation`)
            .then((res) => res.json())
            .then((data) => {
                setCriteria(data.criteria || []);
                setScores(data.scores || {});
                setCritiques(data.critiques || {});
                setScenario(
                    data.scenario || {
                        title: "",
                        description: "",
                        details: [],
                    }
                );
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-[#FAFDD6] rounded-xl shadow-lg p-8">
                    <span className="text-4xl mb-4 animate-bounce">🍽️</span>
                    <p className="text-2xl text-[#647FBC] font-bold mb-2">
                        Değerlendirme yükleniyor...
                    </p>
                    <div className="w-16 h-16 border-4 border-[#647FBC] border-t-[#AED6CF] rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-[#FAFDD6] rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch justify-center">
                {/* Scenario Overview */}
                <div className="md:w-2/5 w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#E3F6F5] via-[#FAFDD6] to-[#AED6CF] rounded-2xl shadow-lg p-6 mb-8 md:mb-0 border-4 border-[#AED6CF] text-center min-h-[20rem]">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-4xl">🍽️</span>
                        <h2 className="text-3xl font-extrabold text-[#647FBC] text-left drop-shadow-lg">
                            Senaryo Özeti
                        </h2>
                    </div>
                    <h3 className="text-2xl font-bold text-[#647FBC] mb-2">
                        {scenario.title}
                    </h3>
                    <p className="text-xl text-[#647FBC] mb-4 italic">
                        {scenario.description}
                    </p>
                    <ul className="list-disc list-inside text-[#647FBC] space-y-2 pl-2 text-center">
                        {scenario.details.map((item, idx) => (
                            <li key={idx} className="text-lg font-medium">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Evaluation Section */}
                <div className="md:w-3/5 w-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#647FBC] mb-6 text-center">
                        Senaryo Değerlendirmesi
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-items-center">
                        {criteria.map((c) => (
                            <div
                                key={c.key}
                                className="flex flex-col items-center bg-[#F5F8E3] rounded-xl p-4 shadow text-center w-full max-w-md min-h-[14rem]"
                            >
                                <label className="text-xl font-semibold text-[#647FBC] mb-2">
                                    {c.label}
                                </label>
                                <div className="w-full h-8 bg-[#E3F6F5] rounded-full overflow-hidden border-2 border-[#AED6CF] mb-2 flex items-center">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] transition-all"
                                        style={{ width: `${(scores[c.key] / 10) * 100}%` }}
                                    />
                                </div>
                                <span className="text-lg text-[#647FBC] mb-2">
                                    Puan: {scores[c.key]}/10
                                </span>
                                <div className="w-full bg-[#E3F6F5] rounded-lg p-2 border-4 border-[#AED6CF] text-base text-[#647FBC] text-center min-h-[3rem] flex items-center justify-center">
                                    {critiques[c.key]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}