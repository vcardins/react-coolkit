export interface IErrorService {
	onAdd: (e: Error) => void;
	onClear: () => void;
}
