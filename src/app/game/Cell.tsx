"use client";
import { useGame } from "../components/provider"

export default function Cell({props,row,col}:{props:string,row:number,col:number}){

	const game = useGame()
	// const element = document.getElementById(`char-${row}-${col}`);
  //   if (element && game?.position[row][col] === 2 && game.row === row + 1 ) {
  //     element.classList.add('scale-down');
  //     setTimeout(() => {
  //       element.classList.remove('scale-down');
  //     }, 150);
  //   }

	return (
		<>
		<div id={`char-${row}-${col}`} className={` ${game?.position[row][col] === 2 ? 'bg-[#538d4e]' : game?.position[row][col] === 1 ? 'bg-[#b59f3b]' : game?.position[row][col] === 0 ?'bg-gray-400/40':'' }
			border-2 border-gray-400/80 .scale-down flex justify-center items-center w-[55px] h-[55px] text-3xl text-gray-300 font-extrabold
			`}>
				{props}
		</div>
		{/* <style jsx>{`
        .scale-down {
          transform: scale(1.1);
          transition: transform 0.1s ease-out;
        }
      `}</style> */}
		</>
	)
}