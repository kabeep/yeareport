<h1 align="center"> yeareport </h1>
<p align="center">
  <b>A NodeJS tool for summarizing git commits for annual reports, automatically generating Markdown</b>
</p>

---

<div align="center">

![nodejs](https://img.shields.io/badge/NodeJS-≥16.x-lightseagreen?logo=powershell)
![Version](https://img.shields.io/badge/Version-1.0.0-cornflowerblue)
[![License](https://img.shields.io/badge/License-MIT-slateblue)](LICENSE)

English | [简体中文](README.zh-CN.md)

</div>

## 📖 Introduction

`year-report` is a tool dedicated to serving individuals, assisting in writing annual reports.

> It can help you:
>
> - Summarize personal git work logs
>
> - Output pretty Markdown
>
> - Extract a list and count of specified work types
>
> How it differs from changelog-cli:
>
> - Focused on serving individuals
>
> - Flexible and controllable time range
>
> - More controllable output result modes
>
> - Better standard material designed for developers writing annual reports
>
> - Pre-parse data fed to GPT

[Markdown](example/yeareport_1705018390501.md) output result demonstration

![default_example](example/yeareport_1705018390501.png)

## ⚙️ Installation

1. Clone the repository

```shell
git clone https://github.com/kabeep/yeareport.git
```

2. Installation dependency

```shell
cd yeareport

# NPM
npm install

# or Yarn
yarn
```

3. Compile program

```shell
npm run build
```

4. NPM soft link

```shell
npm link
```

5. Test

```shell
yeareport -h
```

## 🚀 Usage

```text
yeareport <command> [options]

Commands:
  yeareport add     Add the current directory to the print queue, optional parameter: [--overwrite]
  yeareport remove  Remove the current working directory from the print queue     [aliases: rm]
  yeareport clear   Clear the print queue                                      [aliases: clr]
  yeareport print   Print files in the print queue into markdown files, output to
                    `User/Downloads/yeareport_xxx.md`, optional parameters: [--pretty]                                [aliases: ptr]
  yeareport show    Read the list of projects in the print queue

Options:
  -n, --username    [git commit] Username used, default to `git config --global username` [array]
  -d, --date        [git log] `--since` parameter, default to `01-01` of last year [string]
  -o, --overwrite   Overwrite operation when project log to be added already exists [boolean] [default: false]
      --output      Output directory for the print command, relative to the current working directory, default `User/Downloads` [string]
  -p, --pretty      Use emojis to beautify the commit type titles in the print  [boolean] [default: false]
      --type-first  Use commit type grouping for the print instead of project grouping, higher priority than --type-only [boolean] [default: false]
      --type-only   Input this parameter to only print the work content of that type, lower priority than --type-first [string]
  -h, --help        Show help information                                       [boolean]
  -v, --version     Show version number                                         [boolean]

Examples:
  yeareport add -n yourname                 Output the commit log of `yourname`, default to the user.name of git config global
  yeareport add -d 2024-01-01               Output all logs from `2024-01-01` to today, default to last_year-01-01
  yeareport add -o                          If the project in the current working directory already exists in the print queue, the program will decide to throw an exception/overwrite based on the `--overwrite` parameter
  yeareport print -p                        When this item exists, the second-level title will output: ## {commit-type-emoji} {commit-type}
```

## 🤝 Contribution
Contributions via Pull Requests or [Issues](https://github.com/kabeep/git-short-dir-prompt/issues) are welcome.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
