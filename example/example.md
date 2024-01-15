# 📁 electron (35)

## 📅 2024-01 (35)

### 🌟 Refactor (4)

- 2024-01-15 refactor: fix deprecated base::Base64Encode() API calls (#40962)

- 2024-01-12 refactor: use base::NoDestructor instead of base::LazyInstance (#40947)

- 2024-01-10 refactor: migrate deprecated LazyInstance code to NoDestructor (#40927)

- 2024-01-04 refactor: make NativeWindow getter methods const (#40804)

### 🔨 Build (5)

- 2024-01-12 build: log got error response bodies (#40965)

- 2024-01-12 build: fix windows remote exec of python actions (#40958)

- 2024-01-11 build: remove CI cache of git cache (#40953)

- 2024-01-10 build: use container runner for arm tests (#40875)

- 2024-01-10 build: add infra for reclient support (#40850)

### 📄 Docs (3)

- 2024-01-12 docs: add reclient docs, remove goma docs (#40948)

- 2024-01-07 docs: add missing vibrancy breaking change (#40893)

- 2024-01-04 docs: note accelerator case insensitivity (#40783)

### ⌛ Ci (3)

- 2024-01-11 ci: revert CI git cache removal (#40964)

- 2024-01-11 ci: increase "gclient sync" output timeout (#40963)

- 2024-01-10 ci: fix missing inputs for release project board automation (#40726)

### 🐞 Fix (8)

- 2024-01-11 fix: InAppPurchase pre-emptive deallocation (#40938)

- 2024-01-09 fix: crash using `powerMonitor` before ready event (#40888)

- 2024-01-07 fix: wide string concatenation (#40892)

- 2024-01-05 fix: macOS maximize button shouldn't be disabled just because the window is non-fullscreenable (#40705)

- 2024-01-04 fix: BrowserView and <webview> should be transparent by default (#40866)

- 2024-01-04 fix: ignore all NODE_ envs from foreign parent in node process (#40770)

- 2024-01-02 fix: make grant_file_protocol_extra_privileges fuse also block CORS fetches (#40801)

- 2024-01-02 fix: titlebar incorrectly displayed on frameless windows (#40749)

### 🧹 Chore (8)

- 2024-01-11 chore: bump chromium to 122.0.6236.2 (main) (#40871)

- 2024-01-10 chore: migrate base::StringPiece to std::string_view (#40915)

- 2024-01-10 chore: replace absl::optional<T> with std::optional<T> (#40928)

- 2024-01-11 chore: fix content tracing flake (#40939)

- 2024-01-05 chore: do not inject DXVA_Decoding trace category (#40891)

- 2024-01-04 chore: add disclaimer to release timeline (#40717)

- 2024-01-03 chore: drop ada ICU requirement for parsing hostnames (#40860)

- 2024-01-03 chore: bump chromium to 122.0.6194.0 (main) (#40750)

### 🚀 Perf (2)

- 2024-01-08 perf: use fixed-size arrays for the font cache (#40898)

- 2024-01-05 perf: use flat_set, flat_map for small, trivially-moved containers (#40817)

### 💡 Feat (2)

- 2024-01-04 feat: add `transparent` webpreference to webview (#40301)

- 2024-01-04 feat: add net module to utility process (#40017)

