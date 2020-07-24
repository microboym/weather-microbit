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

        update_at: number

        constructor (kind: wkind, temp1: number, temp2: number) {
            this.kind = kind
            this.temperature1 = temp1
            this.temperature2 = temp2
            this.update_at = control.millis()
        }
    }

    export function load(data: string): void {
        let w = decode(data)
        if (w.update_at > current.update_at) {
            current = w
            console.log("Successful loaded new weather data: " + data)
        }
    }

    function decode (data: string): weather {
        // data format: Weather: kind-temperature1-temperature2
        control.assert(data.substr(0, 7) == "Weather", "Data decode: bad input")
        data = data.substr(9)
        let kind: wkind = parseInt(data[0])
        let i
        for (i = 2; data[i] != '-'; i++);
        let temperature1 = parseInt(data.slice(2, i))
        let temperature2 = parseInt(data.slice(i+1, data.length()))
        return new weather(kind, temperature1, temperature2)
    }

    export let current: weather = null
}
