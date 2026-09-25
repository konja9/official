# CLAUDE.md — 作品ポートフォリオサイト

## このサイトの目的
個人で制作したブラウザゲーム・スマホアプリ・PSP実機向け作品をまとめて見られるようにする。
自分用のアーカイブを兼ねつつ、人に見せても恥ずかしくない見た目にする。
**最優先は「新作を追加する手間が最小であること」。**

## 技術スタック
- フレームワーク：Astro（静的サイト生成）
- 言語：TypeScript
- スタイル：素のCSS（CSS変数でテーマ管理）。重いUIライブラリは入れない
- ホスティング：GitHub Pages（GitHub Actionsで main へのpush時に自動デプロイ）
- 外部依存は最小限にする。追加する場合は理由をコミットメッセージに書く

## ディレクトリ構成
```
/
├── CLAUDE.md
├── src/
│   ├── content/
│   │   └── works/          # 作品データ（1作品1ファイル）
│   ├── pages/
│   │   ├── index.astro     # トップ：作品カード一覧
│   │   ├── works/[slug].astro  # 作品詳細ページ
│   │   └── about.astro     # 自己紹介（短く）
│   ├── components/         # WorkCard, Tag, PlayButton など
│   └── styles/
├── public/
│   ├── thumbnails/         # サムネイル画像（作品slugと同名）
│   ├── media/              # GIF・動画
│   └── play/               # ブラウザで遊べるゲーム本体（作品slugごとにフォルダ）
```

## 作品データの形式
`src/content/works/<slug>.md` に以下のfrontmatterで書く。Astroのcontent collectionsでスキーマ検証すること。

```markdown
---
title: typeburst
slug: typeburst
platform: browser        # browser | android | psp
status: wip              # wip（制作中） | released（公開済み） | archived（凍結）
date: 2026-09            # 制作開始 or 公開の年月
summary: 派手な演出と爽快感重視のタイピングゲーム   # 一言説明（40字以内）
tech: [JavaScript, Claude Code]
thumbnail: /thumbnails/typeburst.png
links:
  play: /play/typeburst/        # browserのみ
  store:                        # androidのみ（ストアURL）
  video:                        # 動画・GIFのパス or URL
  repo:                         # 公開リポジトリがあれば
featured: false          # trueならトップで大きく表示
---

## 工夫した点
- 1〜3行で書く

## メモ
- 制作の経緯や振り返り（任意）
```

## 追加ルール（重要）
- **新作の追加は「works/ にmdを1つ + thumbnails/ に画像1枚」だけで完結すること。** ページやコンポーネントの編集が必要な設計にしない
- サムネイルが無い場合はタイトル文字入りのプレースホルダーを自動表示する
- 一覧は date の新しい順。status でフィルタできるようにする

## プラットフォーム別の見せ方
- **browser**：詳細ページに大きな「今すぐ遊ぶ」ボタン。`public/play/<slug>/` に置いたゲームへリンク
- **android**：ストアリンクがあればボタン表示。無ければ動作GIF／スクリーンショットを主役にする
- **psp**：ブラウザでは動かないので、プレイ動画・GIF・スクリーンショットを主役にする。「PSP実機で動作」のバッジを付ける
- 各カードにプラットフォームのアイコン／タグと status バッジを表示する

## デザイン方針
- トップは作品カードのグリッド表示（スマホ1列／タブレット2列／PC3列）
- **スマホで見やすいことを優先**（レスポンシブ、タップしやすいボタンサイズ）
- ライト／ダーク両対応（prefers-color-scheme）
- アクセントとして、はにわモチーフをロゴやファビコンに使う（作品に埴輪モチーフが複数あるため）
- 色数は抑えめ。作品のサムネイルが一番目立つようにする
- ※具体的な配色・フォントは初回実装後に調整する

## 初期に登録する作品（状況は要確認・随時更新）
| slug | タイトル | platform | status |
|---|---|---|---|
| typeburst | typeburst | browser | wip |
| haniwa-merge | はにわマージ（仮） | browser or android | wip |
| haniwa-defense | はにわディフェンス | psp | wip |
| psp-desk-timer | psp desk timer | psp | wip |

## 作業時のお願い（Claude Codeへ）
- 変更前に方針を短く説明してから着手する
- 作品データのスキーマを変更する場合は、既存の全作品ファイルも合わせて更新する
- ビルドが通ること（`npm run build`）を確認してから完了とする
- 迷ったら「作品追加の手間が増えない方」を選ぶ
