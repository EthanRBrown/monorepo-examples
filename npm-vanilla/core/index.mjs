import _ from 'lodash'

export function foo(arr) {
  return Array.isArray(arr) ? `foo ${_(arr).sort().uniq().value().join(', ')}` : `foo`
}
