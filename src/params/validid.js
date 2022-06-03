import objectid from 'validate-objectid'
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return objectid(param);
  }