import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { wait } from "./utils/wait.js"


puppeteer.use(StealthPlugin());

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";
const browserOpt = { headless: false, defaultViewport: null, args: ["--start-maximized"], dumpio: true };
const url = "https://www.google.com/maps/";


// const origin = "https://www.google.com";


// const location = { "latitude": 12.9716, "longitude": 77.5946 };
// const permissions = [{ "name": "geolocation", "data": location }]


// async function setPermission(page, browserContext) {
//     for (const permisson of permissions) {
//         await browserContext.overridePermissions(origin, [permisson.name]);

//         if (permisson.name === "geolocation") {
//             await page.setGeolocation(permisson.data);
//         }
//     }
// }



const input = "gym in usa california";


async function launchBrowser(browserOptions = {}) {
    const browser = await puppeteer.launch(browserOptions);
    const context = await browser.defaultBrowserContext();
    const page = await browser.newPage();
    // await setPermission(page, context);
    return page;
}


async function setBrowserApi(page) {
    await page.setUserAgent(userAgent);
}


async function enterInput(page) {
    await page.locator("#ucc-1").fill(input, { delay: 1000 });
    await wait();
    await page.keyboard.press("Enter");
}
// document.querySelectorAll(".Nv2PK.THOPZb.CpccDe.CdoAJb")-all article

async function main(url) {
    try {
        const page = await launchBrowser(browserOpt);
        await setBrowserApi(page);
        await page.goto(url, { waitUntil: "networkidle2" });
        await wait(1000);
        await enterInput(page);
    } catch (err) {
        console.log("Error:", err.message);
    }
}




main(url);