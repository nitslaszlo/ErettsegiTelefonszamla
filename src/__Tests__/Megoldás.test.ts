import Megoldás from "../Classes/Megoldás";

describe("Hívás osztály tesztei:", () => {
    const instance: Megoldás = new Megoldás("HIVASOK.TXT");

    it("Hívás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldás);
    });

    it("Első feladat", async () => {
        expect(instance.ElsoFeladat(391234567)).toBeTruthy();
    });

    it("Csúcs időben hívva", async () => {
        expect(instance.MasodikFeladat(new Date(0, 0, 0, 10, 0, 0), new Date(0, 0, 0, 10, 30, 0))).toBeTruthy();
    });

    it("Hívás hossza", async () => {
        expect(instance.OtodikFeladatMobil).toBe(87);
    });
});
