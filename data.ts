// Add your code here

namespace data {
    export enum wkind {
        Sunny,
        Cloudy,
        Rainy
    }

    export class weather {
        kind: wkind
        temperature1: number
        temperature2: number

        constructor (kind: wkind, temp1: number, temp2: number) {
            this.kind = kind
            this.temperature1 = temp1
            this.temperature2 = temp2
        }
    }

    function decode (data: string): weather {
        // data format: kind-temperature1-temperature2
        let kind: wkind = parseInt(data[0])
        let i
        for (i = 2; data[i] != '-'; i++);
        let temperature1 = parseInt(data.slice(2, i))
        let temperature2 = parseInt(data.slice(i+1, data.length()))
        return new weather(kind, temperature1, temperature2)
    }

    // Store
    class weatherStore {
        data: weather
        update_at: number

        load (data: string): void {
            this.data = decode(data)
            console.log("Successful loaded new weather data: " + data)
        }
    }

    export let store: weatherStore = new weatherStore
}
