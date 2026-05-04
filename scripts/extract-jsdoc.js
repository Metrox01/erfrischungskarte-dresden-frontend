const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()
const defaultTargets = [
  path.join(projectRoot, 'src/modules/RefreshmentMap/index.tsx'),
  path.join(projectRoot, 'src/modules/RefreshmentMap/content.tsx'),
]

const inputFiles = process.argv.slice(2)
const targets = inputFiles.length > 0 ? inputFiles : []

const outputPath = path.join(projectRoot, 'docs/jsdoc.md')

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8')

const shouldSkipDir = (dirName) =>
  [
    'node_modules',
    '.git',
    '.next',
    'dist',
    'build',
    'coverage',
  ].includes(dirName)

const isCodeFile = (filePath) =>
  ['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(filePath))

const walkFiles = (dirPath, files = []) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name)) {
        walkFiles(path.join(dirPath, entry.name), files)
      }
      continue
    }

    const fullPath = path.join(dirPath, entry.name)
    if (isCodeFile(fullPath)) {
      files.push(fullPath)
    }
  }

  return files
}

const normalizePath = (filePath) =>
  filePath.startsWith(projectRoot)
    ? filePath.slice(projectRoot.length + 1)
    : filePath

const extractJSDocBlocks = (content) => {
  const blocks = []
  const regex = /\/\*\*[\s\S]*?\*\//g
  let match = regex.exec(content)

  while (match) {
    const jsdoc = match[0]
    const after = content.slice(match.index + jsdoc.length)
    const nextLine = after
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.length > 0)

    blocks.push({ jsdoc, nextLine: nextLine || '' })
    match = regex.exec(content)
  }

  return blocks
}

const renderBlock = (block) => {
  const cleaned = block.jsdoc
    .replace(/^\/\*\*\s?/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\* ?/, '').trimEnd())
    .filter((line) => line.length > 0)

  const lines = cleaned.map((line) => `- ${line}`)
  const targetLine = block.nextLine ? `\nTarget: ${block.nextLine}` : ''

  return lines.join('\n') + targetLine
}

const sections = []

const fileList = targets.length > 0 ? targets : defaultTargets

for (const filePath of fileList) {
  if (!fs.existsSync(filePath)) {
    sections.push(`## ${normalizePath(filePath)}\n\n- File not found.`)
    continue
  }

  const content = readFile(filePath)
  const blocks = extractJSDocBlocks(content)

  if (blocks.length === 0) {
    sections.push(`## ${normalizePath(filePath)}\n\n- No JSDoc blocks found.`)
    continue
  }

  const renderedBlocks = blocks
    .map((block) => renderBlock(block))
    .map((blockText) => `\n${blockText}`)
    .join('\n')

  sections.push(`## ${normalizePath(filePath)}\n${renderedBlocks}`)
}

const header = '# Extracted JSDoc\n\n'
const body = sections.join('\n\n') + '\n'

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, header + body)

console.log(`Wrote ${normalizePath(outputPath)}`)
