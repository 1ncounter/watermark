import { Options } from './index'
import { createMark } from './createMark'

export const loadMarks = (container: HTMLElement, options: Options) => {
  
  const root = document.createElement('div')
  const styleText = `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    overflow: hidden;
    pointer-events: none;
  `

  root.setAttribute('style', styleText)
  container.appendChild(root)

  // shadow dom compatibility
  const shadowRoot = root.attachShadow({ mode: 'closed' })

  const createMarkFunc = options.createMark ? options.createMark : createMark
  const { width, height } = root.getBoundingClientRect()
  const oWidth = options.width
  const oHeight = options.height

  let spacingX: number
  let spacingY: number
  if (typeof options.spacing === 'number') {
    spacingX = options.spacing
    spacingY = options.spacing
  } else {
    spacingX = options.spacing.x
    spacingY = options.spacing.y
  }

  const rows = Math.ceil(width / (oWidth + spacingX))
  const cols = Math.ceil(height / (oHeight + spacingY))

  for (let i = -1; i <= rows; i++) {
    for (let j = -1; j <= cols; j++) {
      const mark = createMarkFunc(options)

      mark.style.left = i * (oWidth + spacingX) + 'px'
      mark.style.top = j * (oHeight + spacingY) + 'px'

      shadowRoot.appendChild(mark)
    }
  }

  return root
}
