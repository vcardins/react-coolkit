import { memo } from 'react';

import useSWR from 'swr';

import { fetchPeople } from './fetchers';

const Dashboard = memo(() => {
	const { data, error } = useSWR('/api/people', fetchPeople);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;

	return (
		<>
			{/* <div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div> */}
			<h1>Vite + React</h1>
			<div>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
