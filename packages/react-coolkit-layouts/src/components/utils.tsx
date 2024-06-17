export const shouldForwardProp = (forwardProps: string[]) =>
	({ shouldForwardProp: (prop: string) => !forwardProps.includes(prop as string) });
