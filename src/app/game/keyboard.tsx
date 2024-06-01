'use client';

import { useEffect, useState } from "react";
import { useGame } from "../components/provider";
import Keys from "./keys";

const Row1 = "QWERTYUIOP";
const Row2 = "ASDFGHJKL"
const Row3 = "ZXCVBNM"
export default function Keyboard(){
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
      }, 200);
    }
		switch(e){
			case 'Enter' : {game?.submit(); break;}
			case 'Backspace' : {game?.removeChar(); break;}
			default : {}
		}
	}
	return(
		
		<div className="flex flex-col items-center gap-2 mt-32 md:mt-8 ">
			<style jsx>{`
        .scale-down {
          transform: scale(0.95);
          transition: transform 0.1s ease-in-out;
        }
      `}</style>
			<Keys Row={Row1} offset={50}></Keys>
			<Keys Row={Row2} offset={70}></Keys>
			<div className="flex gap-2">
				<div id={`char-${100}`} onClick={()=>handleClick('Enter',100)} className={`select-none cursor-pointer font-extrabold shadow-md shadow-black/50 rounded-md flex items-center justify-center md:text-md text-xs md:h-[55px] h-[42px] w-[45px] md:w-[80px] bg-gray-400/80 text-gray-100`}>ENTER</div>
				<Keys Row={Row3} offset={90}></Keys>
				<div id={`char-${101}`} onClick={()=>handleClick('Backspace',101)}  className={`select-none cursor-pointer font-extrabold shadow-md shadow-black/50 rounded-md flex items-center justify-center h-[42px] w-[35px] px-1 md:h-[55px] md:w-[60px] bg-gray-400/80 text-gray-100`}>⌫</div>
			</div>
		</div>
	)
}