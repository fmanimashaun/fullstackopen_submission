const isEqual = (first, second) => {
  // Check if the types are the same
  if (typeof first !== typeof second) return false;

  // If they are not objects (like if they are numbers or strings), compare them directly
  if (typeof first !== 'object' || first === null || second === null) return first === second;

  // Create copies of the objects to avoid modifying the originals
  let firstCopy = { ...first };
  let secondCopy = { ...second };

  // Remove the 'id' property from the copies
  delete firstCopy.id;
  delete secondCopy.id;

  // Compare the number of keys
  const firstKeys = Object.keys(firstCopy);
  const secondKeys = Object.keys(secondCopy);
  if (firstKeys.length !== secondKeys.length) return false;

  // Check each key in firstCopy to see if it is in secondCopy and if it has the same value
  for (let key of firstKeys) {
    if (!secondCopy.hasOwnProperty(key)) return false;
    if (!isEqual(firstCopy[key], secondCopy[key])) return false;
  }

  // If none of the above checks failed, the objects are deep-equal
  return true;
}


export { isEqual };
