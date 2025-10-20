let command = 0
let leftMotorForward = AnalogPin.P1
let rightMotorForward = AnalogPin.P2
let leftMotorBackward = AnalogPin.P13
let rightMotorBackward = AnalogPin.P14

// Funciones de movimiento
function stop() {
    pins.digitalWritePin(leftMotorForward, 0)
    pins.digitalWritePin(rightMotorForward, 0)
    pins.digitalWritePin(leftMotorBackward, 0)
    pins.digitalWritePin(rightMotorBackward, 0)
}

function forward() {
    pins.analogWritePin(leftMotorForward, 1023)
    pins.analogWritePin(rightMotorForward, 1023)
    pins.digitalWritePin(leftMotorBackward, 0)
    pins.digitalWritePin(rightMotorBackward, 0)
}

function backward() {
    pins.analogWritePin(leftMotorBackward, 1023)
    pins.analogWritePin(rightMotorBackward, 1023)
    pins.digitalWritePin(leftMotorForward, 0)
    pins.digitalWritePin(rightMotorForward, 0)
}

function turnLeft() {
    pins.analogWritePin(leftMotorBackward, 1023)
    pins.analogWritePin(rightMotorForward, 1023)
}

function turnRight() {
    pins.analogWritePin(leftMotorForward, 1023)
    pins.analogWritePin(rightMotorBackward, 1023)
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    bluetooth.startUartService()
    basic.showString("BT")

    basic.forever(function () {
        let data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        if (data == "F") {
            forward()
        } else if (data == "B") {
            backward()
        } else if (data == "L") {
            turnLeft()
        } else if (data == "R") {
            turnRight()
        } else if (data == "S") {
            stop()
        }
    })
   