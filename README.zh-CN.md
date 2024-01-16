<h1 align="center"> yeareport </h1>
<p align="center">
  <b>为年终报告总结 git commit 的 NodeJS 小工具，自动化生成 Markdown</b>
</p>

---

<div align="center">

![nodejs](https://img.shields.io/badge/NodeJS-≥16.x-lightseagreen?logo=powershell)
![Version](https://img.shields.io/badge/Version-1.0.0-cornflowerblue)
[![License](https://img.shields.io/badge/License-MIT-slateblue)](LICENSE)

[English](README.md) | 简体中文 | [日本語](README.ja-JP.md) | [हिंदी](README.hi-IN.md)

</div>

## 📖 简介

`year-report` 是一个专注服务于个人、辅助编写年终报告的工具。

> 它能够帮你：
>
> - 归纳个人的 git 工作日志
>
> - 输出优美的 Markdown
>
> - 提炼指定工作类型的内容列表与数量
>
> 它与 changelog-cli 有什么不同：
> 
> - 专注服务于个人
>
> - 灵活可控的时间范围
> 
> - 更多可控的输出结果模式
> 
> - 为开发者撰写年终报告设计的更好的标准材料
> 
> - 为 GPT 的投喂数据进行预解析

[Markdown](example/example.md) 输出结果演示

![default_example](example/screenshot.png)

## ⚙️ 安装

1. 克隆仓库

```shell
git clone https://github.com/kabeep/yeareport.git
```

2. 安装依赖

```shell
cd yeareport

# NPM
npm install

# 或者 Yarn
yarn
```

3. 编译程序

```shell
npm run build
```

4. NPM 软链接

```shell
npm link
```

5. 测试安装成功

```shell
yeareport -v
```

## 🚀 使用

![Usage](example/usage.png)

```text
yeareport <command> [options]

命令：
  yeareport add     将当前目录添加至队列
  yeareport remove  将当前工作目录从队列中移除                        [aliases: rm]
  yeareport clear   清空队列                                      [aliases: clr]
  yeareport print   将队列输出为 markdown 文件                     [aliases: ptr]
  yeareport show    显示队列中的日志列表

选项：
      --author     为 `auto` 时从 git global config 中查找，默认全部输出日志
                                                                       [字符串]
      --since      从某日开始输出，默认为 `2023-01-01`                     [字符串]
      --before     输出到某日结束，默认为 `2024-01-01`                     [字符串]
      --output     print 输出目录，相对于当前工作目录，默认 `User/Downloads`
                                                                       [字符串]
  -o, --overwrite  add 覆写授权，当前工作目录已存在时进行覆写操作
                                                          [布尔] [默认值: false]
  -p, --pretty     print 美化标题，使用 emoji 美化 Markdown 标题
                                                          [布尔] [默认值: false]
  -h, --help       显示帮助信息                                            [布尔]
  -v, --version    显示版本号                                              [布尔]

示例：
  yeareport add -o                          授权 add 命令当前工作目录的日志已在
                                            队列中时进行覆写
  yeareport add --author=kabeep             仅将作者 kabeep 的日志添加到队列
  yeareport add --since=2023-01-01          将 2023-01-01 到 2024-01-01
  --before=2024-01-01                       的日志添加到队列
  yeareport print -p                        Markdown 标题将输出 `# {emoji}
                                            {commit-type}`
```

## 🎯 RoadMap

- 统计与分词

- 百分比计算

- 趋势图

- 甘特图

## 🤝 贡献

欢迎通过 Pull Requests 或 [Issues](https://github.com/kabeep/git-short-dir-prompt/issues) 来贡献你的想法和代码。

## 📄 许可

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。