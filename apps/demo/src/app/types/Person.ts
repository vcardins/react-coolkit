export type Person = {
	id: string;
	firstName: string;
	lastName: string;
	name: string;
	streetAddress: string;
	cityStateZip: string;
	phone: string;
	username: string;
	password: string;
	email: string;
	avatar: string;
};

export type PeopleResponse = {
	people: Person[];
};
