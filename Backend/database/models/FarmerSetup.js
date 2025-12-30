const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../farmers.json');

// Ensure DB file exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '[]');
}

const getFarmers = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
};

const saveFarmers = (farmers) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(farmers, null, 2));
};

const FarmerSetup = {
    findOne: async ({ username }) => {
        const farmers = getFarmers();
        return farmers.find(f => f.username === username) || null;
    },

    findOneAndUpdate: async (query, update, options) => {
        const farmers = getFarmers();
        const index = farmers.findIndex(f => f.username === query.username);

        // Merge update into existing or new object
        let doc;
        if (index > -1) {
            doc = { ...farmers[index], ...update };
            farmers[index] = doc;
        } else if (options.upsert) {
            doc = { ...update, username: query.username, createdAt: new Date() };
            farmers.push(doc);
        } else {
            return null; // Not found and no upsert
        }

        saveFarmers(farmers);
        return doc;
    }
};

module.exports = FarmerSetup;
