export enum HttpRequestMethod {
	// The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
	GET = 'get',
	// The HEAD method asks for a response identical to a GET request, but without the response body.
	HEAD = 'head',
	// The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
	POST = 'post',
	// The PUT method replaces all current representations of the target resource with the request payload.
	PUT = 'put',
	// The DELETE method deletes the specified resource.
	DELETE = 'delete',
	// The PATCH method applies partial modifications to a resource.
	PATCH = 'patch',
}
