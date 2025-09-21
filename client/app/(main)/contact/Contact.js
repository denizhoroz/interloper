import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const LinkedInSVG = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#91ADC8] hover:text-[#AED6CF] transition" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="none"/>
        <path d="M9.5 12.5h3v10h-3v-10zm1.5-4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 4h2.8v1.4h.04c.39-.74 1.34-1.52 2.76-1.52 2.95 0 3.5 1.94 3.5 4.47v5.61h-3v-5c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.64v5.08h-3v-10z" />
    </svg>
);

const GitHubSVG = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#91ADC8] hover:text-[#AED6CF] transition" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="none"/>
        <path d="M16 4C9.373 4 4 9.373 4 16c0 5.304 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.072 1.836 2.813 1.306 3.5.998.108-.776.42-1.306.763-1.607-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.304-.535-1.527.117-3.184 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 013.006-.404c1.02.005 2.049.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.657.243 2.88.12 3.184.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.431.372.815 1.104.815 2.226v3.302c0 .319.192.694.8.576C24.565 25.796 28 21.303 28 16c0-6.627-5.373-12-12-12z"/>
    </svg>
);

export default function Contact() {
    return (
        <div className="flex flex-col w-screen items-center justify-center px-4 py-10">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#E3F6F5] drop-shadow-lg mb-8 text-center">
                İletişim
            </h1>
            <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center mb-12">
                {/* Box 1 */}
                <div className="flex-1 bg-[#232526]/90 rounded-2xl shadow-lg p-8 border-2 border-[#647FBC] flex flex-col items-center">
                    <h2 className="text-lg md:text-xl font-bold text-[#AED6CF] mb-4">
                        Emre Atasavun
                    </h2>
                    <div className="flex gap-6">
                        <a
                            href="https://www.linkedin.com/in/emre-atasavun-125918303/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Emre LinkedIn"
                        >
                            {LinkedInSVG}
                        </a>
                        <a
                            href="https://github.com/Fridgemann"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Emre GitHub"
                        >
                            {GitHubSVG}
                        </a>
                    </div>
                </div>
                {/* Box 2 */}
                <div className="flex-1 bg-[#232526]/90 rounded-2xl shadow-lg p-8 border-2 border-[#647FBC] flex flex-col items-center">
                    <h2 className="text-lg md:text-xl font-bold text-[#AED6CF] mb-4">
                        Deniz Eren Horoz
                    </h2>
                    <div className="flex gap-6">
                        <a
                            href="https://www.linkedin.com/in/denizhoroz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Deniz LinkedIn"
                        >
                            {LinkedInSVG}
                        </a>
                        <a
                            href="https://github.com/denizhoroz"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Deniz GitHub"
                        >
                            {GitHubSVG}
                        </a>
                    </div>
                </div>
            </div>
            <StarsBackground starDensity={0.0005} />
            <ShootingStars />
        </div>
    );
}