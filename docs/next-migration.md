# Portfolio — Next.js + microCMS 移行要件定義

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| 目的 | 静的HTML/SCSS/JSポートフォリオをNext.js + microCMSに移行 |
| 性格 | 自己研鑽（TypeScript習熟 / CMSアーキテクチャ理解 / React設計力向上） |
| 言語 | TypeScript（strict mode） |
| デプロイ | Vercel（既存と同じ） |

---

## 2. 技術スタック

| カテゴリ | 採用 | 検討ポイント |
|---|---|---|
| フレームワーク | Next.js | App Router / Pages Router、どちらを選ぶ？なぜ？ |
| 言語 | TypeScript | |
| CMS | microCMS | Works管理のみ or 全コンテンツ？ |
| スタイリング | 未定 | CSS Modules / Tailwind / SCSS + CSS Modules… 何が合う？ |
| アニメーション | 未定 | 既存JSをuseEffectに移植？ Framer Motion？ |

---

## 3. microCMS コンテンツ設計

### Works スキーマ（草案）

| フィールドID | 型 | 説明 |
|---|---|---|
| title | テキスト | 作品タイトル |
| slug | テキスト | URL用ID（例: lp-company） |
| thumbnail | 画像 | 一覧サムネイル |
| category | セレクト | LP / バナー / etc. |
| period | テキスト | 制作時期 |
| scope | テキスト | 制作範囲 |
| hours | テキスト | 制作時間 |
| tools | ? | 使用技術・ツール |
| detail_images | 画像（複数） | 詳細画像 |
| description | リッチテキスト | 説明文 |
| points | ? | こだわりポイント |
| url | テキスト | 公開URL |

> **考えてみて**: `tools` や `points` をどの型にすると管理しやすい？  
> 将来的に作品が増えたとき、どう運用する？

---

## 4. ページ・ルーティング設計

```
/                    → トップ（Hero / Works一覧 / About / Experience / Contact）
/works/[slug]        → 作品詳細
```

> **考えてみて**:
> - `/works/[slug]` は SSG・SSR・ISR のどれが適切？ なぜ？
> - `generateStaticParams` はどこで・何のために使う？
> - microCMSのデータを取得するのは Server Component？ Client Component？

---

## 5. コンポーネント・ディレクトリ設計（案）

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── works/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── WorksPreview.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── WorksCard.tsx
│       └── SectionHeading.tsx
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useMorphing.ts
│   └── useMetaball.ts
├── types/
│   └── works.ts
└── lib/
    └── microcms.ts
```

> **考えてみて**:
> - `'use client'` と `'use server'` はどう使い分ける？
> - アニメーション系のhooksはなぜ Client Component にしか置けない？

---

## 6. アニメーション移植方針

既存JSとReactの対応関係：

| 既存JS | 移植先 | ヒント |
|---|---|---|
| `initScrollAnimation` | `useScrollAnimation` hook | `useEffect` + `useRef` |
| `initMorphing` | `useMorphing` hook | `useEffect` 内でrAFを管理 |
| `initMetaball` | `useMetaball` hook | cleanup関数が必要（なぜ？） |
| `initTimeline` | Timeline component内 | |

> **考えてみて**: `useEffect` のcleanup関数を書かないと何が起きる？  
> 特に `requestAnimationFrame` の場合はどうなる？

---

## 7. TypeScript コーディングルール

### 絶対禁止

| NG | 理由 | 代替 |
|---|---|---|
| `any` | 型チェックを完全に無効化する | `unknown` + 型ガード |
| 安全でない `as`（例: `data as Work`） | 実行時エラーを隠蔽する | Type Predicate（型ガード関数） |

### 習得目標とする TypeScript パターン

#### 1. Type Predicate（型ガード）

```ts
// ❌ NG
const work = data as Work

// ✅ OK
function isWork(value: unknown): value is Work {
  // 自分で実装してみて
}
```

> **考えてみて**: `isWork` の中身はどう実装する？  
> microCMSのレスポンスに対して型ガードが必要なのはどのタイミング？

#### 2. Generics と infer を用いた型の抽出

```ts
// 例：Promiseの解決型を取り出す
type Awaited<T> = T extends Promise<infer U> ? U : T

// microCMSのAPIレスポンスからコンテンツ型を抽出するには？
```

> **考えてみて**: `infer` はどんな場面で使うと便利？ APIクライアントの返り値型をどう汎用化する？

#### 3. Discriminated Unions（タグ付きユニオン）

```ts
// 例：データ取得状態の管理
type FetchState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
```

> **考えてみて**: `switch (state.status)` で全ケースを網羅しないとどうなる？  
> Works一覧の取得状態をこのパターンで管理するとどう書ける？

#### 4. Utility Types と Mapped Types による型のDRY化

```ts
// microCMSのフォームと表示用で型を使い回す例
type Work = { id: string; title: string; slug: string; url: string }

type WorkPreview = Pick<Work, 'id' | 'title' | 'slug'>
type WorkForm    = Omit<Work, 'id'>
type PartialWork = Partial<Work>
```

> **考えてみて**: `WorksCard` コンポーネントのpropsはどのUtility Typeを使って定義できる？  
> Mapped Typesを使うとさらに何ができる？

---

## 8. TypeScript 型設計

### microCMSレスポンス型（最初に設計する）

```ts
// types/works.ts
export type Work = {
  id: string
  title: string
  slug: string
  // ... 自分でスキーマに合わせて設計してみて
}
```

> **考えてみて**:
> - `microcms-js-sdk` を使うと何が便利になる？
> - `NEXT_PUBLIC_` プレフィックスをつける環境変数とそうでないものの違いは？

---

## 9. 環境変数

```
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=
```

---

## 10. マイルストーン

| フェーズ | 内容 |
|---|---|
| Phase 1 | Next.jsプロジェクト作成・ルーティング・ディレクトリ設計 |
| Phase 2 | microCMSスキーマ設計・APIクライアント実装 |
| Phase 3 | 既存HTMLをコンポーネント化（静的・スタイリング含む） |
| Phase 4 | アニメーションhooks移植 |
| Phase 5 | microCMSデータ取得・Works詳細ページ実装 |
| Phase 6 | Vercelデプロイ・環境変数設定・動作確認 |
