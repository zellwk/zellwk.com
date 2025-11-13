// Dracula Color Palette - TextMate Standard Naming
const palette = {
  // Base colors (standard TextMate names)
  foreground: '#e5e7f2', // 40 uses - Main text color
  background: '#222027', // 13 uses - Main editor background
  comment: '#7e7d86', // 19 uses - Comments, disabled, secondary text

  // Syntax highlighting (TextMate token names)
  keyword: '#7b8bff', // 18 uses - Keywords, tags, operators, storage
  storage: '#7b8bff', // Alias for keyword (storage types, modifiers)
  operator: '#7b8bff', // Alias for keyword (operators, punctuation)

  string: '#fa5858', // 11 uses - Strings, markup, quoted text
  stringQuote: '#fa5858', // String quotes and delimiters

  constant: '#f7bd2b', // 18 uses - Constants, booleans, numbers, headers
  number: '#f7bd2b', // Alias for constant (numeric literals)
  boolean: '#f7bd2b', // Alias for constant (true/false)

  variable: '#F8F8F2', // Variables (uses foreground)
  parameter: '#FFB86C', // 15 uses - Function parameters, variables in special contexts
  property: '#8BE9FE', // Property name punctuation

  function: '#50FA7B', // 15 uses - Functions, methods, attributes
  attribute: '#50FA7B', // Alias for function (HTML/JSX attributes)

  class: '#8BE9FD', // 19 uses - Classes, types, interfaces, support
  type: '#8BE9FD', // Alias for class (type names)
  interface: '#8BE9FD', // Alias for class (interfaces)

  // UI State colors
  invalid: '#FF5555', // 16 uses - Errors, deletions, invalid code
  deprecated: '#F8F8F2', // Deprecated code (uses foreground with underline)

  // Background variants
  backgroundDark: '#21222C', // 14 uses - Sidebars, panels, widgets
  backgroundDarker: '#191A21', // 16 uses - Borders, status bar, darker surfaces
  backgroundLight: '#343746', // 5 uses - Dropdowns, buttons, hover states
  backgroundFaded: '#21222C80', // Fold backgrounds, subtle overlays

  // Selection colors
  selection: '#44475A', // 9 uses - Selected text, active elements
  selectionInactive: '#424450', // 2 uses - Secondary selection highlight
  selectionSubtle: '#44475A75', // 4 uses - Inactive selections, hover states
  selectionFaded: '#44475A70', // Subtle selection overlay

  // Guide/decoration colors
  guide: '#FFFFFF1A', // 3 uses - Guides, rulers, very faint text
  guideActive: '#FFFFFF45', // Active text highlights

  // Diff/Git colors
  diffAdded: '#50FA7B', // Additions, success states
  diffAddedFaint: '#50FA7B20', // Subtle addition backgrounds
  diffAddedMedium: '#50FA7B50', // Medium addition backgrounds
  diffAddedStrong: '#50FA7B80', // 2 uses - Addition indicators, gutter marks
  diffAddedBright: '#50FA7B90', // 2 uses - Prominent success buttons/badges
  diffAddedHighlight: '#50FA7B60', // Addition hover states

  diffModified: '#8BE9FD', // Modifications, info states
  diffModifiedFaint: '#8BE9FD50', // 2 uses - Word highlights, hover effects
  diffModifiedStrong: '#8BE9FD80', // 3 uses - Info markers, modified indicators

  diffDeleted: '#FF5555', // Deletions, errors
  diffDeletedFaint: '#FF555550', // Error diff backgrounds
  diffDeletedStrong: '#FF555580', // 3 uses - Error underlines, error backgrounds

  // Warning/attention colors
  warning: '#FFB86C', // 15 uses - Warnings, modifications, attention needed
  warningFaint: '#FFB86C80', // 2 uses - Warning indicators

  // Accent/highlight colors
  accent: '#FF79C680', // 2 uses - Active borders, accent highlights
  highlight: '#FFFFFF40', // Text search highlights
  highlightString: '#F1FA8C80', // 2 uses - String match highlights

  constantFaint: '#BD93F910', // Subtle constant backgrounds
  constantMedium: '#BD93F915', // Range highlights
  constantStrong: '#BD93F990', // Strong constant backgrounds

  // Terminal ANSI colors (bright variants)
  terminalBrightBlue: '#D6ACFF',
  terminalBrightCyan: '#A4FFFF',
  terminalBrightGreen: '#69FF94',
  terminalBrightMagenta: '#FF92DF',
  terminalBrightRed: '#FF6E6E',
  terminalBrightWhite: '#FFFFFF',
  terminalBrightYellow: '#FFFFA5',
}

