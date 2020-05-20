import React, { useState } from 'react'
import Board from '../Board'
import { calculateWinner } from '../../winner'
import './style.css'


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
        //atualizada o estado de stepNumber para o número da jogada passado no parâmetro.
        //Por exemplo, se o jogador clicar no botão "Jump to 2", step terá o valor 2 e o jogo volta na 2º jogada
        setStepNumber(step)
        setIsXNext(step % 2 === 0)//se o módulo de step dividido por 2 for igual a 0, isXNext será true, significando que o próximo jogador será "X"
    }

    const renderMoves = () => (
        //_step é o array de jogadas
        //move é o número da jogada
        //aqui será criada a lista de botões para voltar a cada jogada realizada
        //quando o jogador clicar em um dos botões, será chamado o método jumpTo(move) passando o número da jogada como parâmetro
        history.map((_step, move) => {
            const destination = move ? `Ir para jogada ${move}` : "Início"
            return (
                <li className='listButtons' key={move}>
                    <button className='buttons' onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })
    )


    return (
        <>
            <div className="player">
                <p>{winner ? 'Vencedor: ' + winner : 'Próximo jogador: ' + (isXNext ? 'X' : 'O')}</p>
            </div>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="moves">
                {renderMoves()}
            </div>
        </>
    )

}

export default Game