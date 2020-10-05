export default (list, number) => {
  return {
    const paginatedList = [
    ...Array(Math.ceil(list.length / number)).keys(),
  ].map((page) => list.slice(page * number, page * number + number))}
}
