# tailwind-apply-cli

A nodejs cli that generates a tailwind.css classes with `@apply` for most reused classStrings and replaces them in your html or templates

## Installation

```bash
npm i tailwind-apply-cli
```

## Usage

```bash
npx twapply <glob_pattern>
```

## Example

This will generate className and tailwind.css for all class strings defined in the _.js and _.html files in current directory and its child directories

```bash
npx twapply "./**/*.(jsx|html)"
```

# Demo

[![demo](https://raw.githubusercontent.com/technikhil314/my-static-assets/master/terminal-casts/tailwind-apply-cli.svg)](https://raw.githubusercontent.com/technikhil314/my-static-assets/master/terminal-casts/tailwind-apply-cli.svg)
