// Serial initialization
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
display.show(new spinning) // loading animation

serial.onDataReceived(serial.delimiters(Delimiters.Fullstop), function () {
    let data = serial.readUntil(serial.delimiters(Delimiters.Fullstop))
    if (data == "Connect") {
        display.show(new success)
        serial.writeLine("Connect successful")
    } else if (data.substr(0, 7) == "Weather") {
        display.stop()
        basic.showString("data:" + data.substr(9))
    } else {
        display.stop()
        basic.showString("Unknow:" + data + " len=" + data.length, 75)
        // basic.showString("substr:" + data.substr(0, 7) + " len=" + data.substr(0, 7).length, 75)
    }
})

input.onButtonPressed(Button.A, function () {
    let data = test_data
    display.show(new weather(data))
    serial.writeValue("x", 0)
})
