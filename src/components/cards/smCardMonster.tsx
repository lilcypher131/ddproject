interface PropriedadesCarta {
    nome: string;
    imgUrl: string;
}

export default function CartaMonstro({ nome, imgUrl }: PropriedadesCarta) {
    const informacaoAlt = `Imagem do ${nome}`;

    return (
        <div className="h-32 w-24 md:h-36 md:w-28 -translate-y-4 flex flex-col items-center justify-between gap-1 border-2 rounded-lg border-amber-900 bg-gradient-to-b from-amber-100 to-amber-200 p-2 shadow-xl hover:scale-105 transition-transform cursor-pointer">
            <p className="text-xs md:text-sm font-bold text-amber-900 text-center line-clamp-2">
                {nome}
            </p>
            <div className="flex-1 flex items-center justify-center w-full">
                <img 
                    src={imgUrl || "/placeholder.svg"} 
                    className="rounded-md max-h-20 md:max-h-24 w-auto object-contain" 
                    alt={informacaoAlt} 
                />
            </div>
        </div>
    );
}