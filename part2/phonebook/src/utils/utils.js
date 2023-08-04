function isEqual(first, second) {
  // Check if the types are the same
  if (typeof first !== typeof second) return false;

  // If they are not objects (like if they are numbers or strings), compare them directly
  if (typeof first !== 'object' || first === null || second === null) return first === second;

  // Compare the number of keys
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  if (firstKeys.length !== secondKeys.length) return false;

  // Check each key in first to see if it is in second and if it has the same value
  for (let key of firstKeys) {
    if (!second.hasOwnProperty(key)) return false;
    if (!isEqual(first[key], second[key])) return false;
  }

  // If none of the above checks failed, the objects are deep-equal
  return true;
}

export { isEqual };
