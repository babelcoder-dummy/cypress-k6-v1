import * as path from 'node:path'
import * as XLSX from 'xlsx'

export function toJson(filepath: string) {
  const workbook = XLSX.readFile(path.resolve('cypress', 'fixtures', filepath))
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]

  return XLSX.utils.sheet_to_json(worksheet)
}
