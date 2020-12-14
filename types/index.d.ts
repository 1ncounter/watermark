import { Options, WaterMark  } from '../src'


declare namespace waterMark {
  function create(options: Partial<Options>): WaterMark
}

export = waterMark;
