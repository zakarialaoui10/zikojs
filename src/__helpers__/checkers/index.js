export const is_primitive = value => typeof value !== 'object' && typeof value !== 'function' || value === null;
