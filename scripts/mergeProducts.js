const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../server/products.json');

const newProducts = [
    {
        "name": "Elka 076600 Elka Pro Jacket industriële spuitjassen korenblauw",
        "description": "Industriële spuitjas van het type Elka Pro, uitgevoerd in korenblauw.",
        "price": "€ 70,95",
        "link": "https://safetyproducts.com/nl/p/elka-076600-elka-pro-jacket-industriele-spuitjassen-korenblauw/"
    },
    {
        "name": "Elka 077100E Pro Smock w/elastic spuitjassen korenblauw",
        "description": "Elka Pro Smock met elastische manchetten, ideaal voor industriële reiniging.",
        "price": "€ 61,45",
        "link": "https://safetyproducts.com/nl/p/elka-077100e-pro-smock-w-elastic-spuitjassen-korenblauw/"
    },
    {
        "name": "Elka 079900E Pro Bib & Brace Amerikaanse overalls",
        "description": "Amerikaanse overall van de Elka Pro serie voor optimale bescherming.",
        "price": "€ 61,45",
        "link": "https://safetyproducts.com/nl/p/elka-079900e-pro-bib-brace-amerikaanse-overalls/"
    },
    {
        "name": "Sioen Werdum Anorak 4835A2FK0 spuitjassen Food grade",
        "description": "Food grade anorak spuitjas van Sioen, geschikt voor de voedingsindustrie.",
        "price": "€ 68,54",
        "link": "https://safetyproducts.com/nl/p/sioen-werdum-anorak-4835a2fk0-spuitjassen-food-grade/"
    },
    {
        "name": "Conan 10-023 handschoen food grade geruwd LDPE 30 mu",
        "description": "Food grade wegwerphandschoenen van geruwd LDPE materiaal.",
        "price": "€ 149,00",
        "link": "https://safetyproducts.com/nl/p/conan-10-023-handschoen-food-grade-geruwd-ldpe-30-mu/"
    },
    {
        "name": "Conan 10-024 katoenen Interlock handschoenen wit 240 mm",
        "description": "Witte katoenen interlock handschoenen voor algemene bescherming.",
        "price": "€ 219,00",
        "link": "https://safetyproducts.com/nl/p/conan-10-024-katoenen-interlock-handschoenen-wit-240-mm/"
    },
    {
        "name": "Conan 10-025 onderhandschoenen rondgebreid katoen heren",
        "description": "Rondgebreide katoenen onderhandschoenen voor extra comfort.",
        "price": "€ 99,00",
        "link": "https://safetyproducts.com/nl/p/conan-10-025-onderhandschoenen-rondgebreid-katoen-heren/"
    },
    {
        "name": "Conan 10-029 food grade overmouwen PE 20 mu 40x20 cm",
        "description": "Polyethyleen overmouwen voor hygiënische bescherming in de food sector.",
        "price": "€ 49,00",
        "link": "https://safetyproducts.com/nl/p/conan-10-029-food-grade-overmouwen-pe-20-mu-40x20-cm/"
    },
    {
        "name": "Conan 10-040 wegwerpoveralls PP met klittenband en capuchon",
        "description": "Polypropyleen wegwerpoveralls voorzien van klittenbandsluiting.",
        "price": "€ 79,00",
        "link": "https://safetyproducts.com/nl/p/conan-10-040-wegwerpoveralls-pp-met-klittenband-en-capuchon/"
    },
    {
        "name": "Conan 10-014 wokkel baardmaskers non-woven Polypropeen",
        "description": "Baardmaskers van non-woven polypropeen voor baardbedekking.",
        "price": "€ 28,50",
        "link": "https://safetyproducts.com/nl/p/conan-10-014-wokkel-baardmaskers-non-woven-polypropeen/"
    },
    {
        "name": "Conan 10-018 baardmaskers detecteerbaar nw Polypropeen",
        "description": "Detecteerbare baardmaskers voor gebruik in de voedselverwerking.",
        "price": "€ 37,50",
        "link": "https://safetyproducts.com/nl/p/conan-10-018-baardmaskers-detecteerbaar-nw-polypropeen/"
    },
    {
        "name": "Food grade haarnetjes met super fijne micromazen nylon 60 cm",
        "description": "Nylon haarnetjes met fijne mazen voor maximale hygiëne.",
        "price": "€ 84,15",
        "link": "https://safetyproducts.com/nl/p/food-grade-haarnetjes-met-super-fijne-micromazen-nylon-60-cm/"
    },
    {
        "name": "Nylon micromaas hoofdkappen food grade Conan 10-270",
        "description": "Hygiënische hoofdkappen met micromaas structuur voor herhaald gebruik.",
        "price": "€ 86,13",
        "link": "https://safetyproducts.com/nl/p/nylon-micromaas-hoofdkappen-food-grade-conan-10-270/"
    },
    {
        "name": "Conan 10-004 haarnetjes roundcap 53 cm non-woven polypropyleen",
        "description": "Standaard haarnetjes type roundcap voor dagelijks gebruik.",
        "price": "€ 26,50",
        "link": "https://safetyproducts.com/nl/p/conan-10-004-haarnetjes-roundcap-53-cm-non-woven-polypropyleen/"
    },
    {
        "name": "Portwest S350 Sealtex AIR Jack regenjas polyester PU-coating",
        "description": "Ademende en waterdichte regenjas uit de Sealtex AIR collectie.",
        "price": "€ 54,20",
        "link": "https://safetyproducts.com/nl/p/portwest-s350-sealtex-air-jack-regenjas-polyester-pu-coating/"
    },
    {
        "name": "Havep 5056 Basic bodywarmer met verlengd rugpand marineblauw",
        "description": "Comfortabele bodywarmer met extra bescherming voor de onderrug.",
        "price": "€ 59,29",
        "link": "https://safetyproducts.com/nl/p/havep-basic-bodywarmer-met-verlengd-rugpand-marineblauw/"
    },
    {
        "name": "Oxxa 8380 Pilotenjack polyester/katoen vuil- en waterafstotend",
        "description": "Robuust pilotenjack met vuilafstotende eigenschappen.",
        "price": "€ 32,00",
        "link": "https://safetyproducts.com/nl/p/oxxa-8380-pilotenjack-polyester-katoen-vuil-en-waterafstotend/"
    },
    {
        "name": "Portwest B121 Thermobroek elastisch polykatoen Marineblauw",
        "description": "Thermische onderbroek voor werkzaamheden in koude omgevingen.",
        "price": "€ 14,50",
        "link": "https://safetyproducts.com/nl/p/portwest-b121-thermobroek-elastisch-polykatoen-marineblauw/"
    },
    {
        "name": "Portwest EV467 EV4 Hi-Vis winterjassen High-Visibility",
        "description": "High-visibility winterjas met reflecterende banden voor maximale veiligheid.",
        "price": "€ 125,00",
        "link": "https://safetyproducts.com/nl/p/portwest-ev467-ev4-hi-vis-winterjassen-high-visibility/"
    },
    {
        "name": "Conan 10-021 food grade heavy nitril 240 mm handschoen",
        "description": "Sterke nitril handschoenen voor zwaar werk in de voedingsmiddelenindustrie.",
        "price": "€ 119,00",
        "link": "https://safetyproducts.com/nl/p/conan-10-021-food-grade-heavy-nitril-handschoen-ongepoederd/"
    }
];

try {
    const rawData = fs.readFileSync(PRODUCTS_PATH, 'utf8');
    const existingProducts = JSON.parse(rawData);

    // Filter out duplicates based on link
    const existingLinks = new Set(existingProducts.map(p => p.link));
    const uniqueNewProducts = newProducts.filter(p => !existingLinks.has(p.link));

    const totalProducts = [...existingProducts, ...uniqueNewProducts];

    fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(totalProducts, null, 2));
    console.log(`Added ${uniqueNewProducts.length} unique products. Total: ${totalProducts.length}`);
} catch (error) {
    console.error("Merge Error:", error);
}
