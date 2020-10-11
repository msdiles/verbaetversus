export default (listFrom = [], number) => {
  const list = [
    ...Array(Math.ceil(listFrom.length / number)).keys(),
  ].map((page) => listFrom.slice(page * number, page * number + number))

  const updateFormatted = (current) => {
    if (list.length > 6) {
      if (current < 4) {
        return [
          { pos: 1, idx: 0 },
          { pos: 2, idx: 1 },
          { pos: 3, idx: 2 },
          { pos: 4, idx: 3 },
          { pos: 5, idx: 4 },
          { pos: "...", idx: 5 },
          { pos: list.length, idx: list.length - 1 },
        ]
      }
      if (current > list.length - 4) {
        return [
          { pos: 1, idx: 0 },
          { pos: "...", idx: list.length - 6 },
          { pos: list.length - 4, idx: list.length - 5 },
          { pos: list.length - 3, idx: list.length - 4 },
          { pos: list.length - 2, idx: list.length - 3 },
          { pos: list.length - 1, idx: list.length - 2 },
          { pos: list.length, idx: list.length - 1 },
        ]
      }
      return [
        { pos: 1, idx: 0 },
        { pos: "...", idx: current - 2 },
        { pos: current, idx: current - 1 },
        { pos: current + 1, idx: current },
        { pos: current + 2, idx: current + 1 },
        { pos: "...", idx: current + 2 },
        { pos: list.length, idx: list.length - 1 },
      ]
    } else {
      return [...Array(list.length).keys()].map((index) => ({
        pos: index + 1,
        idx: index,
      }))
    }
  }

  return {
    current: 0,
    list: list,
    max: list.length - 1,
    formatted: updateFormatted(0),
    transition(index) {
      this.current = index
      this.formatted = updateFormatted(this.current)
    },
    back() {
      if (this.current > 0) {
        this.current = this.current - 1
        this.formatted = updateFormatted(this.current)
      }
    },
    forward() {
      if (this.current < this.max) {
        this.current = this.current + 1
        this.formatted = updateFormatted(this.current)
      }
    },
    update(){
      this.formatted = updateFormatted(this.current)
    }
  }
}
