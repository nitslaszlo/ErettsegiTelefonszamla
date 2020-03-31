export default class Call {
    private _number = 0;
    private _start: Date = new Date();
    private _ended: Date = new Date();

    public constructor(number: string, time?: string) {
        //1 2 3 4 5 6
        if (time) {
            const timess: string[] = time.split(" ");
            const times: number[] = timess.map(n => Number.parseInt(n));
            this._start = new Date(0, 0, 0, times[0], times[1], times[2]);
            this._ended = new Date(0, 0, 0, times[3], times[4], times[5]);

            //001231234
            this._number = Number.parseInt(number);
        } else {
            this._number = Number.parseInt(number);
        }
    }

    public get isMobil(): boolean {
        const numbers: string = this._number.toString();
        return numbers.startsWith("39") || numbers.startsWith("41") || numbers.startsWith("71");
    }

    public get isInPeakTime(): boolean {
        return this._start.getHours() > 7 && this._start.getHours() < 18;
    }

    public get Started(): Date {
        return this._start;
    }

    public get Ended(): Date {
        return this._start;
    }

    public get Number(): number {
        return this._number;
    }

    public get Minutes(): number {
        return Math.round((this._ended.getTime() - this._start.getTime()) / (1000 * 60));
    }
}
