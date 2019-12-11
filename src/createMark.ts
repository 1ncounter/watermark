import { Options } from './index'

export interface CreateMark {
  (options: Options): HTMLElement
}

export const createMark: CreateMark = options => {
  const styleText = `
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: ${options.spacing}px;
    width: ${options.width}px;
    height: ${options.height}px;
    opacity: ${options.alpha};
    transform: rotate(-${options.angle}deg);
    user-select: none;
    overflow: hidden;
  `
  const textStyle = `
    font-size: ${options.fontSize}px;
    font-family: ${options.fontFamily};
    color: ${options.color};
    overflow-wrap: break-word;
    word-wrap: break-word;
  `
  const imgStyle = `
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  `

  const node = document.createElement('div')

  if (options.img) {
    node.setAttribute('style', styleText + imgStyle)
    node.style.backgroundImage = `url(${options.img})`
  } else {
    node.setAttribute('style', styleText + textStyle)
    node.innerText = options.text || 'watermark'
  }

  return node
}
