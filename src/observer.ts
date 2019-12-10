import ResizeObserver from 'resize-observer-polyfill'

export function createAttributesObserver(targetNode: HTMLElement) {
  const observerOptions = {
    attributes: true
  }

  function mutationCallback(mutationsList: MutationRecord[]) {
    for (const mutation of mutationsList) {
      const type = mutation.type

      switch (type) {
        case 'attributes':
          if (mutation.attributeName === 'style') {
            const target = mutation.target as HTMLElement
            const { width, height, display, visibility } = getComputedStyle(target)

            if (display === 'none') target.style.display = 'block'
            if (visibility === 'hidden') target.style.visibility = 'visible'
            if (width === '0px') target.style.width = 'auto'
            if (height === '0px') target.style.height = 'auto'
          }

          break
        default:
          break
      }
    }
  }

  if (window.MutationObserver) {
    const observer = new MutationObserver(mutationCallback)

    observer.observe(targetNode, observerOptions)

    return observer
  } else {
    return null
  }
}

export function createResizeObserver(target: HTMLElement, handleResize: Function) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      handleResize(entry)
    }
  })

  observer.observe(target)

  return observer
}
