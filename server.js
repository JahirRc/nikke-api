const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const generalData = require('./generalData.json');
const apiData = require('./apiData.json');
const weaponData = require('./weaponData.json');
const rarityData = require('./rarityData.json');
const classData = require('./classData.json');
const burstData = require('./burstData.json');
const manufacturerData = require('./manufacturerData.json');
const codeData = require('./codeData.json');


const formatCharacterData = (characterId, characterDetails, characterApiData) => {
    const formattedSkins = {};
    for (const skinId in characterApiData.skins) {
        if (characterApiData.skins.hasOwnProperty(skinId)) {
            formattedSkins[skinId] = { // Corrected from formattedSins
                id: characterApiData.skins[skinId].id,
                name: characterApiData.skins[skinId].name,
                mini_image: characterApiData.skins[skinId]["mi-image"],
                full_body_image: characterApiData.skins[skinId]["full-body-image"],
                cover_image: characterApiData.skins[skinId]["cover-image"],
                aiming_image: characterApiData.skins[skinId]["aiming-image"],
                burst_skill_image: characterApiData.skins[skinId]["burst-skill-image"] || null
            };
        }
    }

    return {
        id: characterId,
        name: characterDetails.name,
        rarity: {
            type: characterDetails.rarity,
            image: rarityData[characterDetails.rarity]
        },
        weapon: {
            name: characterDetails.weapon.name,
            type: characterDetails.weapon.type,
            image: weaponData[characterDetails.weapon.type]
        },
        squad: characterDetails.squad,
        voice_actors: characterDetails.voice_actor,
        release_date: characterDetails.release_date,
        burst: {
            type: characterDetails.burst,
            image: burstData[characterDetails.burst]
        },
        code: {
            type: characterDetails.code,
            image: codeData[characterDetails.code]
        },
        manufacturer: {
            type: characterDetails.manufacturer,
            image: manufacturerData[characterDetails.manufacturer]
        },
        class: {
            type: characterDetails.class,
            image: classData[characterDetails.class]
        },
        api_data: {
            // Corrected to use characterApiData directly
            mini_image: characterApiData.skins.default["mi-image"],
            full_body_image: characterApiData.skins.default["full-body-image"],
            cover_image: characterApiData.skins.default["cover-image"],
            aiming_image: characterApiData.skins.default["aiming-image"],
            burst_skill_image: characterApiData.skins.default["burst-skill-image"] || null,
            skins: formattedSkins
        }
    };
};

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Nikke: Goddess of Victory API!',
        description: 'Explore character data, images, and search by various criteria.',
        available_endpoints: {
            getAllCharacters: '/api/characters',
            getCharacterById: '/api/characters/:id',
            searchCharactersByName: '/api/search/characters?name=your_query',
            searchByRarity: '/api/search/rarity/:rarityType (r, sr, ssr)',
            searchByWeapon: '/api/search/weapon/:weaponType (shotgun, submachine_gun, etc.)',
            searchBySquad: '/api/search/squad/:squadName',
            searchByBurst: '/api/search/burst/:burstType (I, II, III, IV)',
            searchByCode: '/api/search/code/:codeType (fire, water, electric, iron, wind)',
            searchByManufacturer: '/api/search/manufacturer/:manufacturerName (elysion, missilis_industry, etc.)',
            searchByClass: '/api/search/class/:classType (attackers, defenders, supporters)'
        },
        example_usage: 'Try visiting /api/characters/rapi or /api/search/rarity/ssr'
    });
});

app.get('/api/characters', (req, res) => {
    const allCharacters = {};
    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId) && apiData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            allCharacters[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
        }
    }
    res.json(allCharacters);
});

app.get('/api/characters/:id', (req, res) => {
    const characterId = req.params.id.toLowerCase();
    const characterDetails = generalData.characters[characterId];
    const characterApiDetails = apiData.characters[characterId];

    if (characterDetails && characterApiDetails) {
        res.json(formatCharacterData(characterId, characterDetails, characterApiDetails));
    } else {
        res.status(404).json({ message: 'Character not found' });
    }
});

app.get('/api/search/characters', (req, res) => {
    const nameQuery = req.query.name ? req.query.name.toLowerCase() : '';
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.name.toLowerCase().includes(nameQuery)) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});


app.get('/api/search/rarity/:rarityType', (req, res) => {
    const rarityType = req.params.rarityType.toLowerCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.rarity.toLowerCase() === rarityType) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

app.get('/api/search/weapon/:weaponType', (req, res) => {
    const weaponType = req.params.weaponType.toLowerCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.weapon.type.toLowerCase() === weaponType) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

app.get('/api/search/squad/:squadName', (req, res) => {
    const squadName = req.params.squadName.toLowerCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.squad.toLowerCase() === squadName) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

app.get('/api/search/burst/:burstType', (req, res) => {
    const burstType = req.params.burstType.toUpperCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.burst === burstType) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

app.get('/api/search/code/:codeType', (req, res) => {
    const codeType = req.params.codeType.toLowerCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.code.toLowerCase() === codeType) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

app.get('/api/search/manufacturer/:manufacturerName', (req, res) => {
    const manufacturerName = req.params.manufacturerName.toLowerCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.manufacturer.toLowerCase() === manufacturerName) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

app.get('/api/search/class/:classType', (req, res) => {
    const classType = req.params.classType.toLowerCase();
    const results = {};

    for (const charId in generalData.characters) {
        if (generalData.characters.hasOwnProperty(charId)) {
            const characterDetails = generalData.characters[charId];
            const characterApiDetails = apiData.characters[charId];
            if (characterApiDetails && characterDetails.class.toLowerCase() === classType) {
                results[charId] = formatCharacterData(charId, characterDetails, characterApiDetails);
            }
        }
    }
    res.json(results);
});

module.exports = app;
