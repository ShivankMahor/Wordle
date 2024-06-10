"use client";
import { useEffect, useMemo, useState } from "react";
import { useGame } from "./components/provider";
import Row from "./game/Row";
import Keyboard from "./game/keyboard";
import Help from "./components/help";
const AlphabetArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export default function Home(){
  const [help, setHelp] = useState(false) // true for hiding 
	const game = useGame();
	if (!game) {
    return <div>Loading...</div>; // or handle the error appropriately
	}
	useEffect(() => {
    function handleKeyDown(event:KeyboardEvent) {
			if(event.key === 'Backspace'  && game?.status === 'playing'){
				game?.removeChar();
			}else if(event.key === 'Enter' && game?.status === 'playing'){
				game?.submit();
			}
			else if(AlphabetArray.includes(event.key.toUpperCase())){
				game?.typeChar(event.key.toUpperCase());
			}
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [game]);

  function handleClickShow(){
    setHelp(false);
  }
  function handleClickHide(){
    setHelp(true);
  }
  let wordArray = game.wordArray
  let paddedArray= wordArray;
  if(wordArray.length <= 6 ){
    paddedArray = [...wordArray, ...Array(6 - wordArray.length).fill(' ')].slice(0, 6);
  }

  function handleReset(){
    game?.reset();
  }
  return (
    <div className="h-screen bg-[#181818]">
      <div className="text-center text-4xl text-white p-4 border-b-[1px] border-gray-500 font-bold">
        <div>Wordle</div>
        <img onClick={handleClickShow} className="absolute right-5 w-9 top-4" src="./h.png" alt="Help" />
        </div>
      <div className="flex flex-col justify-normal pt-4 items-center bg-[#181818]">
        <div className="grid grid-rows-6 gap-1 h-fit mt-8 md:mt-0">
          {paddedArray.map((word,index)=>(
            <Row key={index} props={word} row={index}></Row>
          ))}
        </div>
        {game.status === 'newGame' && (
        <>
          <div className="text-white font-bold mt-2">Correct Word is <span className="text-[#538d4e]">{game.wordToGuess.toUpperCase()}</span></div>
          <div onClick={handleReset} className="text-white z-10 px-4 bg-[#424249] rounded-md py-2 mt-3 cursor-pointer">Play Again</div>
        </>  
        )}
        <Keyboard></Keyboard>
      </div>

      {(game.status === "lose" || game.status === "win") &&
        (
          <div className="absolute w-full h-full inset-0 m-auto flex justify-center items-center text-white bg-black/80 p-16 rounded-md">
            <div className="md:p-16 p-8 bg-[#202223] rounded-md popup">
              {game?.status === "win" ? "Nice you have Guessed the right Word" : 'Oops you failed to guess the correct Word'}
            </div>
          </div>
      )}
      {help === false && <Help handleClickHide={handleClickHide}></Help>}
    </div>
	)
}