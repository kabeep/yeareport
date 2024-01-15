<h1 align="center"> yeareport </h1>
<p align="center">
  <b>वर्ष के अंत की रिपोरट के लिए git commit का सारांश देने वाला NodeJS उपकरण, Markdown का स्वचालित निर्माण</b>
</p>

---

<div align="center">

![nodejs](https://img.shields.io/badge/NodeJS-≥16.x-lightseagreen?logo=powershell)
![Version](https://img.shields.io/badge/Version-1.0.0-cornflowerblue)
[![License](https://img.shields.io/badge/License-MIT-slateblue)](LICENSE)

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja-JP.md) | हिंदी

</div>

## 📖 परिचय

year-report व्यक्तियों की सेवा के लिए समर्पित एक उपकरण है, जो वार्षिक रिपोर्ट लिखने में सहायता करता है।

> यह आपकी सहायता कर सकता है:
>
> व्यक्तिगत गिट कार्य लॉग का सारांश तैयार करना
>
> सुंदर मार्कडाउन आउटपुट करना
>
> निर्दिष्ट कार्य प्रकारों की सूची और संख्या निकालना
>
> यह changelog-cli से कैसे अलग है:
>
> व्यक्तियों की सेवा पर केंद्रित है
>
> लचीला और नियंत्रण योग्य समय सीमा
>
> अधिक नियंत्रित आउटपुट परिणाम मोड
>
> वार्षिक रिपोर्ट लिखने वाले डेवलपर्स के लिए बेहतर मानक सामग्री
>
> GPT को खिलाए गए डेटा का पूर्व-पार्स

[Markdown](example/example.md) आउटपुट परिणाम प्रदर्शन

![default_example](example/screenshot.png)

## ⚙️ स्थापना

1. रिपोजिटरी क्लोन करें

```shell
git clone https://github.com/kabeep/yeareport.git
```

2. इंस्टालेशन निर्भरता

```shell
cd yeareport

# NPM
npm install

# या Yarn
yarn
```

3. प्रोग्राम कंपाइल करें

```shell
npm run build
```

4. एनपीएम सॉफ्ट लिंक

```shell
npm link
```

5. परीक्षण

```shell
yeareport -h
```

## 🚀 उपयोग

![Usage](example/usage.png)

```text
yeareport <command> [options]

命令：
  yeareport add     वर्तमान डायरेक्टरी को कतार में जोड़ें
  yeareport remove  वर्तमान कार्य डायरेक्टरी को कतार से हटाएं      [aliases: rm]
  yeareport clear   कतार को साफ करें                              [aliases: clr]
  yeareport print   कतार को मार्कडाउन फ़ाइल के रूप में आउटपुट करें[aliases: ptr]
  yeareport show    कतार में लॉग सूची दिखाएं

选项：
      --author     `auto` पर, git global config से खोजें, डिफॉल्ट सभी लॉग आउटपुट
                   करें                                                 [स्ट्रिंग]
      --since      किसी तारीख से आउटपुट शुरू करें, डिफॉल्ट है `2023-01-01`
                                                                        [स्ट्रिंग]
      --before     किसी तारीख पर आउटपुट खत्म करें, डिफॉल्ट है `2024-01-01`
                                                                        [स्ट्रिंग]
      --output     प्रिंट आउटपुट डायरेक्टरी, वर्तमान कार्य डायरेक्टरी के
                   सापेक्ष, डिफॉल्ट User/Downloads`                     [स्ट्रिंग]
  -o, --overwrite  add ओवरराइट प्राधिकरण, जब वर्तमान कार्य डायरेक्टरी पहले से
                   मौजूद हो तो ओवरराइट करने की क्रिया करें[बूलियन] [डिफ़ॉल्ट मान: false]
  -p, --pretty     प्रिंट सुंदर शीर्षक, इमोजी का इस्तेमाल करके Markdown शीर्षकों
                   को सुंदर बनाएं                         [बूलियन] [डिफ़ॉल्ट मान: false]
  -h, --help       显示帮助信息                                           [बूलियन]
  -v, --version    显示版本号                                             [बूलियन]

示例：
  yeareport add -o                          add कमांड के लिए अधिकार दें जब
                                            वर्तमान कार्य डायरेक्टरी के लॉग पहले
                                            से कतार में हों तो ओवरराइट करें
  yeareport add --author=kabeep             केवल लेखक kabeep के लॉग को कतार में
                                            जोड़ें
  yeareport add --since=2023-01-01          2023-01-01 से 2024-01-01 तक के लॉग
  --before=2024-01-01                       कतार में जोड़ें
  yeareport print -p                        Markdown शीर्षक इस प्रकार आउटपुट
                                            होंगे # {emoji} {commit-type}
```

## 🎯 RoadMap

- सांख्यिकीय विश्लेषण और शब्द विभाजन

- प्रतिशत गणना

- प्रवृत्ति चार्ट

- गैंट चार्ट 

## 🤝 योगदान

पुल रिक्वेस्ट्स या [Issues](https://github.com/kabeep/git-short-dir-prompt/issues) के माध्यम से योगदान का स्वागत है।

# 📄 लाइसेंस

यह परियोजना एमआईटी लाइसेंस के अंतर्गत लाइसेंस प्राप्त है। विवरण के लिए [LICENSE](LICENSE) फ़ाइल देखें।
