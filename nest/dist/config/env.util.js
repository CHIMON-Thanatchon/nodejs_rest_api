"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEnvValue = normalizeEnvValue;
function normalizeEnvValue(value) {
    if (value === undefined || value === null)
        return '';
    let s = String(value).trim();
    if ((s.startsWith('"') && s.endsWith('"')) ||
        (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1).trim();
    }
    return s;
}
