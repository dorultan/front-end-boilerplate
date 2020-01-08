const METHODS_WITH_BODY = [
  'POST',
  'PUT',
  'PATCH',
];

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
};

export default new class Api {
  #requests = {};

  #sendRequest = (endpoint, method, data = {}, headers = {}) => new Promise(async resolve => {
    const requestId = Date.now();
    const apiEndpoint = navigator.userAgent === 'ReactSnap' && process.env.APP_ENV === 'local' ? 'http://nginx' : '';

    endpoint = `${apiEndpoint}/api/${endpoint.replace(/(^\/api\/)|(^api\/)|(^\/)/, '')}`;

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
      this.#requests[requestId] = new AbortController();
      const res = await fetch(endpoint, {
        method,
        headers,
        body,
        qs,
        signal: this.#requests[requestId].signal,
      });

      delete this.#requests[requestId];

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

  get(endpoint, data = {}) {
    return this.#sendRequest(endpoint, 'GET', data);
  }

  post(endpoint, data = {}) {
    return this.#sendRequest(endpoint, 'POST', data);
  }

  put(endpoint, data = {}) {
    return this.#sendRequest(endpoint, 'PUT', data);
  }

  patch(endpoint, data = {}) {
    return this.#sendRequest(endpoint, 'PATCH', data);
  }

  cancel() {
    for (const requestId in this.#requests) {
      if (!this.#requests.hasOwnProperty(requestId)) {
        continue;
      }
      this.#requests[requestId].abort();
    }
  }
}
