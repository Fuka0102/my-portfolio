# Portfolio 実装 TODO

## デザイン仕様（確定）

| 項目 | 内容 |
|---|---|
| フォント① | Bricolage Grotesque（見出し・英字アクセント） |
| フォント② | Noto Sans JP（日本語本文） |
| フォント③ | DM Sans（SKILLS・TOOLSのツール名） |
| カラー | 水色・黄緑・オレンジ・パープル＋白・薄グレー背景 |
| 水色丸 | Hero背景に浮遊（TANAKA横のみ固定） |
| 見出し装飾 | セクションごとに色違いの丸が見出し後ろに重なる |

---

## ファイル構成

```
portfolio/
├── index.html
├── works.html
├── scss/
│   ├── styles.scss            ← 共通 @use まとめ
│   ├── _variables.scss        ← 色・フォント・ブレイクポイント
│   ├── _base.scss             ← リセット・共通
│   ├── _header.scss           ← 共通ヘッダー
│   ├── top/
│   │   ├── _hero.scss
│   │   ├── _works-preview.scss
│   │   ├── _about.scss
│   │   ├── _experience.scss
│   │   └── _contact.scss
│   ├── top.scss               ← top用まとめ
│   └── works.scss             ← Worksページ用
├── js/
│   ├── main.js                ← 共通初期化・ヘッダー制御
│   ├── bubbles.js             ← 水色丸アニメーション
│   ├── morphing.js            ← SVGモーフィング（About 01〜03）
│   └── timeline.js            ← タイムライン・点滅丸
└── css/
    ├── top.css                ← SCSSコンパイル後
    └── works.css
```

---

## TODO一覧

### Phase 1｜環境・共通

- [ ] `_variables.scss`
  - カラー変数定義（水色・黄緑・オレンジ・パープル・白・薄グレー）
  - ブレイクポイント変数（SP: 〜767px / PC: 768px〜）
  - フォント変数（Bricolage Grotesque / Noto Sans JP / DM Sans）
- [ ] `_base.scss`：リセット・`box-sizing`・`img`・`a` など共通スタイル
- [ ] Google Fonts の読み込み（Bricolage Grotesque / Noto Sans JP / DM Sans）
- [ ] `index.html` / `works.html` の骨格HTML作成

### Phase 2｜ヘッダー（`_header.scss` / `main.js`）

- [ ] **PC**：横並びナビ（My Works / About Me / My Experiences）＋右端に Contact ボタン（黒・角丸）、常時固定表示
- [ ] **SP**：ロゴ左・メールアイコン右のみ
  - **TOP（Hero内）**：常時表示
  - **Hero以降**：スクロールが止まったタイミングで表示（`main.js` でスクロール停止検知）
- [ ] ロゴ：TANAKA FUKA（T に水色丸アイコン）

### Phase 3｜Hero セクション（`_hero.scss` / `bubbles.js`）

- [ ] 中央レイアウト：TANAKA FUKA（Bricolage Grotesque・極太）/ Portfolio / web designer / developer
- [ ] scroll 誘導テキスト＋縦線（中央下部）
- [ ] 背景の水色丸アニメーション（`bubbles.js`）
  - 大・中・小の丸を複数生成、ランダムにゆっくり浮遊
  - 画面端にかかるよう配置（左上・右上・右下など）
  - TANAKA の T 横の小丸のみ **固定・アニメーションなし**
- [ ] SP対応：フォントサイズ・丸サイズ調整

### Phase 4｜My Works プレビューセクション（`_works-preview.scss`）

- [ ] 背景：薄グレー
- [ ] 見出し「My Works」：黄緑の丸が後ろに重なる装飾
- [ ] カードグリッド：PC 2列 / SP 1列
  - 種別タグ（LP / バナー など）
  - サムネイル画像
  - 作品タイトル（日本語）
  - 短い説明テキスト
  - 使用技術タグ
- [ ] カードクリックで `works.html` の該当アンカーへ遷移

### Phase 5｜About Me セクション（`_about.scss` / `morphing.js`）

- [ ] 背景：白
- [ ] 見出し「About Me」：オレンジの丸が後ろに重なる装飾
- [ ] 氏名・プロフィールテキスト（Noto Sans JP）
- [ ] 01〜03 の3カラムカード（PC）/ 1カラム（SP）
  - **SVGモーフィングアニメーション**（`morphing.js`）
    - 各カードのアクセントSVG図形が異なる形状間でゆっくりループ変形
    - CSS `d` プロパティ使用
    - `animation-duration: 4〜6s`・`ease-in-out`・`infinite alternate`
