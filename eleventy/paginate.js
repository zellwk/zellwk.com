// Pagination
const link = (text, href) => `<a href=${href}>${text}</a>`
const span = text => `<span class="is-active">${text}</span>`

// In-between pages...
// Say there are 13 pages.
// Current page 1: Show 1 to 10.
// Current page 2: Show 1 to 10.
// Current page 3: Show 1 to 10.
// Current page 4: Show 1 to 10.
// Current page 5: Show 1 to 10. // Threshold 5
// Current page 6: Show 2 to 11.
// Current page 7: Show 2 to 12.
// Current page 8: Show 3 to 13. // Threshold 5
// Current page 9: Show 3 to 13.
const getPages = (pagination, currentPage, numPagesToShow) => {
  const threshold = Math.floor(numPagesToShow / 2)
  const totalPages = pagination.hrefs.length
  const pageNumber = pagination.pageNumber + 1
  let min = 0
  let max = 0

  if (totalPages < numPagesToShow) {
    min = 1
    max = totalPages
  } else if (pageNumber < threshold) {
    min = 1
    max = Math.min(9, totalPages)
  } else if (pageNumber >= totalPages - threshold) {
    min = Math.min(totalPages - 8, pageNumber - threshold)
    max = Math.min(totalPages)
  } else {
    min = pageNumber - threshold
    max = pageNumber + threshold
  }

  return pagination.hrefs.map((href, index) =>
    href === currentPage.url
      ? span(index + 1)
      : link(index + 1, href)
  )
    .filter((href, index) => min <= index + 1 && index + 1 <= max)
    .join('\n')
}

const paginate = (
  pagination,
  currentPage,
  numPagesToShow = 7
) => {
  const {
    hrefs,
    pageNumber,
    previousPageHref,
    nextPageHref
  } = pagination
  const threshold = Math.floor(numPagesToShow / 2)

  const previousPage = pageNumber !== 0
    ? link('Previous Page', previousPageHref)
    : ''

  const nextPage = pageNumber !== hrefs.length - 1
    ? link('Next Page', nextPageHref)
    : ''

  // TODO: Propertly remove first and last page pagination
  const firstPage = pageNumber > threshold
    ? link('First page', pagination.firstPageHref)
    : ''
  const lastPage = pageNumber + threshold < pagination.hrefs.length
    ? link('Last page', pagination.lastPageHref)
    : ''

  const pages = getPages(pagination, currentPage, numPagesToShow)

  return `<nav class="c-pagination" role="navigation">
    ${firstPage}
    ${previousPage}
    ${pages}
    ${nextPage}
    ${lastPage}
  </nav>`
}

module.exports = paginate
