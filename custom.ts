
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace IoT_c2d {
    //%block   
    export function author():string {
        return "peter"
    }
}

function cloud2device () {
    // process cloud commands
    if (!(serialRead.isEmpty())) {
        temp0 = serialRead.split(":")
        if (temp0.length == 1) {
            // received a generic command
            temp1 = serialRead.split("(")
            temp2 = temp1[1].split(")")
            temp3 = temp2[0].split(",")
            cmd = convertToText(temp1[0])
            p1 = temp3[0]
            p2 = temp3[1]
            p3 = temp3[2]
            serialRead = ""
            basic.showString("" + (p1))
            invokeCommands()
        }
        if (temp0.length == 2) {
            if (parseFloat(temp0[0]) == identity) {
                // received a specific command for this device
                temp1 = temp0[1].split("(")
                temp2 = temp1[1].split(")")
                temp3 = temp2[0].split(",")
                cmd = convertToText(temp1[0])
                p1 = temp3[0]
                p2 = temp3[1]
                p3 = temp3[2]
                serialRead = ""
                invokeCommands()
            }
        }
    }
}

function setIcon (name: string) {
    // show icon
    if (name == "heart") {
        basic.showIcon(IconNames.Heart)
    } else if (name == "happy") {
        basic.showIcon(IconNames.Happy)
    } else if (name == "cls") {
        basic.clearScreen()
    } else if (name == "sad") {
        basic.showIcon(IconNames.Sad)
    } else if (name == "random") {
        iconnumber = randint(0, 2)
        basic.clearScreen()
        basic.pause(500)
        if (iconnumber == 0) {
            basic.showIcon(IconNames.Chessboard)
        } else if (iconnumber == 1) {
            basic.showIcon(IconNames.Square)
        } else if (iconnumber == 2) {
            basic.showIcon(IconNames.Scissors)
        }
    }
}

function servo (value: number) {
    basic.showString("s")
    pins.servoWritePin(AnalogPin.P0, value)
    basic.pause(1000)
    basic.clearScreen()
}
function setRGB (r: number, g: number, b: number) {
    basic.showString("r")
    strip.showColor(neopixel.rgb(r, g, b))
    basic.pause(1000)
    basic.clearScreen()
}
function setIdentity (i: number, v: number) {
    if (v == control.deviceSerialNumber()) {
        identity = i
        who()
    }
}

function setText (text: string) {
    basic.showString(text)
}

function clear () {
    basic.clearScreen()
}
function eom () {
    radio.sendValue("eom", 1)
    basic.pause(delay)
}
function setBrightness (value: number) {
    strip.setBrightness(value)
    strip.showRainbow(1, 360)
    strip.show()
}
function setDigitalPin (pin: number, value: number) {
    basic.showString("d")
    if (pin == 0) {
        pins.digitalWritePin(DigitalPin.P0, value)
    }
    if (pin == 1) {
        pins.digitalWritePin(DigitalPin.P1, value)
    }
    if (pin == 2) {
        pins.digitalWritePin(DigitalPin.P2, value)
    }
}

function who () {
    basic.showNumber(identity)
}

function setColor (color: string) {
    basic.showString("c")
    if (color == "red") {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (color == "orange") {
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    } else if (color == "yellow") {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else if (color == "green") {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (color == "blue") {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    } else if (color == "indigo") {
        strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
    } else if (color == "violet") {
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
    } else if (color == "purple") {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
    } else if (color == "white") {
        strip.showColor(neopixel.colors(NeoPixelColors.White))
    } else if (color == "black") {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    } else if (color == "clear") {
        strip.clear()
    } else if (color == "rainbow") {
        strip.showRainbow(1, 360)
    }
    strip.show()
    reportedproperties = "\"" + color + "\""
}
function invokeCommands () {
    if (doCommands) {
        if (cmd == "setId") {
            setIdentity(parseFloat(p1), parseFloat(p2))
        }
        if (cmd == "who") {
            who()
        }
        if (cmd == "clear") {
            clear()
        }
        if (cmd == "rgb") {
            setRGB(parseFloat(p1), parseFloat(p2), parseFloat(p3))
        }
        if (cmd == "color") {
            setColor(p1)
        }
        if (cmd == "icon") {
            setIcon(p1)
        }
        if (cmd == "reset") {
            setReset()
        }
        if (cmd == "brightness") {
            setBrightness(parseFloat(p1))
        }
        if (cmd == "servo") {
            servo(parseFloat(p1))
        }
        if (cmd == "digitalWrite") {
            setDigitalPin(parseFloat(p1), parseFloat(p2))
        }
        if (cmd == "analogWrite") {
            SetAnalogPin(parseFloat(p1), parseFloat(p2))
        }
        reportedproperties = "add here"
        doCommands = false
    }
}

function SetAnalogPin (pin: number, value: number) {
    basic.showString("a")
    if (pin == 0) {
        pins.analogWritePin(AnalogPin.P0, value)
    }
    if (pin == 1) {
        pins.analogWritePin(AnalogPin.P1, value)
    }
    if (pin == 2) {
        pins.analogWritePin(AnalogPin.P2, value)
    }
}

function setReset () {
    basic.showString("reset")
    control.reset()
}
let temp0: string[] = []
let str = ""
let reportedproperties = ""
let p3 = ""
let p2 = ""
let p1 = ""
let cmd = ""
let temp3: string[] = []
let temp2: string[] = []
let temp1: string[] = []
let iconnumber = 0
let delay = 0
let doCommands = false
let serialRead = ""
let strip: neopixel.Strip = null
let identity = 0
identity = -1
radio.setGroup(101)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
strip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
strip.clear()
strip.show()
serialRead = ""
doCommands = false
delay = 10

