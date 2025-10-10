interface cardProps {
    nome: string,
    imgUrl: string,
}

export default ({nome, imgUrl}: cardProps) => {
    let altInfo = `Imagem do ${nome}`

    return (
        <div className="h-28 w-24 -translate-y-6 flex flex-col items-center justify-center gap-2 border-1 rounded-t-[5px] border-b-0 border-black bg-[#d4a061] p-1.5 animate-bounce">
            <p className="text-sm">{nome}</p>
            <img src={imgUrl} className="rounded-sm max-h-13" alt={altInfo} />
        </div>
    );
};