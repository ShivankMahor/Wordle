// src/toastify-js.d.ts
declare module 'toastify-js' {
	interface Options {
			text: string;
			duration?: number;
			close?: boolean;
			gravity?: 'top' | 'bottom';
			position?: 'left' | 'center' | 'right';
			backgroundColor?: string;
			className?: string;
			stopOnFocus?: boolean;
			onClick?: () => void;
	}
	
	export default function Toastify(options: Options): { showToast: () => void };
}
