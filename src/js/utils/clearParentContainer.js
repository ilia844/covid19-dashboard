export default function clearParentContainer(target) {
  while (target.children.length) {
    target.removeChild(target.lastChild);
  }
}
