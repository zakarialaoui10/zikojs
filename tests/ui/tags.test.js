import { tags, ZikoUIElement } from 'ziko/ui'
import { expect, test} from 'vitest'

test('test tags', ()=>{
    const para = tags.p('Hello world!')
    expect(para).toBeInstanceOf(ZikoUIElement)
    expect(para.element).toBeInstanceOf(HTMLParagraphElement)
    expect(para.element.textContent).toBe('Hello world!')
})