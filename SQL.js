class TORMSqlEngine {
    constructor() {
        this.tables = new Map();
    }

    createTable(tableName) {
        if (!this.tables.has(tableName)) {
            this.tables.set(tableName, new Map());
            console.log(`[TORM SQL] Tablo olusturuldu: ${tableName}`);
        }
    }

    insert(tableName, id, data) {
        if (!this.tables.has(tableName)) {
            this.createTable(tableName);
        }
        this.tables.get(tableName).set(id, { ...data, createdAt: Date.now() });
        return true;
    }

    select(tableName, id) {
        if (this.tables.has(tableName)) {
            return this.tables.get(tableName).get(id) || null;
        }
        return null;
    }

    queryAll(tableName) {
        if (this.tables.has(tableName)) {
            return Array.from(this.tables.get(tableName).entries());
        }
        return [];
    }
}

module.exports = new TORMSqlEngine();
