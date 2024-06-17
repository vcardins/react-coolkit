// https://github.com/miragejs/examples/tree/master/react-typescript

import { faker } from '@faker-js/faker';
import { createServer, Factory, Model } from 'miragejs';

import { Person } from '../app/types/Person';

export function makeServer({ environment = 'test' }) {
	return createServer({
		environment,

		factories: {
			person: Factory.extend<Partial<Person>>({
				get firstName() {
					return faker.person.firstName();
				},
				get lastName() {
					return faker.person.lastName();
				},
				get name() {
					return faker.person.fullName();
				},
				get streetAddress() {
					return faker.location.streetAddress();
				},
				get cityStateZip() {
					return faker.helpers.fake(
						'{{address.city}}, {{address.stateAbbr}} {{address.zipCode}}',
					);
				},
				get phone() {
					return faker.phone.number();
				},
				get username() {
					return faker.internet.userName();
				},
				get password() {
					return faker.internet.password();
				},
				get email() {
					return faker.internet.email();
				},
				get avatar() {
					return faker.image.avatar();
				},
			}),
		},

		models: {
			person: Model.extend<Partial<Person>>({}),
		},

		routes() {
			this.namespace = 'api';

			this.get('people');
		},

		seeds(server) {
			server.createList('person', 20);
		},
	});
}
