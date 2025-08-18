const {PI, sqrt, cos, sin, acos, pow} = Math;

export const Linear = t => t
export const InSin = t => 1 - cos((t * PI) / 2);
export const OutSin = t => sin((t * PI) / 2);
export const InOutSin = t => -(cos(PI * t) - 1) / 2;

export const InQuad = t => t**2;
export const OutQuad = t => 1 - (1-t)**2;
export const InOutQuad = t => t < 0.5 ? 2 * (t**2) : 1 - (-2 * t + 2)**2 / 2;

export const InCubic = t => t**3;
export const OutCubic = t => 1 - (1-t)**3;
export const InOutCubic = t => t < 0.5 ? 4 * (t**3) : 1 - (-2 * t + 2)**3 / 2;

export const InQuart = t => t**4;
export const OutQuart = t => 1 - (1-t)**4;
export const InOutQuart = t => t < 0.5 ? 8 * (t**4) : 1 - (-2 * t + 2)**4 / 2;

export const InQuint = t => t**5;
export const OutQuint = t => 1 - (1-t)**5;
export const InOutQuint = t => t < 0.5 ? 16 * (t**5) : 1 - (-2 * t + 2)**5 / 2;

export const InExpo = t => t === 0 ? 0 : 2**(10*t - 10)
export const OutExpo = t => t === 1 ? 1 : 1 - 2**(-10 * t)
export const InOutExpo = t => t === 0? 0: t === 1? 1: t < 0.5 ? 2**(20 * t - 10) / 2: (2 - 2**(-20 * t + 10)) / 2;

export const InCirc = t => 1 - sqrt(1 - t**2);
export const OutCirc = t => sqrt(1 - (t-1)**2);
export const InOutCirc = t => t < 0.5? (1 - sqrt(1 - (2*t)**2)) / 2: (sqrt(1 - (-2*t+2)**2) + 1) / 2;

export const Arc = t => 1 - sin(acos(t));
export const Back = (t, x = 1) => (t**2) * ((x+1)*t - x);
export const Elastic = t => -2*pow(2, 10 * (t - 1)) * cos(20 * PI * t / 3 * t);

export const InBack = (t, c1 = 1.70158, c3 = c1 + 1) => c3 * pow(t,3)- c1 * (t**2); 
export const OutBack = (t, c1 = 1.70158, c3 = c1 + 1) => 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2); 
export const InOutBack = (t, c1 = 1.70158, c2 = c1 * 1.525) => t < 0.5 ? (pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;  

export const InElastic = (t, c4 = 2*PI/3) => {
    return t === 0
    ? 0
    : t === 1
    ? 1
    : -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * c4);    
}

export const OutElastic = (t, c4 = 2*PI/3) => {
    return t === 0
    ? 0
    : t === 1
    ? 1
    : pow(2, -10 * t) * sin((t * 10 - 0.75) * c4) + 1;
} 
export const InOutElastic = (t, c5 = 2 * PI / 4.5) => {
    return t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? -(pow(2, 20 * t - 10) * sin((20 * t - 11.125) * c5)) / 2
    : (pow(2, -20 * t + 10) * sin((20 * t - 11.125) * c5)) / 2 + 1;
}

export const InBounce = (t, n1 = 7.5625, d1 = 2.75) => 1 - OutBounce(1-t, n1, d1);
export const OutBounce = (t, n1 = 7.5625, d1 = 2.75) => {
    if(t<1/d1) return n1 * t * t;
    if(t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if(t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

export const InOutBounce = (t, n1 = 7.5625, d1 = 2.75) => t < 0.5 ? OutBounce(1 - 2 * t, n1, d1)/2 : OutBounce(2 * t - 1, n1, d1)/2