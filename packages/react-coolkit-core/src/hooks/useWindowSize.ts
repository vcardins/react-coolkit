import { useEffect, useState } from 'react';

interface WindowSize {
	width: number | undefined;
	height: number | undefined;
}

export const useWindowSize = (): WindowSize => {
	// we check if window is defined
	const isClient = typeof window === 'object';

	// prepare initialState to have some values before resizing
	const initialState: WindowSize = {
		width: isClient ? window.innerWidth : undefined,
		height: isClient ? window.innerHeight : undefined,
	};

	const [width, setWidth] = useState<number | undefined>(initialState.width);
	const [height, setHeight] = useState<number | undefined>(initialState.height);

	// function we pass to event listener
	const handleResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		if (!isClient) {
			return;
		}

		window.addEventListener('resize', handleResize);

		// remove event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	}, [isClient]);

	return {
		width,
		height,
	};
};
