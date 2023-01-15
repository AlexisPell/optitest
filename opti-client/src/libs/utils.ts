export function getSubStringBySpaceId(string: string, id: number) {
  let substrings = string.split(' ');
  substrings = substrings.slice(id);
  return substrings.join('');
}
