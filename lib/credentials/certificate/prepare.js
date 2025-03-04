"use strict";

module.exports = function(dependencies) {
  const load = dependencies.load;
  const parse = dependencies.parse;
  const validate = dependencies.validate;

  const logger = dependencies.logger;

  function loadAndValidate(credentials) {
    const loaded = load(credentials);
    let parsed;
    try {
      parsed = parse(loaded);
    } catch(err) {
      logger(err);
      return loaded;
    }
    parsed.production = credentials.production;
    try {
      validate(parsed);
    } catch(err) {
      console.error(err);
    }
    
    return loaded;
  }

  return loadAndValidate;
};
