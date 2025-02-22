import { useEffect, useRef } from 'react';

export function useOnceCall(cb: () => void, condition = true, cleanUp?: () => void) {
	const isCalledRef = useRef(false);

	useEffect(() => {
		if (condition && !isCalledRef.current) {
			isCalledRef.current = true;
			cb();
		}
		cleanUp?.();
	}, [cb, condition, cleanUp]);
}
