/* eslint-disable import/prefer-default-export */

/**
 *  We find all items by category
 * @param {Array} items - all items
 * @param {string} searchedSlug - searched category's slug
 * @return {Object} - finded items by category
 */
function findItemsByCategory(items, searchedSlug) {
  return items.filter((item) => item.category.slug === searchedSlug);
}

/**
 *  find an item in an item list
 * @param {Array} items - all items
 * @param {string} searchedSlug - searched item's slug
 * @return {Object} - finded item
 */
function findItem(items, searchedSlug) {
  return items.find((item) => item.slug === searchedSlug);
}

export { findItemsByCategory, findItem };
