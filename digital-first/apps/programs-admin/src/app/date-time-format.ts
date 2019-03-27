export function formatDateTime(utcDate: string): string {
  if (Date.parse(utcDate)) return new Date(utcDate).toLocaleString('en-AU')
  return utcDate
}
export function formatDate(utcDate: string): string {
  if (Date.parse(utcDate)) return new Date(utcDate).toLocaleDateString('en-AU')
  return utcDate
}

export function formatDateForTextField(utcDate: string): string {
  if (Date.parse(utcDate)) {
    var dte = new Date(utcDate)

    var m = dte.getMonth() + 1
    var mm = m.toString()
    var d = dte.getDate()
    var dd = d.toString()

    if (m < 10) {
      mm = `0${m.toString()}`
    }

    if (d < 10) {
      dd = `0${d.toString()}`
    }

    return `${dte.getFullYear()}-${mm}-${dd}`
  }
  return utcDate
}