export default {
  colors: {
    'activityBar.activeBackground': palette.constantFaint,
    'activityBar.activeBorder': palette.accent,
    'activityBar.background': palette.backgroundLight,
    'activityBar.foreground': palette.foreground,
    'activityBar.inactiveForeground': palette.comment,
    'activityBarBadge.background': palette.keyword,
    'activityBarBadge.foreground': palette.foreground,
    'badge.background': palette.selection,
    'badge.foreground': palette.foreground,
    'breadcrumb.activeSelectionForeground': palette.foreground,
    'breadcrumb.background': palette.background,
    'breadcrumb.focusForeground': palette.foreground,
    'breadcrumb.foreground': palette.comment,
    'breadcrumbPicker.background': palette.backgroundDarker,
    'button.background': palette.selection,
    'button.foreground': palette.foreground,
    'button.secondaryBackground': palette.background,
    'button.secondaryForeground': palette.foreground,
    'button.secondaryHoverBackground': palette.backgroundLight,
    'debugToolBar.background': palette.backgroundDark,
    'diffEditor.insertedTextBackground': palette.diffAddedFaint,
    'diffEditor.removedTextBackground': palette.diffDeletedFaint,
    'dropdown.background': palette.backgroundLight,
    'dropdown.border': palette.backgroundDarker,
    'dropdown.foreground': palette.foreground,
    'editor.background': palette.background,
    'editor.findMatchBackground': palette.warningFaint,
    'editor.findMatchHighlightBackground': palette.highlight,
    'editor.findRangeHighlightBackground': palette.selectionSubtle,
    'editor.foldBackground': palette.backgroundFaded,
    'editor.foreground': palette.foreground,
    'editor.hoverHighlightBackground': palette.diffModifiedFaint,
    'editor.lineHighlightBorder': palette.selection,
    'editor.rangeHighlightBackground': palette.constantMedium,
    'editor.selectionBackground': palette.selection,
    'editor.selectionHighlightBackground': palette.selectionInactive,
    'editor.snippetFinalTabstopHighlightBackground': palette.background,
    'editor.snippetFinalTabstopHighlightBorder': palette.function,
    'editor.snippetTabstopHighlightBackground': palette.background,
    'editor.snippetTabstopHighlightBorder': palette.comment,
    'editor.wordHighlightBackground': palette.diffModifiedFaint,
    'editor.wordHighlightStrongBackground': palette.diffAddedMedium,
    'editorBracketHighlight.foreground1': palette.foreground,
    'editorBracketHighlight.foreground2': palette.keyword,
    'editorBracketHighlight.foreground3': palette.class,
    'editorBracketHighlight.foreground4': palette.function,
    'editorBracketHighlight.foreground5': palette.constant,
    'editorBracketHighlight.foreground6': palette.parameter,
    'editorBracketHighlight.unexpectedBracket.foreground': palette.invalid,
    'editorCodeLens.foreground': palette.comment,
    'editorError.foreground': palette.invalid,
    'editorGroup.border': palette.constant,
    'editorGroup.dropBackground': palette.selectionFaded,
    'editorGroupHeader.tabsBackground': palette.backgroundDarker,
    'editorGutter.addedBackground': palette.diffAddedStrong,
    'editorGutter.deletedBackground': palette.diffDeletedStrong,
    'editorGutter.modifiedBackground': palette.diffModifiedStrong,
    'editorHoverWidget.background': palette.background,
    'editorHoverWidget.border': palette.comment,
    'editorIndentGuide.activeBackground': palette.guideActive,
    'editorIndentGuide.background': palette.guide,
    'editorLineNumber.foreground': palette.comment,
    'editorLink.activeForeground': palette.class,
    'editorMarkerNavigation.background': palette.backgroundDark,
    'editorOverviewRuler.addedForeground': palette.diffAddedStrong,
    'editorOverviewRuler.border': palette.backgroundDarker,
    'editorOverviewRuler.currentContentForeground': palette.function,
    'editorOverviewRuler.deletedForeground': palette.diffDeletedStrong,
    'editorOverviewRuler.errorForeground': palette.diffDeletedStrong,
    'editorOverviewRuler.incomingContentForeground': palette.constant,
    'editorOverviewRuler.infoForeground': palette.diffModifiedStrong,
    'editorOverviewRuler.modifiedForeground': palette.diffModifiedStrong,
    'editorOverviewRuler.selectionHighlightForeground': palette.parameter,
    'editorOverviewRuler.warningForeground': palette.warningFaint,
    'editorOverviewRuler.wordHighlightForeground': palette.class,
    'editorOverviewRuler.wordHighlightStrongForeground': palette.function,
    'editorRuler.foreground': palette.guide,
    'editorSuggestWidget.background': palette.backgroundDark,
    'editorSuggestWidget.foreground': palette.foreground,
    'editorSuggestWidget.selectedBackground': palette.selection,
    'editorWarning.foreground': palette.warning,
    'editorWhitespace.foreground': palette.guide,
    'editorWidget.background': palette.backgroundDark,
    errorForeground: palette.invalid,
    'extensionButton.prominentBackground': palette.diffAddedBright,
    'extensionButton.prominentForeground': palette.foreground,
    'extensionButton.prominentHoverBackground': palette.diffAddedHighlight,
    focusBorder: palette.comment,
    foreground: palette.foreground,
    'gitDecoration.conflictingResourceForeground': palette.warning,
    'gitDecoration.deletedResourceForeground': palette.invalid,
    'gitDecoration.ignoredResourceForeground': palette.comment,
    'gitDecoration.modifiedResourceForeground': palette.diffModified,
    'gitDecoration.untrackedResourceForeground': palette.diffAdded,
    'inlineChat.regionHighlight': palette.backgroundLight,
    'input.background': palette.background,
    'input.border': palette.backgroundDarker,
    'input.foreground': palette.foreground,
    'input.placeholderForeground': palette.comment,
    'inputOption.activeBorder': palette.constant,
    'inputValidation.errorBorder': palette.invalid,
    'inputValidation.infoBorder': palette.keyword,
    'inputValidation.warningBorder': palette.warning,
    'list.activeSelectionBackground': palette.selection,
    'list.activeSelectionForeground': palette.foreground,
    'list.dropBackground': palette.selection,
    'list.errorForeground': palette.invalid,
    'list.focusBackground': palette.selectionSubtle,
    'list.highlightForeground': palette.diffModified,
    'list.hoverBackground': palette.selectionSubtle,
    'list.inactiveSelectionBackground': palette.selectionSubtle,
    'list.warningForeground': palette.warning,
    'listFilterWidget.background': palette.backgroundLight,
    'listFilterWidget.noMatchesOutline': palette.invalid,
    'listFilterWidget.outline': palette.selectionInactive,
    'merge.currentHeaderBackground': palette.diffAddedBright,
    'merge.incomingHeaderBackground': palette.constantStrong,
    'panel.background': palette.background,
    'panel.border': palette.constant,
    'panelTitle.activeBorder': palette.keyword,
    'panelTitle.activeForeground': palette.foreground,
    'panelTitle.inactiveForeground': palette.comment,
    'peekView.border': palette.selection,
    'peekViewEditor.background': palette.background,
    'peekViewEditor.matchHighlightBackground': palette.highlightString,
    'peekViewResult.background': palette.backgroundDark,
    'peekViewResult.fileForeground': palette.foreground,
    'peekViewResult.lineForeground': palette.foreground,
    'peekViewResult.matchHighlightBackground': palette.highlightString,
    'peekViewResult.selectionBackground': palette.selection,
    'peekViewResult.selectionForeground': palette.foreground,
    'peekViewTitle.background': palette.backgroundDarker,
    'peekViewTitleDescription.foreground': palette.comment,
    'peekViewTitleLabel.foreground': palette.foreground,
    'pickerGroup.border': palette.constant,
    'pickerGroup.foreground': palette.class,
    'progressBar.background': palette.keyword,
    'selection.background': palette.constant,
    'settings.checkboxBackground': palette.backgroundDark,
    'settings.checkboxBorder': palette.backgroundDarker,
    'settings.checkboxForeground': palette.foreground,
    'settings.dropdownBackground': palette.backgroundDark,
    'settings.dropdownBorder': palette.backgroundDarker,
    'settings.dropdownForeground': palette.foreground,
    'settings.headerForeground': palette.foreground,
    'settings.modifiedItemIndicator': palette.parameter,
    'settings.numberInputBackground': palette.backgroundDark,
    'settings.numberInputBorder': palette.backgroundDarker,
    'settings.numberInputForeground': palette.foreground,
    'settings.textInputBackground': palette.backgroundDark,
    'settings.textInputBorder': palette.backgroundDarker,
    'settings.textInputForeground': palette.foreground,
    'sideBar.background': palette.backgroundDark,
    'sideBarSectionHeader.background': palette.background,
    'sideBarSectionHeader.border': palette.backgroundDarker,
    'sideBarTitle.foreground': palette.foreground,
    'statusBar.background': palette.backgroundDarker,
    'statusBar.debuggingBackground': palette.invalid,
    'statusBar.debuggingForeground': palette.backgroundDarker,
    'statusBar.foreground': palette.foreground,
    'statusBar.noFolderBackground': palette.backgroundDarker,
    'statusBar.noFolderForeground': palette.foreground,
    'statusBarItem.prominentBackground': palette.invalid,
    'statusBarItem.prominentHoverBackground': palette.warning,
    'statusBarItem.remoteBackground': palette.constant,
    'statusBarItem.remoteForeground': palette.background,
    'tab.activeBackground': palette.background,
    'tab.activeBorderTop': palette.accent,
    'tab.activeForeground': palette.foreground,
    'tab.border': palette.backgroundDarker,
    'tab.inactiveBackground': palette.backgroundDark,
    'tab.inactiveForeground': palette.comment,
    'terminal.ansiBlack': palette.backgroundDark,
    'terminal.ansiBlue': palette.constant,
    'terminal.ansiBrightBlack': palette.comment,
    'terminal.ansiBrightBlue': palette.terminalBrightBlue,
    'terminal.ansiBrightCyan': palette.terminalBrightCyan,
    'terminal.ansiBrightGreen': palette.terminalBrightGreen,
    'terminal.ansiBrightMagenta': palette.terminalBrightMagenta,
    'terminal.ansiBrightRed': palette.terminalBrightRed,
    'terminal.ansiBrightWhite': palette.terminalBrightWhite,
    'terminal.ansiBrightYellow': palette.terminalBrightYellow,
    'terminal.ansiCyan': palette.class,
    'terminal.ansiGreen': palette.function,
    'terminal.ansiMagenta': palette.keyword,
    'terminal.ansiRed': palette.invalid,
    'terminal.ansiWhite': palette.foreground,
    'terminal.ansiYellow': palette.string,
    'terminal.background': palette.background,
    'terminal.foreground': palette.foreground,
    'titleBar.activeBackground': palette.backgroundDark,
    'titleBar.activeForeground': palette.foreground,
    'titleBar.inactiveBackground': palette.backgroundDarker,
    'titleBar.inactiveForeground': palette.comment,
    'walkThrough.embeddedEditorBackground': palette.backgroundDark,
  },
  displayName: 'Dracula Theme',
  name: 'dracula',
  semanticHighlighting: true,
  tokenColors: [
    {
      scope: ['emphasis'],
      settings: { fontStyle: 'italic' },
    },
    {
      scope: ['strong'],
      settings: { fontStyle: 'bold' },
    },
    {
      scope: ['header'],
      settings: { foreground: palette.constant },
    },
    {
      scope: ['meta.diff', 'meta.diff.header'],
      settings: { foreground: palette.comment },
    },
    {
      scope: ['markup.inserted'],
      settings: { foreground: palette.function },
    },
    {
      scope: ['markup.deleted'],
      settings: { foreground: palette.invalid },
    },
    {
      scope: ['markup.changed'],
      settings: { foreground: palette.parameter },
    },
    {
      scope: ['invalid'],
      settings: { fontStyle: 'underline italic', foreground: palette.invalid },
    },
    {
      scope: ['invalid.deprecated'],
      settings: {
        fontStyle: 'underline italic',
        foreground: palette.foreground,
      },
    },
    {
      scope: ['entity.name.filename'],
      settings: { foreground: palette.string },
    },
    {
      scope: ['markup.error'],
      settings: { foreground: palette.invalid },
    },
    {
      scope: ['markup.underline'],
      settings: { fontStyle: 'underline' },
    },
    {
      scope: ['markup.bold'],
      settings: { fontStyle: 'bold', foreground: palette.parameter },
    },
    {
      scope: ['markup.heading'],
      settings: { fontStyle: 'bold', foreground: palette.constant },
    },
    {
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic', foreground: palette.string },
    },
    {
      scope: [
        'beginning.punctuation.definition.list.markdown',
        'beginning.punctuation.definition.quote.markdown',
        'punctuation.definition.link.restructuredtext',
      ],
      settings: { foreground: palette.class },
    },
    {
      scope: ['markup.inline.raw', 'markup.raw.restructuredtext'],
      settings: { foreground: palette.function },
    },
    {
      scope: ['markup.underline.link', 'markup.underline.link.image'],
      settings: { foreground: palette.class },
    },
    {
      scope: [
        'meta.link.reference.def.restructuredtext',
        'punctuation.definition.directive.restructuredtext',
        'string.other.link.description',
        'string.other.link.title',
      ],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['entity.name.directive.restructuredtext', 'markup.quote'],
      settings: { fontStyle: 'italic', foreground: palette.string },
    },
    {
      scope: ['meta.separator.markdown'],
      settings: { foreground: palette.comment },
    },
    {
      scope: [
        'fenced_code.block.language',
        'markup.raw.inner.restructuredtext',
        'markup.fenced_code.block.markdown punctuation.definition.markdown',
      ],
      settings: { foreground: palette.function },
    },
    {
      scope: ['punctuation.definition.constant.restructuredtext'],
      settings: { foreground: palette.constant },
    },
    {
      scope: [
        'markup.heading.markdown punctuation.definition.string.begin',
        'markup.heading.markdown punctuation.definition.string.end',
      ],
      settings: { foreground: palette.constant },
    },
    {
      scope: [
        'meta.paragraph.markdown punctuation.definition.string.begin',
        'meta.paragraph.markdown punctuation.definition.string.end',
      ],
      settings: { foreground: palette.foreground },
    },
    {
      scope: [
        'markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.begin',
        'markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.end',
      ],
      settings: { foreground: palette.string },
    },
    {
      scope: ['entity.name.type.class', 'entity.name.class'],
      settings: { fontStyle: 'normal', foreground: palette.class },
    },
    {
      scope: [
        'keyword.expressions-and-types.swift',
        'keyword.other.this',
        'variable.language',
        'variable.language punctuation.definition.variable.php',
        'variable.other.readwrite.instance.ruby',
        'variable.parameter.function.language.special',
      ],
      settings: { fontStyle: 'italic', foreground: palette.constant },
    },
    {
      scope: ['entity.other.inherited-class'],
      settings: { fontStyle: 'italic', foreground: palette.class },
    },
    {
      scope: [
        'comment',
        'punctuation.definition.comment',
        'unused.comment',
        'wildcard.comment',
      ],
      settings: { foreground: palette.comment },
    },
    {
      scope: [
        'comment keyword.codetag.notation',
        'comment.block.documentation keyword',
        'comment.block.documentation storage.type.class',
      ],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['comment.block.documentation entity.name.type'],
      settings: { fontStyle: 'italic', foreground: palette.class },
    },
    {
      scope: [
        'comment.block.documentation entity.name.type punctuation.definition.bracket',
      ],
      settings: { foreground: palette.class },
    },
    {
      scope: ['comment.block.documentation variable'],
      settings: { fontStyle: 'italic', foreground: palette.parameter },
    },
    {
      scope: ['constant', 'variable.other.constant'],
      settings: { foreground: palette.constant },
    },
    {
      scope: [
        'constant.character.escape',
        'constant.character.string.escape',
        'constant.regexp',
      ],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['entity.name.tag'],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['entity.other.attribute-name.parent-selector'],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { fontStyle: 'italic', foreground: palette.function },
    },
    {
      scope: [
        'entity.name.function',
        'meta.function-call.object',
        'meta.function-call.php',
        'meta.function-call.static',
        'meta.method-call.java meta.method',
        'meta.method.groovy',
        'support.function.any-method.lua',
        'keyword.operator.function.infix',
      ],
      settings: { foreground: palette.function },
    },
    {
      scope: [
        'entity.name.variable.parameter',
        'meta.at-rule.function variable',
        'meta.at-rule.mixin variable',
        'meta.function.arguments variable.other.php',
        'meta.selectionset.graphql meta.arguments.graphql variable.arguments.graphql',
        'variable.parameter',
      ],
      settings: { fontStyle: 'italic', foreground: palette.parameter },
    },
    {
      scope: [
        'meta.decorator variable.other.readwrite',
        'meta.decorator variable.other.property',
      ],
      settings: { fontStyle: 'italic', foreground: palette.function },
    },
    {
      scope: ['meta.decorator variable.other.object'],
      settings: { foreground: palette.function },
    },
    {
      scope: ['keyword', 'punctuation.definition.keyword'],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['keyword.control.new', 'keyword.operator.new'],
      settings: { fontStyle: 'bold' },
    },
    {
      scope: ['meta.selector'],
      settings: { foreground: palette.keyword },
    },
    {
      scope: ['support'],
      settings: { fontStyle: 'italic', foreground: palette.class },
    },
    {
      scope: [
        'support.function.magic',
        'support.variable',
        'variable.other.predefined',
      ],
      settings: { fontStyle: 'regular', foreground: palette.constant },
    },
    {
      scope: ['support.function', 'support.type.property-name'],
      settings: { fontStyle: 'regular' },
    },
    {
      scope: [
        'constant.other.symbol.hashkey punctuation.definition.constant.ruby',
        'entity.other.attribute-name.placeholder punctuation',
        'entity.other.attribute-name.pseudo-class punctuation',
        'entity.other.attribute-name.pseudo-element punctuation',
        'meta.group.double.toml',
        'meta.group.toml',
        'meta.object-binding-pattern-variable punctuation.destructuring',
        'punctuation.colon.graphql',
        'punctuation.definition.block.scalar.folded.yaml',
        'punctuation.definition.block.scalar.literal.yaml',
        'punctuation.definition.block.sequence.item.yaml',
        'punctuation.definition.entity.other.inherited-class',
        'punctuation.function.swift',
        'punctuation.separator.dictionary.key-value',
        'punctuation.separator.hash',
        'punctuation.separator.inheritance',
        'punctuation.separator.key-value',
        'punctuation.separator.key-value.mapping.yaml',
        'punctuation.separator.namespace',
        'punctuation.separator.pointer-access',
        'punctuation.separator.slice',
        'string.unquoted.heredoc punctuation.definition.string',
        'support.other.chomping-indicator.yaml',
        'punctuation.separator.annotation',
      ],
      settings: { foreground: palette.keyword },
    },
    {
      scope: [
        'keyword.operator.other.powershell',
        'keyword.other.statement-separator.powershell',
        'meta.brace.round',
        'meta.function-call punctuation',
        'punctuation.definition.arguments.begin',
        'punctuation.definition.arguments.end',
        'punctuation.definition.entity.begin',
        'punctuation.definition.entity.end',
        'punctuation.definition.tag.cs',
        'punctuation.definition.type.begin',
        'punctuation.definition.type.end',
        'punctuation.section.scope.begin',
        'punctuation.section.scope.end',
        'punctuation.terminator.expression.php',
        'storage.type.generic.java',
        'string.template meta.brace',
        'string.template punctuation.accessor',
      ],
      settings: { foreground: palette.foreground },
    },
    {
      scope: [
        'meta.string-contents.quoted.double punctuation.definition.variable',
        'punctuation.definition.interpolation.begin',
        'punctuation.definition.interpolation.end',
        'punctuation.definition.template-expression.begin',
        'punctuation.definition.template-expression.end',
        'punctuation.section.embedded.begin',
        'punctuation.section.embedded.coffee',
        'punctuation.section.embedded.end',
        'punctuation.section.embedded.end source.php',
        'punctuation.section.embedded.end source.ruby',
        'punctuation.definition.variable.makefile',
      ],
      settings: { foreground: palette.keyword },
    },
    {
      scope: [
        'entity.name.function.target.makefile',
        'entity.name.section.toml',
        'entity.name.tag.yaml',
        'variable.other.key.toml',
      ],
      settings: { foreground: palette.class },
    },
    {
      scope: ['constant.other.date', 'constant.other.timestamp'],
      settings: { foreground: palette.parameter },
    },
    {
      scope: ['variable.other.alias.yaml'],
      settings: { fontStyle: 'italic underline', foreground: palette.function },
    },
    {
      scope: [
        'storage',
        'meta.implementation storage.type.objc',
        'meta.interface-or-protocol storage.type.objc',
        'source.groovy storage.type.def',
      ],
      settings: { fontStyle: 'regular', foreground: palette.keyword },
    },
    {
      scope: [
        'entity.name.type',
        'keyword.primitive-datatypes.swift',
        'keyword.type.cs',
        'meta.protocol-list.objc',
        'meta.return-type.objc',
        'source.go storage.type',
        'source.groovy storage.type',
        'source.java storage.type',
        'source.powershell entity.other.attribute-name',
        'storage.class.std.rust',
        'storage.type.attribute.swift',
        'storage.type.c',
        'storage.type.core.rust',
        'storage.type.cs',
        'storage.type.groovy',
        'storage.type.objc',
        'storage.type.php',
        'storage.type.haskell',
        'storage.type.ocaml',
      ],
      settings: { fontStyle: 'italic', foreground: palette.class },
    },
    {
      scope: [
        'entity.name.type.type-parameter',
        'meta.indexer.mappedtype.declaration entity.name.type',
        'meta.type.parameters entity.name.type',
      ],
      settings: { foreground: palette.parameter },
    },
    {
      scope: ['storage.modifier'],
      settings: { foreground: palette.keyword },
    },
    {
      scope: [
        'string.regexp',
        'constant.other.character-class.set.regexp',
        'constant.character.escape.backslash.regexp',
      ],
      settings: { foreground: palette.string },
    },
    {
      scope: ['punctuation.definition.group.capture.regexp'],
      settings: { foreground: palette.keyword },
    },
    {
      scope: [
        'string.regexp punctuation.definition.string.begin',
        'string.regexp punctuation.definition.string.end',
      ],
      settings: { foreground: palette.invalid },
    },
    {
      scope: ['punctuation.definition.character-class.regexp'],
      settings: { foreground: palette.class },
    },
    {
      scope: ['punctuation.definition.group.regexp'],
      settings: { foreground: palette.parameter },
    },
    {
      scope: [
        'punctuation.definition.group.assertion.regexp',
        'keyword.operator.negation.regexp',
      ],
      settings: { foreground: palette.invalid },
    },
    {
      scope: ['meta.assertion.look-ahead.regexp'],
      settings: { foreground: palette.function },
    },
    {
      scope: ['string'],
      settings: { foreground: palette.string },
    },
    {
      scope: [
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: palette.stringQuote },
    },
    {
      scope: [
        'punctuation.support.type.property-name.begin',
        'punctuation.support.type.property-name.end',
      ],
      settings: { foreground: palette.property },
    },
    {
      scope: [
        'string.quoted.docstring.multi',
        'string.quoted.docstring.multi.python punctuation.definition.string.begin',
        'string.quoted.docstring.multi.python punctuation.definition.string.end',
        'string.quoted.docstring.multi.python constant.character.escape',
      ],
      settings: { foreground: palette.comment },
    },
    {
      scope: [
        'variable',
        'constant.other.key.perl',
        'support.variable.property',
        'variable.other.constant.js',
        'variable.other.constant.ts',
        'variable.other.constant.tsx',
      ],
      settings: { foreground: palette.foreground },
    },
    {
      scope: [
        'meta.import variable.other.readwrite',
        'meta.variable.assignment.destructured.object.coffee variable',
      ],
      settings: { fontStyle: 'italic', foreground: palette.parameter },
    },
    {
      scope: [
        'meta.import variable.other.readwrite.alias',
        'meta.export variable.other.readwrite.alias',
        'meta.variable.assignment.destructured.object.coffee variable variable',
      ],
      settings: { fontStyle: 'normal', foreground: palette.foreground },
    },
    {
      scope: ['meta.selectionset.graphql variable'],
      settings: { foreground: palette.string },
    },
    {
      scope: ['meta.selectionset.graphql meta.arguments variable'],
      settings: { foreground: palette.foreground },
    },
    {
      scope: ['entity.name.fragment.graphql', 'variable.fragment.graphql'],
      settings: { foreground: palette.class },
    },
    {
      scope: [
        'constant.other.symbol.hashkey.ruby',
        'keyword.operator.dereference.java',
        'keyword.operator.navigation.groovy',
        'meta.scope.for-loop.shell punctuation.definition.string.begin',
        'meta.scope.for-loop.shell punctuation.definition.string.end',
        'meta.scope.for-loop.shell string',
        'storage.modifier.import',
        'punctuation.section.embedded.begin.tsx',
        'punctuation.section.embedded.end.tsx',
        'punctuation.section.embedded.begin.jsx',
        'punctuation.section.embedded.end.jsx',
        'punctuation.separator.list.comma.css',
        'constant.language.empty-list.haskell',
      ],
      settings: { foreground: palette.foreground },
    },
    {
      scope: ['source.shell variable.other'],
      settings: { foreground: palette.constant },
    },
    {
      scope: ['support.constant'],
      settings: { fontStyle: 'normal', foreground: palette.constant },
    },
    {
      scope: ['meta.scope.prerequisites.makefile'],
      settings: { foreground: palette.string },
    },
    {
      scope: ['meta.attribute-selector.scss'],
      settings: { foreground: palette.string },
    },
    {
      scope: [
        'punctuation.definition.attribute-selector.end.bracket.square.scss',
        'punctuation.definition.attribute-selector.begin.bracket.square.scss',
      ],
      settings: { foreground: palette.foreground },
    },
    {
      scope: ['meta.preprocessor.haskell'],
      settings: { foreground: palette.comment },
    },
    {
      scope: ['log.error'],
      settings: { fontStyle: 'bold', foreground: palette.invalid },
    },
    {
      scope: ['log.warning'],
      settings: { fontStyle: 'bold', foreground: palette.string },
    },
  ],
  type: 'dark',
}
