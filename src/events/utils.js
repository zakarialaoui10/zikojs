const getEvent=(event = "")=>{
    if(event.startsWith("Ptr"))return `pointer${event.split("Ptr")[1].toLowerCase()}`;
    return event.toLowerCase()
}
export{
    getEvent
}