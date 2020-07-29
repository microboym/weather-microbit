// Display controls the animations to show

namespace display {
    // Animations should implements the animation interface
    interface animation {
        status: boolean
        show: () => void
        stop: () => void
    }
    let current: animation = null

    export function show(animation: animation): void {
        stop()
        current = animation
        control.inBackground(function () {
            current.show()
        })
    }

    export function stop() {
        if (current) {
            current.stop()
        }
        basic.clearScreen()
        led.stopAnimation()
        current = null
    }

    export function status(): boolean {
        return current ? current.status : false
    }

    // Weather displays the weather data on screen
    export class weather implements animation {
        status: boolean
        data: data.weather

        constructor(data: data.weather) { this.data = data }

        show(): void {
            let kind = ""
            switch (this.data.kind) {
                case data.wkind.Sunny:
                    kind = "Sunny"; break
                case data.wkind.Cloudy:
                    kind = "Cloudy"; break
                case data.wkind.Rainy:
                    kind = "Rainy"; break
            }
            let show_string:string = kind + ' ' + this.data.temperature1 + '~' + this.data.temperature2
            basic.showString(show_string, 120)
        }

        stop() { this.status = false }
    }

    // Spinning is an animation for loading
    export class spinning implements animation {
        status: boolean

        show(): void {
            if (!this.status) {
                this.status = true
                let img = images.createBigImage(`
                        # . . . . . . . . # 
                        . # . . . . . . # . 
                        . . # . . . . # . . 
                        . . . # . . # . . . 
                        . . . . # # . . . . 
                    `)
                while (this.status)
                    img.scrollImage(1, 100)
            }
        }

        stop() { this.status = false }
    }

    // Success is an animation when an action's done successful
    export class success implements animation {
        status: boolean

        show(): void {
            if (!this.status) {
                this.status = true

                for(let i = 0; i < 5 && this.status; i++) {
                    basic.showIcon(IconNames.Yes)
                    basic.pause(200)
                    basic.clearScreen()
                    basic.pause(100)
                }
            }
        }

        stop() { this.status = false }
    }
}