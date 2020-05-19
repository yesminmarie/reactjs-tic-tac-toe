import React, { useState } from 'react'
import Board from '../Board'
import { calculateWinner } from '../../winner'
import './style.css'

const style = {
    width: '200px',
    margin: '20px auto'
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]) //history será um array que irá armazenar todas as jogadas, iniciando com null
    const [stepNumber, setStepNumber] = useState(0) //stepNumber contará o número de jogadas
    const [isXNext, setIsXNext] = useState(true) //isXNext verifica se o próximo valor a ser inserido no quadrado é "X" ou "O"
    const winner = calculateWinner(history[stepNumber]) //usa o método calculateWinner do arquivo "winner" para verificar quem é o vencedor, enviando como parâmetro a jogada atual (history[stepNumber])

    function handleClick(i) {
        const timeInHistory = history.slice(0, stepNumber + 1) //retorna um array do histórico de jogadas começando do 0 até o número de jogadas
        const current = timeInHistory[stepNumber] //current armazena a jogada atual
        const squares = [...current] //squares armazena uma cópia da jogada atual

        if (winner || squares[i]) return; //se já houver um vencedor ou se o jogador clicar em um quadrado ocupado, ele retorna

        squares[i] = isXNext ? 'X' : 'O'; //Insere um X ou O no quadrado clicado
        setHistory([...timeInHistory, squares]) //atualiza o estado de history adicionando uma cópia de timeInHistory e acrescentando squares
        setStepNumber(timeInHistory.length) //atualiza o estado de stepNumber que será igual ao tamanho do array timeInHistory
        setIsXNext(!isXNext)//troca o valor de isXNext
    }

    const jumpTo = step => {
        setStepNumber(step)
        setIsXNext(step % 2 === 0)
    }

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move ${move}` : "Go to start"
            return (
                <li className='listButtons' key={move}>
                    <button className='buttons' onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })
    )


    return (
        <>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div style={style}>
                <p>{winner ? 'Vencedor: ' + winner : 'Próximo jogador: ' + (isXNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
    )

}

export default Game