const METHODS_WITH_BODY = [
  'POST',
  'PUT',
  'PATCH',
];

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
};

const requests = {};

const sendRequest = (endpoint, method, data = {}, headers = {}) => new Promise(async resolve => {
  const requestId = Date.now();

  endpoint = `${process.env.API_ENDPOINT}/api/${endpoint.replace(/(^\/api\/)|(^api\/)|(^\/)/, '')}`;

  headers = {...DEFAULT_HEADERS, ...headers};

  let body, qs;

  if (METHODS_WITH_BODY.indexOf(method) > -1) {
    const formData = new FormData();
    for (const name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }
      formData.append(name, data[name]);
    }
    body = formData;
  } else {
    qs = data;
  }

  let errors = [];
  let responseBody = null;
  let status = 500;
  let ok = false;

  try {
    requests[requestId] = new AbortController();
    const res = await fetch(endpoint, {
      method,
      headers,
      body,
      qs,
      signal: requests[requestId].signal,
    });

    delete requests[requestId];

    status = res.status;
    ok = res.ok;

    try {
      const json = await res.json();
      errors = json.errors || [];
      delete json.errors;
      responseBody = json;
    } catch {
      // Ignore JSON parse errors
    }
  } catch (err) {
    errors = ['Server error'];
    console.error(err.message);
  }

  resolve({
    ok,
    status,
    errors,
    body: responseBody,
  });
});

export default {
  get: (endpoint, data = {}) => sendRequest(endpoint, 'GET', data),
  post: (endpoint, data = {}) => sendRequest(endpoint, 'POST', data),
  put: (endpoint, data = {}) => sendRequest(endpoint, 'PUT', data),
  patch: (endpoint, data = {}) => sendRequest(endpoint, 'PATCH', data),
  cancel: () => {
    for (const requestId in requests) {
      if (!requests.hasOwnProperty(requestId)) {
        continue;
      }
      requests[requestId].abort();
    }
  },
}
