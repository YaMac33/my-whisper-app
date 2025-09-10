# Whisper Transcription App

このプロジェクトは、[OpenAI Whisper](https://github.com/openai/whisper) を利用した音声文字起こしアプリケーションです。

Webページから音声ファイルをアップロードすると、自動的に文字起こしが行われ、結果を表示します。

フロントエンドは **HTML + CSS + JavaScript**、バックエンドは **Flask (Python)** で構成されています。

---

## 📂 ディレクトリ構成

```
my-whisper-app/
├─ index.html                # メイン画面（音声アップロード・文字起こし結果表示）
├─ style.css                 # デザイン・レイアウト
├─ script.js                 # フロントエンドの動作（アップロード、表示、編集、同期処理）
├─ whisper/
│   ├─ process.py            # Whisperを呼び出して音声→テキスト変換
│   └─ requirements.txt      # Whisper実行環境に必要なライブラリ
├─ uploads/                  # アップロードされた音声ファイル置き場
├─ outputs/
│   ├─ src/                  # 編集用srcファイルを保存
│   └─ texts/                # テキストファイルを保存
├─ assets/                   # アイコンや画像素材
├─ README.md                 # プロジェクト概要
└─ .github/
    └─ workflows/ci.yml      # 自動ビルド・デプロイ用GitHub Actions
```

---

## 🚀 セットアップ方法

### 1. 必要環境

- **Python**: 3.9 以上推奨（3.8 以下は動作保証外）
- **pip**: 最新版
- **ハードウェア**
    - CPU環境でも動作可能ですが処理が遅くなります
    - **GPU (CUDA対応 NVIDIA GPU)** があると高速に動作します
    - GPUを利用する場合は、対応する **PyTorch + CUDA** をインストールしてください
- **OS**: macOS / Linux / Windows で動作確認済み

### 2. 仮想環境の作成と有効化

```bash
python -m venv venv
source venv/bin/activate  # macOS / Linux
venv\\\\Scripts\\\\activate     # Windows
```

**3. 必要なライブラリのインストール**

```bash
pip install -r whisper/requirements.txt
```

GPU利用の場合

[PyTorch公式サイト](https://pytorch.org/get-started/locally/)から、お使いの環境に適したCUDA版をインストールしてください。

例: CUDA 11.8 環境

```bash
pip install torch torchvision torchaudio --index-url <https://download.pytorch.org/whl/cu118>
```

**4. Flask サーバーの起動**

```bash
cd whisper
python process.py
```

起動後、[http://127.0.0.1:5000](http://127.0.0.1:5000/) にアクセスできます。

## 🌐 アクセス方法

起動後、ブラウザで以下のURLにアクセスできます。

➡️ [](http://127.0.0.1:5000/)**[http://127.0.0.1:5000](http://127.0.0.1:5000/)** 🌟

---

## 🌐 使い方

### 手順 🛠

- 1️⃣ ブラウザで **index.html** を開きます。
- 2️⃣ 音声ファイル（例: 🎵 .mp3, 🎶 .wav, 🎤 .m4a）を選択してアップロードします。
- 3️⃣ サーバー側で Whisper による文字起こしが自動実行されます。⚡
- 4️⃣ 結果が画面に表示されます。✨

---

## 📦 使用技術

### バックエンド 🖥

- 🐍 Python 3.x
- 🔥 Flask
- 🤖 OpenAI Whisper
- 🧠 Torch (PyTorch)

### フロントエンド 🌐

- 📝 HTML / CSS / JavaScript
- 🔗 Fetch API による非同期通信

---

## ⚙️ 設定

`whisper/process.py` 内で使用するモデルを指定できます。

（例: `"tiny"`, `"base"`, `"small"`, `"medium"`, `"large"`）🎛

---

```python
import whisper
model = whisper.load_model("base")
```

## 📝 注意点

- 🔍 Whisperの「large」モデルは精度が高いですが、処理時間とメモリ消費が大きくなります。
- ⚡ GPUを利用できる環境では自動的にCUDAを使用します。
- ⏳ 長時間の音声は処理に時間がかかる場合があります。
- 📥 モデルファイルは初回利用時に自動でダウンロードされます。

---

## 📜 ライセンス

このプロジェクトは **MIT License** のもと公開されています。📄✨

---

## 🙌 貢献方法

### 貢献ステップ

- 1️⃣ このリポジトリをForkしてください
- 2️⃣ 新しいブランチを作成: `git checkout -b feature/YourFeature`
- 3️⃣ 変更をコミット: `git commit -m 'Add some feature'`
- 4️⃣ プッシュ: `git push origin feature/YourFeature`
- 5️⃣ Pull Requestを作成してください 💪🌟

---

## 💡 今後の拡張予定

- 🌍 日本語以外の多言語対応強化
- 🖥 Web UI の改善（リアルタイム文字起こし表示）
- 🎤 音声録音機能（ブラウザから直接録音 → サーバー送信）
