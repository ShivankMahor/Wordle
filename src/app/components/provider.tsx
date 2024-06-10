'use client';
import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch, useRef  } from "react";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Dictonary from '../../words'
interface GameContextType {
	wordArray: string[];
	typeChar:(char:string) => void;
	removeChar:() => void;
	submit:() => void;
	position:number[][];
	wordToGuess:string;
	correctWords:string[];
	wrongWords:string[];
	usedWords:string[];
	status:string;
	row:number
	reset:()=>void;
}

const GameContext = createContext< GameContextType | undefined >(undefined);
let temp = Dictonary[Math.floor(Math.random()*Dictonary.length-1)];
const wordLength = 5;
export const GameProvider = ({children}:{children: ReactNode}) => {
	
	const initialArray:string[] = [''];
	const [wordArray, setWordArray] = useState< string[] >(initialArray)
	const [row, setRow] = useState<number>(0)
	const [correctWords, setCorrectWords] = useState<string[]>([])
	const [wrongWords, setWrongWords] = useState<string[]>([])
	const [wordToGuess, setWordToGuess] = useState(temp)
	const [usedWords, setUsedWords] = useState<string[]>([])
	const [status, setStatus] = useState<string>('playing');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	function initializeArray(rows:number, cols:number) {
	
		let array:number[][] = [];
    for (let i = 0; i < rows; i++) {
			array[i] = [];
			for (let j = 0; j < cols; j++) {
				array[i][j] = -1;
			}
    }
    return array;
	}
	

	let initialPosition = initializeArray(7, 5);
	const [position, setPosition] = useState< number[][]>(initialPosition);

	function typeChar(char:string){
		if(wordArray[row].length < wordLength ){
			var newArray = [...wordArray];
			newArray[row] += char;
			setWordArray(newArray)
		}
	}
	function won(){
		setStatus("win");
		if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setStatus("newGame");
    }, 1500);
	}
	function lose() {
    setStatus("lose");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setStatus("newGame");
    }, 2000);
  }

	function reset(){
		setWordToGuess(Dictonary[Math.floor(Math.random()*Dictonary.length-1)]);
		setRow(0);
		console.log(wordToGuess)
		setWordArray(initialArray);
		initialPosition = initializeArray(6, 5);
		setPosition(initialPosition);
		setWrongWords([]);
		setCorrectWords([]);
		setUsedWords([]);
		setStatus("playing");
	}
	async function submit(){

		if(wordArray[row].length == wordLength){
			var newArray = [...wordArray];
			if(wordToGuess === newArray[row].toLocaleLowerCase()){
				await getCorrectWords()
				await checkWord()
				won();
			}
			else if(row === 5 && wordToGuess !== newArray[row].toLocaleLowerCase()){
				await checkWord()
				await getWrongWords();
				await getCorrectWords();
				await getUsedWords()
				lose();
			}else if(Dictonary.includes(wordArray[row].toLocaleLowerCase())){
				newArray.push('');
				setRow(prev => prev+1);
				setWordArray(newArray)
				checkWord()
				getWrongWords();
				getCorrectWords();
				getUsedWords()
			}else{
				// alert('Word not found')
				Toastify({
					text: "Word not found",
					duration: 800, // Duration in milliseconds
					close: false, // Show a close button
					gravity: "top", // Position the toast at the top
					position: "center", // Center the toast horizontally
					backgroundColor: "#424249", // Custom background color
				}).showToast();
			}

		}
	}
	function removeChar(){
		if(wordArray[row].length <= wordLength){
			var newArray = [...wordArray];
			newArray[row] = newArray[row].slice(0,newArray[row].length-1) 
			setWordArray(newArray)
		}
	}
	async function checkWord(){
		const guessedWord = wordArray[row].toLocaleLowerCase();
		if(Dictonary.includes(guessedWord.toLowerCase())){
			let temp = position;
			guessedWord.split('').map((letter,index)=>{
				if(wordToGuess[index] === letter){
					temp[row][index] = 2;
				}
				else if(wordToGuess.includes(letter)){
					temp[row][index] = 1;
				}else{
					temp[row][index] = 0;
				}
			})
			setPosition(temp);
		}
		console.log(guessedWord)
		return true;
	}

	async function getWrongWords(){
		let newArray = [...wordArray];
		let joinedGusses = newArray.reduce((accumulator, currentValue) => accumulator + currentValue, '');
		newArray = joinedGusses.split('').filter(char => (wordToGuess.toUpperCase().includes(char.toUpperCase())))
		setWrongWords(newArray)
	}
	async function getCorrectWords() {
		let newArray = [...wordArray];
		let temp1: string[] = [];  // Initialize temp1 as an array of strings
	
		newArray.forEach(word => {
			word.split('').forEach((char, index) => {
				if (wordToGuess[index] === char.toLowerCase()) {
					temp1.push(char); 
				}
			});
		});
	
		setCorrectWords(temp1);
	}
	async  function getUsedWords(){
		let newArray = [...wordArray];
		let joinedGusses = newArray.reduce((accumulator, currentValue) => accumulator + currentValue, '');
		newArray = joinedGusses.split('').filter(char => !(wordToGuess.toUpperCase().includes(char.toUpperCase())))
		setUsedWords(newArray)
	}



	return (
		<GameContext.Provider value={{reset,wordArray,status,typeChar,removeChar,submit,position,wordToGuess,correctWords,wrongWords,usedWords,row}}>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => {
	const context = useContext(GameContext);
	return context;
}