export default (value) => {
  if (typeof value === "string") {
    return value[0].toUpperCase() + value.slice(1)
  }
}
