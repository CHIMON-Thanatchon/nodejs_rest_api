/** รองรับค่าใน .env ที่มีเครื่องหมายคำพูดหรือช่องว่างรอบค่า */
export function normalizeEnvValue(value: string | undefined): string {
  if (value === undefined || value === null) return '';
  let s = String(value).trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}
