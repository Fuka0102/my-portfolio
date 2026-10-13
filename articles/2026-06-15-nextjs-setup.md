# Next.js + microCMS移行 #1｜プロジェクト作成でハマった話

ポートフォリオサイトをNext.js + microCMSへ移行するプロジェクト、まず最初のステップとして「Next.jsプロジェクトの作成」を行いました。一見シンプルな作業ですが、思った以上にハマりどころが多かったので記録しておきます。

## やったこと

1. 既存の静的サイト（`portfolio/`）と並行運用するため、`next-app/`配下にNext.jsプロジェクトを新規作成
2. `next.config.ts`の設定調整
3. `src/`構成への移行（`app/` → `src/app/`）と`tsconfig.json`のパスエイリアス調整

## 詰まったポイント

### 1. ネストしたgitリポジトリにならない？

`create-next-app`はデフォルトで`git init`を実行します。すでにgitリポジトリの中（`portfolio/`）に新しいプロジェクトを作ると、ネストした`.git`ができてしまうのでは、と懸念しましたが、実際には`.git`は作られず問題ありませんでした。

### 2. devサーバー起動時の「ワークスペースルート」警告

`portfolio/`直下と`next-app/`の両方に`package-lock.json`が存在していたため、Turbopackがプロジェクトルートを誤検出して警告が出ました。`next.config.ts`に`turbopack.root`を設定してルートを明示することで解消を試みました。

### 3. `next.config.ts`での`__dirname`問題（最大の難所）

ルートパスを動的に指定するために`__dirname`を使おうとしたところ、書き方を変えるたびに別のエラーが出る、という沼にはまりました。

| 試行 | 書き方 | 結果 |
|---|---|---|
| 1 | `import path from 'path'` + `export default` + `__dirname` | `__dirname is not defined` |
| 2 | `require('path')` + `export default` | ブラウザで`React Client Manifest`エラー |
| 3 | `fileURLToPath(import.meta.url)`で`__dirname`相当を自作 | `exports is not defined` |
| 最終 | 試行1とほぼ同じ構成（`path.resolve(__dirname)`） | 動作OK |

**学び**：`next.config.ts`はESM/CJSの扱いがNode.jsのバージョンやNext.js側の設定読み込み方法によって変わり、エラーメッセージだけでは原因の特定が難しい。

途中、ブラウザに出た`Could not find the module ... in the React Client Manifest`というエラーが、Turbopackの既知バグ（GitHub issue #85883）ではないかと疑いましたが、issueの再現条件（Payload CMS + iframe + 二重HMRリスナー）が今回のケースと一致せず、別原因と判断しました。

**最終的な真因**：構文自体ではなく、`turbopack.root`が誤った状態でビルドされた`.next`キャッシュの破損だった可能性が高いです。`.next`を削除して再起動したことでエラーは解消しました。エラーメッセージ中のパスが`[project]/next-app/node_modules/...`から`[project]/node_modules/...`に変化していたのが、ルート認識のズレを示す手がかりになりました。

> 設定変更を試行錯誤しているときにエラーが解決しない場合は、`.next`キャッシュの削除も試してみると良さそうです。

### 4. `src/`構成への移行

設計ドキュメントの構成案に合わせて`src/`構成を採用しました。理由は、設定ファイル群とアプリコードを分離できること、ツールの対象範囲を絞りやすいことです。

`app/`を`src/app/`へ移動し、`tsconfig.json`の`paths`を以下のように変更しました。

```diff
- "@/*": ["./*"]
+ "@/*": ["./src/*"]
```

ここで最初`"@/*": ["./src/**/*"]`と書いてしまいましたが、TypeScriptの`paths`は1つのパターンにつき`*`を1つまでしか使えないというルールに気づき、修正しました。

## まとめ

- エラーメッセージが似ていても、原因は別物の可能性がある（GitHub issueの再現条件まで確認することが大事）
- `next.config.ts`のESM/CJS問題は、Next.js 16 + Node 22系特有の罠として汎用性が高そう
- 設定変更後に原因不明のエラーが出たら、`.next`キャッシュの削除を試す
