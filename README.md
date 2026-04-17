# 成勢アフリカンフーズ 公式サイト（1ページLP）

日本人向けのコーポレートサイト。投資家・取引先／インターン・採用／メディア向けの3用途を1ページに集約。

## ファイル構成
- `index.html` — 本体
- `style.css` — スタイル
- `README.md` — このファイル

## ローカルで確認
```bash
# Windows (PowerShell)
start projects/homepage/index.html

# または Python で簡易サーバー起動
cd projects/homepage && python -m http.server 8000
# → http://localhost:8000
```

## GitHub Pagesで公開する手順
1. このリポジトリを GitHub にプッシュ
2. GitHub の Settings → Pages → Source を `main` ブランチ / `/projects/homepage` フォルダに設定
3. 独自ドメイン（例: `naruse-africanfoods.com`）を設定する場合は `CNAME` ファイルを追加

## 今後の拡張候補
- [ ] 店舗写真・料理写真の差し込み（`assets/` フォルダ追加）
- [ ] お問い合わせをGoogleフォーム or Formspreeに差し替え
- [ ] 英語版（`en/index.html`）の追加
- [ ] ニュース・プレスリリースのセクション追加
- [ ] Google Analytics / GA4 タグの設置

## 編集時の注意
- **機密情報は記載しない**（売上・原価率・顧客名・契約先など）
- メールアドレス（`info@`, `careers@`, `press@`）は仮置き。実在のものに差し替えること
- Phase 1-4 の年次は現行計画ベース。変更時は CLAUDE.md の方針と整合を取る
