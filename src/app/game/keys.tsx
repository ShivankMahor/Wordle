'use client';

import { useEffect, useState } from "react";
import { useGame } from "../components/provider";

export default function Keys({Row,offset}:{Row:string,offset:number}){
	const game = useGame();
	var wrongWords = game?.wrongWords;
	useEffect(()=>{
		wrongWords = game?.wrongWords;
	},[game?.wrongWords])

	function handleClick(e:string,index:number){
		const element = document.getElementById(`char-${index}`);
    if (element) {
      element.classList.add('scale-down');
      setTimeout(() => {
        element.classList.remove('scale-down');
      }, 150);
    }
		switch(e){
			case 'Enter' : {game?.submit(); break;}
			case 'Backspace' : {game?.removeChar(); break;}
			default : {
				game?.typeChar(e);
			}
		}
	}
		return (
		<div className="flex gap-2">
			<style jsx>{`
        .scale-down {
          transform: scale(0.92);
          transition: transform 0.1s ease-in-out;
        }
      `}</style>
		{Row.split('').map((char,index) => (
			<div id={`char-${index+offset}`} onClick={()=>handleClick(char,index+offset)} key={index} className={`select-none cursor-pointer font-extrabold shadow-md shadow-black/50 rounded-md flex items-center justify-center h-[42px] w-[30px] md:w-[55px] md:h-[55px] ${game?.correctWords?.includes(char.toUpperCase())? 'bg-[#538d4e] text-gray-100' : game?.wrongWords?.includes(char.toUpperCase()) ? 'bg-[#b59f3b] text-gray-100' : game?.usedWords.includes(char.toUpperCase()) ? "bg-[#25292c] text-gray-400/60" :'bg-gray-400/80 text-gray-100'}`}>{char}</div>
		))}
		</div>	
	)
}