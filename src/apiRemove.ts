export const removeNode = (container: string | HTMLElement) => {
  let node: HTMLElement | ShadowRoot | null

  if (typeof container === 'string') {
    node = document.getElementById(container)
  } else {
    node = container
  }

  if (node) {
    const parentNode = node.parentNode
    if (parentNode) parentNode.removeChild(node)
  }
}
