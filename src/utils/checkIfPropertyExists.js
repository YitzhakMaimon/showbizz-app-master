export const checkIfObjectExists = (object, attribute, defaultValuew = "") =>
  object.hasOwnProperty(attribute) ? object[attribute] : defaultValuew;

function safelyParseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return [];
  }
}

export const checkIfArrayExists = (object, attribute) =>
  object.hasOwnProperty(attribute) ? safelyParseJSON(object[attribute]) : [];
