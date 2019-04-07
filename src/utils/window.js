export function getWindowHash() {
  return window.location.hash.substring(1);
}


export function maybeUpdateWindowHash(newHash) {
  let currentHash = getWindowHash();
  if (currentHash !== newHash) {
    window.location.hash = newHash;
  };
}
