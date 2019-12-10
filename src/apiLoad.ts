import { Options } from './index'
import { createMark } from './createMark'

export const loadMarks = (container: HTMLElement, options: Options) => {
  let shadowRoot
  const root = document.createElement('div')
  const styleText = `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    overflow: hidden;
  `

  root.setAttribute('style', styleText)
  container.appendChild(root)

  // shadow dom compatibility
  if (document.body.attachShadow) {
    shadowRoot = root.attachShadow({ mode: 'closed' })
  } else {
    shadowRoot = root
  }

  const createMarkFunc = options.createMark ? options.createMark : createMark

  const { width, height } = root.getBoundingClientRect()
  const oWidth = options.width as number
  const oHeight = options.height as number
  const spacing = options.spacing as number
  const rows = Math.ceil(width / (oWidth + spacing))
  const cols = Math.ceil(height / oHeight)

  for (let i = -1; i <= rows; i++) {
    for (let j = -1; j <= cols; j++) {
      const mark = createMarkFunc(options)

      mark.style.left = i * oWidth + spacing + 'px'
      mark.style.top = j * oHeight + spacing + 'px'

      shadowRoot.appendChild(mark)
    }
  }

  return root
}
