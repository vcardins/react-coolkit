export const getExpiration = (idTokenExpire = 0) => {
	const now = new Date();
	const currentTimeSeconds = Math.round(now.valueOf() / 1000);
	const expiredInSeconds = Math.round(idTokenExpire - currentTimeSeconds);
	const expiredInMinutes = Math.round(expiredInSeconds / 60);
	const expireAt = new Date(now.getTime() + expiredInMinutes * 60000);

	return {
		seconds: expiredInSeconds,
		minutes: expiredInMinutes,
		at: expireAt,
	};
};
