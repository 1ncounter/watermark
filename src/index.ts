import { loadMarks } from './apiLoad'
import { removeNode } from './apiRemove'
import { CreateMark } from './createMark'
import { createAttributesObserver, createResizeObserver } from './observer'

export interface Options {
  text?: string
  img?: string
  spacing?: number
  width?: number
  height?: number
  fontSize?: number
  color?: string
  fontFamily?: string
  alpha?: number
  angle?: number
  force?: boolean
  resize?: boolean
  createMark?: CreateMark
}

export const defaultOptions: Options = {
  width: 150,
  height: 50,
  spacing: 0,
  fontFamily: 'Helvetica, "PingFang SC", "Microsoft YaHei", "微软雅黑"',
  color: '#000000',
  fontSize: 24,
  alpha: 0.15,
  angle: 30,
  resize: true
}

interface WaterMark {
  mount: Function
  load: Function
  unload: Function
  unMount: Function
}

const CONTAINER_ID = 'watermark_container'

export function create(options?: Options): WaterMark {
  const mergeOptions = Object.assign({}, defaultOptions, options)

  let wrapContainer: HTMLElement
  let shadowRoot: HTMLElement
  let mObserver: MutationObserver | null
  let rObserver: ResizeObserver

  function mount(container?: string | HTMLElement) {
    if (container) {
      if (typeof container === 'string') {
        wrapContainer = document.getElementById(container) as HTMLElement
      } else {
        wrapContainer = container
      }
    } else {
      container = document.createElement('div') as HTMLDivElement
      container.id = CONTAINER_ID

      document.body.appendChild(container)

      wrapContainer = container
    }

    if (getComputedStyle(wrapContainer).position === 'static') {
      wrapContainer.style.position = 'relative'
    }

    if (mergeOptions.resize) {
      rObserver = createResizeObserver(wrapContainer, () => {
        load()
      })
    } else {
      load()
    }
  }

  function load() {
    if (shadowRoot) removeNode(shadowRoot)
    shadowRoot = loadMarks(wrapContainer, mergeOptions)

    if (mergeOptions.force) {
      mObserver = createAttributesObserver(shadowRoot)
    }
  }

  function unload() {
    if (!shadowRoot) {
      throw new Error('Watermark is not loaded. Plead load it!')
    }

    if (mObserver) mObserver.disconnect()
    removeNode(shadowRoot)
  }

  function unMount() {
    if (!wrapContainer) {
      throw new Error('Document has not watermark now. Please mount it!')
    }

    if (shadowRoot) unload()
    if (rObserver) rObserver.disconnect()
    removeNode(wrapContainer)
  }

  return {
    mount,
    load,
    unload,
    unMount
  }
}
