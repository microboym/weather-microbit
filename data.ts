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
        // data format: Weather: kind-temperature1-temperature2
        data = data.substr(9)
        let kind: wkind = parseInt(data[0])
        let i
        for (i = 2; data[i] != '-'; i++);
        let temperature1 = parseInt(data.slice(2, i))
        let temperature2 = parseInt(data.slice(i+1, data.length()))
        let w = new weather(kind, temperature1, temperature2)
        display.show(new display.weather(w))
        return w
    }

    export let current: weather = null
}
