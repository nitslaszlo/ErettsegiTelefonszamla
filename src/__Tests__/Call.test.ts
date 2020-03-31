import Call from "../Classes/Call";

describe("Hívás osztály tesztei:", () => {
    const instance: Call = new Call("391234567", "11 0 0 12 10 30");

    it("Hívás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Call);
    });

    it("Mobil szám-e", async () => {
        expect(instance.isMobil).toBeTruthy();
    });

    it("Szám maga", async () => {
        expect(instance.Number).toBe(391234567);
    });

    it("Csúcs időben hívva", async () => {
        expect(instance.isInPeakTime).toBeTruthy();
    });

    it("Hívás kezdete", async () => {
        expect(instance.Started).toBeInstanceOf(Date);
    });

    it("Hívás vége", async () => {
        expect(instance.Ended).toBeInstanceOf(Date);
    });

    it("Hívás hossza", async () => {
        expect(instance.Minutes).toBe(71);
    });
});
