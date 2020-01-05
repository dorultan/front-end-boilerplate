import get from "lodash/get";

export default new class Content {
  get(content, key, defaultValue = '') {
    return get(content, key, defaultValue);
  }

  getWithData(content, key, data = {}, defaultValue = '') {
    let string = get(content, key, defaultValue);
    for (const name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }
      string = string.replace(`:${name}:`, data[name]);
    }
    return string;
  }
}
