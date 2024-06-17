import { PeopleResponse } from '../../types/Person';

export const fetchPeople = (url: string) =>
	fetch(url).then<PeopleResponse>((r) => r.json());
