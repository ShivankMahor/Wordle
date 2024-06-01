"use client";

import Cell from "./Cell";

export default function Row({props,row}:{props:string,row:number}){
	const paddedProps = props.padEnd(5, ' ');
	return (
		<div className="grid grid-cols-5 gap-2 ">
      {paddedProps.split('').map((char,index)=>(
				<Cell key={index} props={char} row={row} col={index}></Cell>
			))}
    </div>
	)
}