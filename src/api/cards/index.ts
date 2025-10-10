
export const getHomeMonsters = () => {
    try{
        let monsters = [
            {
                nome: "Aboleth",
                imgUrl: "https://www.dnd5eapi.co/api/images/monsters/aboleth.png",
            },
            {
                nome: "Black-Dragon",
                imgUrl: "https://www.dnd5eapi.co/api/images/monsters/adult-black-dragon.png",
            },
            {
                nome: "Acolyte",
                imgUrl: "https://www.dnd5eapi.co/api/images/monsters/acolyte.png",
            },
        ];

        let object = {
            timeStamp: new Date().toLocaleString('pt-br'),
            data: monsters,
        }

        return object; 
    } catch (err){
        console.error("Erro ao buscar monstros:", err);

        return {
        timeStamp: new Date().toLocaleString("pt-BR"),
        data: [], 
        };
    }
};