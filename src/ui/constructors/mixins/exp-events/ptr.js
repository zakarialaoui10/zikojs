export const PtrEvents = {
    _onPtrDown(callback, useNormalizedCoordinates = false){
        this._on(
            'pointerdown', callback, 
            { category : 'ptr', details_setter : (ctx)=> {
                const {x, y} = getCoordinates(ctx, useNormalizedCoordinates);
                ctx.dx = x;
                ctx.dy = y;
                ctx.isDown = true;
            }}
        )
    },
    _onPtrMove(callback, useNormalizedCoordinates = false){
        this._on(
            'pointermove', callback, 
            { category : 'ptr', details_setter : (ctx)=> {
                const {x, y} = getCoordinates(ctx, useNormalizedCoordinates);
                ctx.mx = x;
                ctx.my = y;
                ctx.isMoving = true;
            }}
        )
    },
    _onPtrUp(callback, useNormalizedCoordinates = false){
        this._on(
            'pointerup', callback, 
            { category : 'ptr', details_setter : (ctx)=> {
                const {x, y} = getCoordinates(ctx, useNormalizedCoordinates);
                ctx.ux = x;
                ctx.uy = y;
                ctx.isDown = false;
                ctx.isMoving = false;
            }}
        )
    }
}



const getCoordinates = (ctx, normalized = false) =>{
    const rect = ctx.element.getBoundingClientRect();
    const e = ctx.event;
    let x = (e?.clientX - rect.left) | 0;
    let y = (e?.clientY - rect.top) | 0;

    if(normalized){
        const w = ctx.element.clientWidth;
        const h = ctx.element.clientHeight;
        x = +((x / w) * 2 - 1).toFixed(8);
        y = +((y / h) * -2 + 1).toFixed(8);
    }

    return {x, y};
}