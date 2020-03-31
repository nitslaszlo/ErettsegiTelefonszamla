import http from "http";
import fs from "fs";
import Megoldás from "./Classes/Megoldás";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Telefonszámla by ImA-Studio</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        res.write("\nTelefonszámla \n<hr style='float:left; width:20em;'>");

        const megoldás: Megoldás = new Megoldás("HIVASOK.TXT");

        const uri = url.parse(req.url as string, true).query;

        res.write("\n1. feldata: \n");
        const number: number = Number.parseInt(uri.number as string) || 391234567;
        res.write(`Kérek egy telefonszámot: <input type='number' name='number' value=${number} style='width:8em;' onKeyUp = 'this.form.submit();' >\n`);

        if (megoldás.ElsoFeladat(number)) res.write(`Ez mobilszám: ${number} \n`);
        else res.write(`Ez vezetékes szám: ${number} \n`);

        res.write("\n2. feldata: \n");
        const start: Date = new Date();
        const sh: number = Number.parseInt(uri.s_h as string) || 11;
        const sm: number = Number.parseInt(uri.s_m as string) || 15;
        const ss: number = Number.parseInt(uri.s_s as string) || 0;
        const ended: Date = new Date();
        const eh: number = Number.parseInt(uri.e_h as string) || 11;
        const em: number = Number.parseInt(uri.e_m as string) || 50;
        const es: number = Number.parseInt(uri.e_s as string) || 20;
        res.write(`Hívás kezdetet:  <input type='number' name='s_h' value=${sh} style='width:3em;'>:<input type='number' name='s_m' value=${sm} style='width:3em;' onKeyUp = 'this.form.submit();'>:<input type='number' name='s_s' value=${ss} style='width:3em;' onKeyUp = 'this.form.submit();'>\n`);
        res.write(`Hívás befejezte: <input type='number' name='e_h' value=${eh} style='width:3em;'>:<input type='number' name='e_m' value=${em} style='width:3em;' onKeyUp = 'this.form.submit();'>:<input type='number' name='e_s' value=${es} style='width:3em;' onKeyUp = 'this.form.submit();'>\n`);
        start.setHours(sh, sm, ss);
        ended.setHours(eh, em, es);

        res.write(`Ennyi perc volt: ${megoldás.MasodikFeladat(start, ended)}\n`);

        res.write("\n3. feldata: 'percek.txt' \n");
        megoldás.HarmadikFeladat();

        res.write("\n4. feldata: \n");
        res.write(`Csúcsidőben: ${megoldás.NegyedikFeladatPeak} hívás\n`);
        res.write(`Csúcsidőn kívül: ${megoldás.NegyedikFeladatOffPeak} hívás\n`);

        res.write("\n5. feldata: \n");
        res.write(`Mobillal: ${megoldás.OtodikFeladatMobil} percet\n`);
        res.write(`Vezetékessel: ${megoldás.OtodikFeladatLine} percet\n`);

        res.write("\n6. feldata: \n");
        res.write(`Összesen: ${megoldás.HatodikFeladat} Ft-ot\n`);

        res.write("\nFile-ok: percek.txt\n");
        const percek: string[] = fs
            .readFileSync("percek.txt")
            .toString()
            .split("\n");

        percek.forEach(element => {
            res.write(element);
        });

        res.write("</pre></form></body></html>");
        res.end();
    }
}
