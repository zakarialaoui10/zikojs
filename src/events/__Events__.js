const Events = {
    'Click' : [
        'Click',
        'DblClick'
    ],
    'Ptr' : [
        'PtrMove',
        'PtrDown',
        'PtrUp',
        'PtrLeave',
        'PtrEnter',
        'PtrOut',
        'PtrCancel'
    ],
    'Mouse' : [
        'MouseMove',
        'MouseDown',
        'MouseUp',
        'MouseEnter',
        'MouseLeave',
        'MouseOut'
    ],
    // 'Touch' : [],
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
    'Wheel': [
        'Wheel'
    ]
    // 'Media':[

    // ],
    // 'Hash':[
    //     "HashChange"
    // ]
}

export {
    Events
}