- [ ] SKILLS・TOOLS リスト
  - アイコン＋ツール名（DM Sans）の横並び
  - HTML / CSS / Javascript / TypeScript / WordPress / Git / Claude / Figma / Photoshop / Canva / Wix

### Phase 6｜My Experiences セクション（`_experience.scss` / `timeline.js`）

- [ ] 背景：薄グレー
- [ ] 見出し「My Experiences」：水色の丸が後ろに重なる装飾
- [ ] タイムライン縦組みレイアウト
  - 左：年月ラベル（Bricolage Grotesque）＋ **点滅する丸**（`timeline.js`）
    - `@keyframes` で `opacity` をゆっくり pulse（`2〜3s`・`ease-in-out`・`infinite`）
  - 右：経歴カード（薄グレー背景・角丸）＋ タイトル＋本文（Noto Sans JP）
- [ ] SP対応：年月・丸を上部、カードを下部に縦積み

### Phase 7｜Contact セクション（`_contact.scss`）

- [ ] 背景：白
- [ ] 見出し「Contact」：パープルの丸が後ろに重なる装飾
- [ ] 「Contact Here」ボタン（黒・角丸・メールアイコン付き）
- [ ] フッター：`© 2026 TANAKA FUKA`

### Phase 8｜Works ページ（`works.html` / `works.scss`）

- [ ] 共通ヘッダー流用
- [ ] ページ上部：「My Works」見出し＋作品タイトル（Bricolage Grotesque・大）
- [ ] 作品詳細情報
  - PC：横4列（制作時期 / 制作範囲 / 制作時間 / 技術・ツール）
  - SP：縦積み
- [ ] 制作画像エリア（角丸カード内）
- [ ] 「Go to Page」ボタン（黒・角丸・外部リンクアイコン）
- [ ] 説明テキスト＋アクセントカラーのリンクテキスト
- [ ] 「こだわりポイント」エリア（薄グレー背景・チェックリスト）
- [ ] 同ページ内スクロールで複数作品対応（アンカーリンク）
- [ ] フッター：`© 2026 TANAKA FUKA`

### Phase 9｜レスポンシブ・仕上げ

- [ ] 全セクション SP / PC 通し確認・微調整
- [ ] `prefers-reduced-motion` 対応（アニメーション無効化）
- [ ] `will-change` で描画最適化（bubbles・morphing・timeline）
- [ ] 画像 `alt` テキスト・アクセシビリティ確認
- [ ] 全ページ最終表示確認

---

## 基本コーディングルール

### SCSS設計
- 入れ子にする際は`&__`のように省略しない
- 入れ子は１階層まで
- htmlタグに直接styleを付与するのはNG 必ずクラスをつける

### Javasceript設計
- JSで使用するDOMには必ず`.js-hoge`のように`js-`の接頭辞をつける

## React / Next.js 移行を見据えた実装方針

将来的な移行に備え、以下の方針で実装すること。

### HTML構造
- セクションごとに自己完結した構造にする（グローバル状態に依存しない）
- `id` / `class` 命名をコンポーネント名と対応させやすくする（例：`.hero`・`.about`）

### SCSS命名
- BEM寄りの命名を心がける（`.hero__title` など）
- グローバルなクラス名の衝突を避ける
- margin-bottomの使用を避ける

### JavaScript設計
- アニメーション処理は副作用（side effect）として設計し、React移行時に `useEffect` 内へ移植しやすくする
- `document.querySelector` に頼らず、対象要素を引数で受け取る関数設計にする

```js
// ❌ 移行しにくい
function initBubbles() {
  const container = document.querySelector('#hero')
}

// ✅ 移行しやすい
function initBubbles(container) {
  // containerを引数で受け取る
}
```

- グローバル変数を避け、関数スコープ内に閉じた設計にする

### 画像・アセット
- 画像は `/images/` にまとめる（Next.js の `public/` 構成と対応）
- ファイル名はケバブケース統一（例：`lp-site.jpg`）

### フォント
- 今回は `<link>` タグで読み込みでOK
- Next.js 移行時は `next/font` に置き換える（移行時に対応）
