const Events = {
    'Click' : [
        'Click',
        'DblClick'
    ],
    'Pointer' : [
        'PtrMove',
        'PtrDown',
        'PtrUp',
        'PtrLeave',
        'PtrEnter',
        'PtrOut',
        'PtrCancel'
    ],
    'Mouse' : [],
    'Touch' : [],
    'Key' : [
        'KeyDown',
        'KeyPress',
        'KeyUp'
    ],
    'Clipboard':[
        'Copy',
        'Cut',
        'Paste'
    ],
    'Focus':[
        'focus',
        'blur'
    ],
    'Drag':[
        "Drag",
        "DragStart",
        "DragEnd",
        "Drop"
    ],
    'Media':[

    ],
    'Hash':[
        "HashChange"
    ]
}

export {
    Events
}