import './help.css'
export default function Help({handleClickHide}:{handleClickHide:()=>void}){

	return(
		<div className="absolute top-0  bg-black/30 left-0 h-screen w-screen flex justify-center items-start pt-20">
          <div className="show-up text-white bg-[#202223] md:w-1/3 w-4/5 rounded-md md:p-12 p-4">
            
						<h1 className="text-2xl font-extrabold mb-4 ">How To Play</h1> 
            <h2 className="font-bold my-1 text-xl">Guess the Word in 6 tries.</h2>
            <ul className='list-disc ml-5 text-md'>
              <li>Each guess must be a valid 5-letter word.</li>
              <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul> 
            <h2 className="text-md font-bold mt-4">Examples</h2>
            <div className="my-2">
              <div className="flex gap-2 items-center ">
                <div className={`border-2 border-gray-400/80 flex bg-[#538d4e] justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>P</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>E</div>
                <div className={`border-2 border-gray-400/80  flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>A</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>C</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>E</div>
              </div>
              <h3 className="pt-1 text-sm">P is in the word and in the correct spot.</h3>
            </div>
            <div className="mt-4">
              <div className="flex gap-2 items-center ">
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>G</div>
                <div className={`border-2 border-gray-400/80 bg-[#b59f3b] flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>A</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>M</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>E</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>R</div>

              </div>
              <h3 className="pt-1 text-sm">A is in the word but in the wrong spot.</h3>
            </div>
            <div className="mt-4">
              <div className="flex gap-2 items-center ">
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>C</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>U</div>
                <div className={`border-2 border-gray-400/80 bg-gray-400/40 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>L</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>T</div>
                <div className={`border-2 border-gray-400/80 flex justify-center items-center min-w-[35px] min-h-[35px] text-xl text-gray-300 font-extrabold`}>S</div>
              </div>
              <h3 className="pt-1 text-sm">U is not in the word in any spot.</h3>
            </div>
						<div onClick={handleClickHide} className="text-center p-2 bg-[#424249] m-4 mx-8 rounded-md text-gray-400 font-bold hover:scale-110 hover:text-white transition-transform">OK, Got it</div>
          </div> 
        </div>
	)
}