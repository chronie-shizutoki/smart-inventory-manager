## 言語
- [日本語](README-ja.md)
- [English](README.md)
- [中文](README-zh.md)

# スマートホームインベントリ管理システム

多言語対応とインテリジェント機能を備えた現代的な家庭用インベントリ管理Webアプリケーションです。

## 🌟 主な機能

### コア機能
- **インベントリ管理**: 家庭用品の追加、編集、削除、閲覧が可能です。
- **カテゴリ管理**: 食品、医薬品、清掃用品、パーソナルケア、家庭用品、電子機器などのカテゴリに対応しています。
- **検索機能**: アイテム名や説明を素早く検索できます。
- **有効期限管理**: アイテムの有効期限を設定・追跡できます。

### インテリジェント機能
- **スマートリマインダー**:
  - 有効期限切れアイテムのリマインダー
  - 有効期限が近いアイテムの警告（3日以内）
  - 在庫切れ間近のリマインダー
- **スマート推奨**:
  - 在庫状況に基づく購入提案
  - 使用頻度分析に基づく推奨

### 多言語対応
- 簡体字中国語
- 英語
- 日本語

### 技術的特徴
- **レスポンシブデザイン**: デスクトップとモバイルデバイスをサポート
- **モダンインターフェース**: Tailwind CSSとFont Awesomeアイコンを使用
- **リアルタイムデータ**: フロントエンドとバックエンドが分離されたアーキテクチャで、リアルタイムデータ同期をサポート
- **データ永続化**: SQLiteデータベースストレージ

## 🛠️ 技術スタック

### フロントエンド
- **Vue.js 3**: プログレッシブJavaScriptフレームワーク
- **Vue I18n**: 国際化サポート
- **Tailwind CSS**: モダンCSSフレームワーク
- **Font Awesome**: アイコンライブラリ
- **ネイティブJavaScript**: コアロジックの実装

### バックエンド
- **Python Flask**: 軽量Webフレームワーク
- **SQLAlchemy**: ORMデータベース操作
- **Flask-CORS**: クロスオリジンリクエストサポート
- **SQLite**: 軽量データベース

## 📁 プロジェクト構造

```
smart-inventory-manager/
├── frontend/                 # フロントエンドソースコード
│   ├── index.html           # メインページ
│   └── app.js              # Vue.jsアプリケーションロジック
├── backend/                 # バックエンドソースコード
│   └── inventory-api/       # Flask APIサービス
│       ├── src/
│       │   ├── main.py     # Flaskアプリケーションエントリーポイント
│       │   ├── models/     # データモデル
│       │   │   ├── user.py
│       │   │   └── inventory.py
│       │   ├── routes/     # APIルート
│       │   │   ├── user.py
│       │   │   └── inventory.py
│       │   └── static/     # 静的ファイル（フロントエンドデプロイメント）
│       ├── venv/           # Python仮想環境
│       └── requirements.txt # Python依存関係
├── README.md               # プロジェクト説明
└── todo.md                # 開発タスクリスト
```

## 🔧 ローカル開発

### 環境要件
- Python 3.11+
- モダンブラウザ（ES6+をサポート）

### インストール手順

1. **プロジェクトのクローン**
```bash
git clone https://github.com/chronie-shizutoki/smart-inventory-manager.git
cd smart-inventory-manager
```

2. **バックエンド環境のセットアップ**
```bash
cd backend/inventory-api
# 仮想環境の作成
python -m venv venv
# 仮想環境の有効化
source venv/bin/activate  # Linux/Mac
# または venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

3. **バックエンドサービスの起動**
```bash
python src/main.py
```

4. **アプリケーションへのアクセス**
- ローカルアクセス: ブラウザを開いて http://localhost:5000 にアクセス
- LANアクセス: 同じネットワーク内の他のデバイスでは、サーバーを実行しているコンピュータのIPアドレスを使用します。例: http://192.168.1.100:5000

  > ヒント: ローカルIPアドレスは以下の方法で確認できます:
  > - Windows: コマンドプロンプトで `ipconfig` と入力し、IPv4アドレスを探します
  > - Linux/Mac: ターミナルで `ifconfig` または `ip addr` と入力し、IPv4アドレスを探します

## 📊 データベース設計

### 主なデータテーブル

#### inventory_items（インベントリアイテムテーブル）
- `id`: プライマリキー
- `name`: アイテム名
- `category`: カテゴリ
- `quantity`: 数量
- `unit`: 単位
- `min_quantity`: 最小在庫
- `expiry_date`: 有効期限
- `description`: 説明
- `created_at`: 作成時間
- `updated_at`: 更新時間

## 🌐 APIインターフェース

### インベントリ管理インターフェース
- `GET /api/inventory/items` - アイテムリストの取得
- `POST /api/inventory/items` - 新規アイテムの作成
- `PUT /api/inventory/items/{id}` - アイテムの更新
- `DELETE /api/inventory/items/{id}` - アイテムの削除
- `GET /api/inventory/stats` - 統計データの取得
- `GET /api/inventory/alerts` - インテリジェントリマインダーの取得
- `GET /api/inventory/recommendations` - インテリジェント推奨の取得

## 🎨 インターフェースプレビュー

### メインページ
1. **インベントリリストページ**: すべてのアイテムを表示し、検索とフィルタリングをサポート
2. **アイテム追加ページ**: インベントリに新しいアイテムを追加
3. **インテリジェント分析ページ**: インテリジェントリマインダーと推奨を表示

### 主な機能
- 多言語切り替え
- レスポンシブレイアウト
- リアルタイムデータ更新
- インテリジェントステータスプロンプト

## 🔮 将来の計画

- [ ] データ可視化チャート
- [ ] 購入リスト生成

## 👥 貢献

IssueやPull Requestを送信して、このプロジェクトを改善することを歓迎します！

## 📄 ライセンス

unknown License

## 🙏 謝辞

- Vue.js
- Flask
- Tailwind CSS