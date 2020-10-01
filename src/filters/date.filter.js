export default (value, format="date") => {
  const options = {}

  if (format.includes("date")) {
    options.day = "2-digit"
    options.month = "long"
    options.year = "numeric"
  }

  if (format.includes("time")) {
    options.hour = "2-digit"
    options.minute = "2-digit"
    options.seconds = "2-digit"
  }

  return Intl.DateTimeFormat("en-EN", options).format(new Date(value))
}
  