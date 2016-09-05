module.exports = {
  'extends': 'stylelint-config-idiomatic-order',
  'rules': {
    'rule-nested-empty-line-before': [
      // there are problems with empty lines with spaces
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'selector-class-pattern': [
      // B__E--M classes with names in a snake_case
      '[a-z]+(_[a-z]+)*' + // block
      '(__[a-z0-9]+(_[a-z0-9]+)*)?' + // element
      '(--[a-z0-9]+(_[a-z0-9]+)*(-[a-z0-9]+(_[a-z0-9]+)*)?)*', // modifier with optional value
      { 'resolveNestedSelectors': true }
    ],
    'string-quotes': 'double'
  }
}
