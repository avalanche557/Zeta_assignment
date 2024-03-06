import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';

// const board = [
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
// ]

function App() {
  const [currentFood, setCurrentFood] = useState([1,1])
  const [currentSnake, setCurrentSnake] = useState([[0,0],[0,1], [0,2]])
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [boardSize, setBoardSize] = useState(10)


  useEffect(() => {
    let board = []
    for(let i = 0; i < boardSize; i++) {
      let temp = []
      for(let j = 0; j < boardSize; j++) {
        temp.push(0)
      }
      board.push(temp)
    }
    setBoard(board)
  }, [])

  const setRandomFood = () => {
    let row = Math.floor(Math.random()*10)
    let column = Math.floor(Math.random()*10)
    setCurrentFood([row, column])
  }

  // useEffect(() => {
  //   if(currentSnake[currentSnake.length -1][0] < 0 || currentSnake[currentSnake.length -1][1] < 0 || currentSnake[currentSnake.length -1][0] >= boardSize || currentSnake[currentSnake.length -1][1] >= boardSize) {
  //     setIsGameOver(true)
  //   }
  // }, [...currentSnake])

  const onkeyPress = (event) => {
      if(event.code === "ArrowRight") {
        let temp = currentSnake
        if(currentSnake[currentSnake.length -1][0] === currentFood[0] && currentSnake[currentSnake.length -1][1] === currentFood[1]) {
          temp.push([currentFood[0], currentFood[1]])
          setCurrentSnake([...temp])
          console.log(temp)
          setRandomFood()
        } else {
          temp.shift()
          let lastValue = currentSnake[currentSnake.length-1]
          setCurrentSnake([...temp, [lastValue[0], lastValue[1]+1]])
        }
      }
      if(event.code === "ArrowLeft") {
        let temp = currentSnake
        console.log(currentSnake[currentSnake.length -1][0] === currentFood[0] && currentSnake[currentSnake.length -1][1] === currentFood[1])
        if(currentSnake[currentSnake.length -1][0] === currentFood[0] && currentSnake[currentSnake.length -1][1] === currentFood[1]) {
          temp.push([currentFood[0], currentFood[1]])
          setCurrentSnake([...temp])
          console.log(temp)
          setRandomFood()
        } else {
          temp.shift()
          let lastValue = currentSnake[currentSnake.length-1]
          setCurrentSnake([...temp, [lastValue[0], lastValue[1]-1]])
        }
      }
      if(event.code === "ArrowDown") {
        let temp = currentSnake
        if(currentSnake[currentSnake.length -1][0] === currentFood[0] && currentSnake[currentSnake.length -1][1] === currentFood[1]) {
          temp.push([currentFood[0], currentFood[1]])
          setCurrentSnake([...temp])
          setRandomFood()
        } else {
          temp.shift()
          let lastValue = currentSnake[currentSnake.length-1]
          setCurrentSnake([...temp, [lastValue[0]+1, lastValue[1]]])
        }
      }
      if(event.code === "ArrowUp") {
        let temp = currentSnake
        if(currentSnake[currentSnake.length -1][0] === currentFood[0] && currentSnake[currentSnake.length -1][1] === currentFood[1]) {
          temp.push([currentFood[0], currentFood[1]])
          setCurrentSnake([...temp])
          setRandomFood()
        } else {
          temp.shift()
          let lastValue = currentSnake[currentSnake.length-1]
          setCurrentSnake([...temp, [lastValue[0]-1, lastValue[1]]])
        }
      }
      
  }

  const getCellClass = (rowIndex, columnIndex) => {

    if(rowIndex === currentFood[0] && columnIndex === currentFood[1]) {
      return "foodCell"
    } 
    for(let i = 0; i < currentSnake.length; i++) {
      if(rowIndex === currentSnake[i][0] && columnIndex === currentSnake[i][1]) {
        return "snakeCell"
      }
    }
    return "cell"
  }


  return (
    <div className="App">
      <input onKeyDown={(event) => onkeyPress(event)}/>
      {board.map((row, rowIndex) => (
        <div className="cellRow">
          {row.map((column, columnIndex) => (
                <span className={getCellClass(rowIndex, columnIndex)}></span> 
          ))}
        </div>
      ))}
      <div>
        {isGameOver && <h3>game over!</h3>}
      </div>
    </div>
  );
}

export default App;
