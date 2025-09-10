"""
process.py

このファイルは、音声ファイルをWhisperモデルで文字起こしする処理を担当します。
コマンドライン引数から音声ファイルを指定し、結果を標準出力やファイルに保存します。
"""

import argparse
import os
import sys
import whisper


def transcribe_audio(audio_path: str, model_name: str = "base", output_path: str = None):
    """
    音声ファイルを文字起こしする関数

    Parameters:
        audio_path (str): 入力音声ファイルのパス
        model_name (str): 使用するWhisperモデル名（default: "base"）
        output_path (str): 出力ファイルのパス（指定がなければ標準出力）
    """
    # モデルをロード
    model = whisper.load_model(model_name)

    # 音声ファイルを文字起こし
    print(f"[INFO] Transcribing {audio_path} with model '{model_name}'...")
    result = model.transcribe(audio_path, fp16=False)

    text = result["text"]

    if output_path:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"[INFO] Transcription saved to {output_path}")
    else:
        print("[TRANSCRIPTION RESULT]")
        print(text)

    return text


def main():
    """
    コマンドライン引数から音声ファイルを受け取り、文字起こしを実行
    """
    parser = argparse.ArgumentParser(description="Whisper transcription script")
    parser.add_argument("audio", type=str, help="Path to audio file")
    parser.add_argument("--model", type=str, default="base", help="Whisper model to use (tiny, base, small, medium, large)")
    parser.add_argument("--output", type=str, help="Path to save transcription result")

    args = parser.parse_args()

    if not os.path.exists(args.audio):
        print(f"[ERROR] File not found: {args.audio}")
        sys.exit(1)

    transcribe_audio(args.audio, args.model, args.output)


if __name__ == "__main__":
    main()
    