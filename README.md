<h1 align="center"> yeareport </h1>
<p align="center">
  <b>A NodeJS tool for summarizing git commits for annual reports, automatically generating Markdown</b>
</p>

---

<div align="center">

![nodejs](https://img.shields.io/badge/NodeJS-≥16.x-lightseagreen?logo=powershell)
![Version](https://img.shields.io/badge/Version-1.0.0-cornflowerblue)
[![License](https://img.shields.io/badge/License-MIT-slateblue)](LICENSE)

English | [简体中文](README.zh-CN.md) | [日本語](README.ja-JP.md) | [हिंदी](README.hi-IN.md)

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

[Markdown](example/example.md) output result demonstration

![default_example](example/screenshot.png)

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

![Usage](example/usage.png)

```text
yeareport <command> [options]

命令：
  yeareport add     Add the current directory to the queue
  yeareport remove  Remove the current working directory from the queue
                                                                   [aliases: rm]
  yeareport clear   Clear the queue                               [aliases: clr]
  yeareport print   Output the queue as a markdown file           [aliases: ptr]
  yeareport show    Show the list of logs in the queue

选项：
      --author     When `auto`, look up from git global config, default to
                   output all logs                                      [string]
      --since      Start outputting from a certain date, default to `2023-01-01`
                                                                        [string]
      --before     End outputting on a certain date, default to `2024-01-01`
                                                                        [string]
      --output     print output directory, relative to the current working
                   directory, default `User/Downloads`                  [string]
  -o, --overwrite  add overwrite authorization, perform overwrite operation when
                   the current working directory already exists
                                                          [bool] [default: false]
  -p, --pretty     print beautify the title, use emoji to beautify Markdown
                   titles                                 [bool] [default: false]
  -h, --help       显示帮助信息                                           [bool]
  -v, --version    显示版本号                                             [bool]

示例：
  yeareport add -o                          Authorize the add command to
                                            overwrite when logs of the current
                                            working directory are already in the
                                            queue
  yeareport add --author=kabeep             Only add logs of author kabeep to
                                            the queue
  yeareport add --since=2023-01-01          Add logs from 2023-01-01 to
  --before=2024-01-01                       2024-01-01 to the queue
  yeareport print -p                        Markdown titles will output `#
                                            {emoji} {commit-type}`
```

## 🎯 RoadMap

- Statistical analysis and word segmentation

- Percentage calculation

- Trend chart

- Gantt chart

## 🤝 Contribution
Contributions via Pull Requests or [Issues](https://github.com/kabeep/git-short-dir-prompt/issues) are welcome.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
