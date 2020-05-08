<h1 align="center">watermark</h1>

<h5 align="center">fast, easy, Watermarking for the browser, by shadow dom.</h5>

<br />

```typescript
import Watermark from '@1ncounter/watermark'

const watermark = Watermark.create()
watermark.mount()
```

## Installation

npm

```
npm install @1ncounter/watermark
```

yarn

```
yarn add @1ncounter/watermark
```

## An Quick Sample

```typescript
import { create } from '@1ncounter/watermark'

const Watermark = create({
  // options
  text: 'watermark'
})

Watermark.mount(document.getElementById('app'))
```

## API

```js
Watermark.load()
Watermark.unload()
Watermark.unMount()
```

## Options

| Option     | Description                                                                     | Type           | Default                                                 |
| :--------- | :------------------------------------------------------------------------------ | :------------- | :------------------------------------------------------ |
| text       | watermark content                                                               | string         | watermark                                               |
| img        | watermark can use img instead of text                                           | string         | -                                                       |
| spacing    |                                                                                 | number、object | 0                                                       |
| width      |                                                                                 | number         | 150                                                     |
| height     |                                                                                 | number         | 50                                                      |
| fontSize   |                                                                                 | number         | 24                                                      |
| color      |                                                                                 | string         | #000000                                                 |
| fontFamily |                                                                                 | string         | Helvetica, "PingFang SC", "Microsoft YaHei", "微软雅黑" |
| alpha      |                                                                                 | number         | 0.15                                                    |
| angle      |                                                                                 | number         | 30                                                      |
| force      | Enable forced mode to prevent watermarks from being deleted to a certain extent | boolean        | -                                                       |
| resize     | watermarks can change after container resize                                    | boolean        | -                                                       |
| createMark | create mark method, must return HTMLElement                                     | Function       | -                                                       |

## License

MIT
