"use client";
const criteria = [
	{ key: "grammar", label: "Gramer" },
	{ key: "vocabulary", label: "Kelime Dağarcığı" },
	{ key: "fluency", label: "Akıcılık" },
	{ key: "clarity", label: "Açıklık" },
];

const scores = {
	grammar: 7,
	vocabulary: 8,
	fluency: 6,
	clarity: 9,
};

// Example critiques (replace with dynamic data if needed)
const critiques = {
	grammar: "Cümle yapılarında küçük hatalar mevcut, ancak genel olarak anlaşılır.",
	vocabulary: "Kelime seçiminiz zengin ve çeşitliydi.",
	fluency: "Konuşma sırasında bazı duraksamalar oldu.",
	clarity: "İletmek istediğiniz mesaj net ve anlaşılırdı.",
};

const scenario = {
	title: "Restoran Diyaloğu",
	description: "Bir arkadaşınla restoranda geçen bir konuşma oturumu.",
	details: [
		"Konuşma başlangıcı: Garson ile selamlaşma.",
		"Yemek siparişi verme.",
		"Fatura isteme ve ödeme.",
	],
};

export default function EvaluationPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#E3F6F5]">
			<div className="bg-[#FAFDD6] rounded-xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
				{/* Scenario Overview */}
				<div className="md:w-1/2 w-full flex flex-col justify-center">
					<h2 className="text-4xl font-bold text-[#647FBC] mb-6 text-center md:text-left">
						Senaryo Özeti
					</h2>
					<h3 className="text-3xl font-semibold text-[#647FBC] mb-4">
						{scenario.title}
					</h3>
					<p className="text-2xl text-[#647FBC] mb-6">
						{scenario.description}
					</p>
					<ul className="list-disc list-inside text-[#647FBC] space-y-4">
						{scenario.details.map((item, idx) => (
							<li key={idx} className="text-xl">
								{item}
							</li>
						))}
					</ul>
				</div>
				{/* Evaluation Section */}
				<div className="md:w-1/2 w-full flex flex-col items-center">
					<h1 className="text-5xl font-bold text-[#647FBC] mb-10 text-center">
						Senaryo Değerlendirmesi
					</h1>
					<div className="space-y-8 w-full">
						{criteria.map((c) => (
							<div key={c.key} className="flex flex-col items-center">
								<label className="text-2xl font-semibold text-[#647FBC] mb-3">
									{c.label}
								</label>
								<div className="w-2/3 h-8 bg-[#E3F6F5] rounded-full overflow-hidden border border-[#AED6CF]">
									<div
										className="h-full bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] transition-all"
										style={{ width: `${(scores[c.key] / 10) * 100}%` }}
									/>
								</div>
								<span className="text-xl text-[#647FBC] mt-2">
									Puan: {scores[c.key]}/10
								</span>
								{/* Critique section */}
								<div className="mt-2 w-2/3 bg-[#E3F6F5] rounded-lg p-3 border border-[#AED6CF] text-lg text-[#647FBC]">
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