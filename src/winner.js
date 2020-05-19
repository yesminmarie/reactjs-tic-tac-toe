//recebe como parâmetro o valor do quadrado que o jogador clicou(X ou O)
export function calculateWinner(squares) {
    //lista de todas as linhas (horizontais, verticais e diagonais)
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        //se o valor do quadrado "a" for igual de "b" e "c", então retorna o valor desse quadrado (X ou O) e o jogo acaba
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    //senão retorna nulo e o jogo continua
    return null
}

