module.exports = arrayOfComponentObjects => {
  arrayOfComponentObjects.forEach(a => {
    const monthNames = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    }
    a.monthEndSort =
      a.monthEnd === 'Present' ? ['December', 2023] : a.monthEnd.split(' ')
    a.monthStartSort = a.monthStart.split(' ')
    a.monthEndSort[0] = monthNames[a.monthEndSort[0]]
    a.monthStartSort[0] = monthNames[a.monthStartSort[0]]
  })
  arrayOfComponentObjects.sort((a, b) => {
    if (b.monthEndSort[1] === a.monthEndSort[1]) {
      if (b.monthEndSort[0] === a.monthEndSort[0]) {
        if (b.monthStartSort[1] === a.monthStartSort[1]) {
          return b.monthStartSort[0] - a.monthStartSort[0]
        }
        return b.monthStartSort[1] - a.monthStartSort[1]
      }
      return b.monthEndSort[0] - a.monthEndSort[0]
    }
    return b.monthEndSort[1] - a.monthEndSort[1]
  })
}
