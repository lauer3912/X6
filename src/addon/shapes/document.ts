import * as util from '../../util'
import { Actor } from '../../shape'
import { SvgCanvas2D } from '../../canvas'
import { Rectangle } from '../../struct'
import { registerShape } from '../../core'
import { getFactor } from './util'

export class DocumentShape extends Actor {
  factor: number = 0.3

  getLabelMargins(rect: Rectangle) {
    if (util.getBoolean(this.style, 'boundedLbl', false)) {
      const dy = getFactor(this.style, this.factor, rect.height)
      return new Rectangle(0, 0, 0, dy)
    }

    return null
  }

  redrawPath(
    c: SvgCanvas2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    const dy = getFactor(this.style, this.factor, h)
    const fy = 1.4

    c.moveTo(0, 0)
    c.lineTo(w, 0)
    c.lineTo(w, h - dy / 2)
    c.quadTo(w * 3 / 4, h - dy * fy, w / 2, h - dy / 2)
    c.quadTo(w / 4, h - dy * (1 - fy), 0, h - dy / 2)
    c.lineTo(0, dy / 2)
    c.close()
  }
}

registerShape('document', DocumentShape)
