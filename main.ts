serial.redirectToUSB()
let connected = false
display.show(new display.spinning) // loading animation
    

serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    let msg = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (!connected) {
        connected = true
        display.show(new display.success)
        if (msg == "Connect")
            console.log("Connect successful")
    }
    else if (msg.includes(":")) {
        let m = msg.split(":")
        let id = m[0]
        let parameter = m[1]
        console.log("Running gesture: " + id)
        data.store.load(parameter)
    }
})

input.onButtonPressed(Button.A, function () {
    serial.writeLine("Request")
    basic.pause(7000)
    display.show(new display.weather(data.store.data))
})
