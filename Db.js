import Database from 'better-sqlite3';

const db = new Database('tarrafa.db', options);

db.pragma('journal_mode = WAL');

module.exports.db = db;
