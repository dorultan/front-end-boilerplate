import get from "lodash/get";

export default new class Config {
  get(config, key, defaultValue = null) {
    return get(config, key, defaultValue);
  }
}
