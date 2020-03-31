import Call from "./Call";
import fs from "fs";

export default class Megoldás {
    private _calls: Call[] = [];

    private peak_line = 30;
    private peak_mobil = 69.175;
    private offPeak_line = 15;
    private offPeak_mobile = 46.675;

    public constructor(file: string) {
        const data: string[] = fs
            .readFileSync(file)
            .toString()
            .split("\n");

        for (let i = 0; i < data.length; i += 2) {
            this._calls.push(new Call(data[i + 1], data[i]));
        }
    }

    public ElsoFeladat(number: number): boolean {
        return new Call(number.toString()).isMobil;
    }

    public MasodikFeladat(start: Date, ended: Date): number {
        if ((ended.getTime() - start.getTime()) / (1000 * 60) > 0)
            if (ended.getSeconds() - start.getSeconds() > 0 && ended.getSeconds() - start.getSeconds() < 30) return Math.round((ended.getTime() - start.getTime()) / (1000 * 60) + 1);
            else return Math.round((ended.getTime() - start.getTime()) / (1000 * 60));
        else return 0;
    }
    public HarmadikFeladat(): void {
        const toFile: string[] = ["perc telefonszam"];
        this._calls.forEach(c => toFile.push(c.Minutes.toString() + " " + c.Number));

        fs.writeFileSync("percek.txt", toFile.join("\r\n") + "\r\n");
    }

    public get NegyedikFeladatPeak(): number {
        let calls = 0;
        this._calls.forEach(c => (c.isInPeakTime ? calls++ : ""));
        return calls;
    }

    public get NegyedikFeladatOffPeak(): number {
        let calls = 0;
        this._calls.forEach(c => (c.isInPeakTime ? "" : calls++));
        return calls;
    }

    public get OtodikFeladatMobil(): number {
        let minutes = 0;
        this._calls.forEach(c => {
            if (c.isMobil) minutes += c.Minutes;
        });
        return minutes;
    }

    public get OtodikFeladatLine(): number {
        let minutes = 0;
        this._calls.forEach(c => {
            if (!c.isMobil) minutes += c.Minutes;
        });
        return minutes;
    }

    public get HatodikFeladat(): number {
        let money = 0;
        this._calls.forEach(c => {
            if (c.isInPeakTime)
                if (c.isMobil) money += c.Minutes * this.peak_mobil;
                else money += c.Minutes * this.peak_line;
        });
        return money;
    }
}
