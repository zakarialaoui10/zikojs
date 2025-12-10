import { complex, Complex} from 'ziko/math/complex'
import { expect, test} from 'vitest'

test('test complex arithmetic ', ()=>{
    const z1 = complex(1, 2)
    const z2 = complex(2, 1)

    // Addition
    const z3 = Complex.add(z1, z2);
    expect(z3.a).toEqual(3);
    expect(z3.b).toEqual(3);

    // Substraction 
    const z4 = Complex.sub(z1, z2)
    expect(z4.a).toEqual(-1)
    expect(z4.b).toEqual(1)

    // Multiplication
    const z5 = Complex.mul(z1, z2)
    expect(z5.a).toEqual(0)
    expect(z5.b).toEqual(5)

    // Division
    const z6 = Complex.div(z1, z2)
    expect(z6.a).toEqual(0.8)
    expect(z6.b).toEqual(0.6)
    
})