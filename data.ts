// Add your code here

namespace data {
    export enum wkind {
        Sunny,
        Windy,
        Rainy
    }

    export class weather {
        kind: wkind
        temperature1: number
        temperature2: number

        // update_time: number = control.millis()

        constructor (kind: wkind, temp1: number, temp2: number) {
            this.kind = kind
            this.temperature1 = temp1
            this.temperature2 = temp2
        }
    }

    export function decode (data: string): weather {
        // kind-temperature1-temperature2
    }

    export let current: weather = null
}
