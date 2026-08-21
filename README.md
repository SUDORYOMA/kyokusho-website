# 株式会社旭昇 コーポレートサイト

Claude Design のハンドオフ（`旭昇のトップページ設計`）を実装した静的サイトです。GitHub Pages で公開しています。

## 構成

```
index.html      トップページ
recruit.html    採用情報ページ
css/style.css   スタイル
js/main.js      スクロールアニメーション・モバイルメニュー・お問い合わせフォーム送信
assets/logo.png ロゴ
images/hero.jpg トップページのヒーロー写真
```

## 写真プレースホルダーについて

以下の箇所はまだ実写真が用意されていないため、ストライプ柄のプレースホルダー表示のままになっています。撮影・用意ができ次第、該当箇所の背景画像を差し替えてください。

- トップページ: 事業内容（足場工事・鍛冶工事）、チーム集合写真、採用導線セクション
- 採用ページ: ヒーロー写真

## お問い合わせフォームの設定（重要）

お問い合わせフォームは [Formspree](https://formspree.io/) 経由でメール送信する想定です。公開前に以下の設定が必要です。

1. Formspree で無料アカウントを作成し、フォームを1つ作成する。
2. 発行された Form ID（`https://formspree.io/f/XXXXXXX` の `XXXXXXX` 部分）を控える。
3. `index.html` 内の `data-contact-form` を持つ `<form>` タグの `action` を、以下のように書き換える。

```html
<form class="contact-form" data-contact-form action="https://formspree.io/f/実際のフォームID" method="POST">
```

設定するまでは、フォームを送信してもエラーメッセージが表示されます（実際にはどこにも送信されません）。

## ローカルでの確認

```bash
python3 -m http.server 8000
```

`http://localhost:8000` を開いて確認できます。

## デプロイ

`main` ブランチへの push で GitHub Pages に反映されます（`Settings > Pages` で `main` ブランチ / ルートを公開元に設定）。
