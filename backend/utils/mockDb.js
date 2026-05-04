const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../data/db.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
}

const getData = () => JSON.parse(fs.readFileSync(DB_FILE));
const saveData = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

const MockUser = {
    findOne: async (query) => {
        const { users } = getData();
        return users.find(u => u.email === query.email || u.username === query.username);
    },
    findById: async (id) => {
        const { users } = getData();
        return users.find(u => u._id === id);
    },
    findByIdAndUpdate: async (id, update) => {
        const data = getData();
        const index = data.users.findIndex(u => u._id === id);
        if (index !== -1) {
            // Simple flat update for demonstration
            data.users[index] = { ...data.users[index], ...update };
            if (update['skinProfile.lastAnalysis']) {
                data.users[index].skinProfile = {
                    ...data.users[index].skinProfile,
                    lastAnalysis: update['skinProfile.lastAnalysis']
                };
            }
            saveData(data);
            return data.users[index];
        }
        return null;
    },
    create: async (userData) => {
        const data = getData();
        const newUser = { ...userData, _id: Date.now().toString() };
        data.users.push(newUser);
        saveData(data);
        return newUser;
    }
};

module.exports = MockUser;
