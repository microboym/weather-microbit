serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)

display.show(new spinning)

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let data = serial.readLine()
    if (data = "Connect") {
        display.show(new success)
        serial.writeLine("Connect successful")
    }
})
