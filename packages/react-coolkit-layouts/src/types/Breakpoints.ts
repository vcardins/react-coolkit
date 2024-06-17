export enum Breakpoints {
	XS = 'XS',
	SM = 'SM',
	MD = 'MD',
	LG = 'LG',
	XL = 'XL',
	XXL = 'XXL',
}

export const BreakpointsRange = {
	[Breakpoints.XS]: { min: 480, max: 640 },
	[Breakpoints.SM]: { min: 640, max: 768 },
	[Breakpoints.MD]: { min: 768, max: 1024 },
	[Breakpoints.LG]: { min: 1024, max: 1280 },
	[Breakpoints.XL]: { min: 1280, max: 1526 },
	[Breakpoints.XXL]: { min: 1526, max: 0 },
};

export const BreakpointsMap = Object.keys(BreakpointsRange).reduce((result, bp) => {
	const breakpoint = bp as Breakpoints;
	const { min, max } = BreakpointsRange[breakpoint];

	result[breakpoint] = `(min-width: ${min}px) ${max ? `and (max-width: ${max}px)` : ''}`;

	return result;
}, {} as Record<Breakpoints, string>);

