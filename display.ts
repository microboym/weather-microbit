// Display controls the animations to show

// Animations should implements the animation interface
interface animation {
    status: Boolean
    show: () => void
    stop: () => void
}

// Display controls the animations
class display {
    private static current: animation = null

    static show(animation: animation): void {
        this.stop()
        this.current = animation
        control.inBackground(function () {
            display.current.show()
        })
    }

    static stop() {
        if (this.current) {
            this.current.stop()
        }
        basic.clearScreen()
        led.stopAnimation()
        this.current = null
    }

    static status(): Boolean {
        return this.current ? this.current.status : false
    }
}

// Spinning is an animation for loading
class spinning implements animation {
    status: Boolean

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
class success implements animation {
    status: Boolean

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