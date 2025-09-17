import Image from 'next/image';
export default function Card({ title, description, image, onClick, children }) {
    return (
        <div
            className="bg-[#FAFDD6] rounded-2xl shadow-lg p-6 mb-2 flex flex-col gap-5 sm:flex-row items-start cursor-pointer hover:shadow-2xl transition border border-[#AED6CF] hover:border-[#91ADC8]"
            onClick={onClick}
            tabIndex={0}
            role="button"
        >
            {image && (
                <Image
                    src={image}
                    alt={title}
                    className="w-full sm:w-50 md:w-80 h-40 md:h-56 object-cover rounded-lg mb-3 sm:mb-0 flex-shrink-0"
                />
            )}
            <div className="flex flex-col gap-2">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#647FBC]">{title}</h3>
                <p className="text-xl md:text-2xl text-[#91ADC8] mb-2">{description}</p>
                {children}
            </div>
        </div>
    );
}