// Serial initialization
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
display.show(new display.spinning) // loading animation

serial.onDataReceived(serial.delimiters(Delimiters.Fullstop), function () {
    let msg = serial.readUntil(serial.delimiters(Delimiters.Fullstop))
    if (msg == "Connect") {
        display.show(new display.success)
        serial.writeLine("Connect successful")
    } else if (msg.substr(0, 7) == "Weather") {
        data.decode(msg)
    } else {
        display.stop()
        basic.showString("Unknow:" + msg + " len=" + msg.length, 75)
        // basic.showString("substr:" + data.substr(0, 7) + " len=" + data.substr(0, 7).length, 75)
    }
})

input.onButtonPressed(Button.A, function () {
    let data = test_data
    display.show(new display.weather(data))
    serial.writeValue("x", 0)
})
