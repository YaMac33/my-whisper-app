// script.js
// このファイルでは、音声録音とWhisper APIを使った文字起こし処理を行います。

// 録音制御用の変数
let mediaRecorder;
let audioChunks = [];

// 録音開始ボタンを押したときの処理
document.getElementById("startBtn").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.start();
    document.getElementById("status").textContent = "録音中...";
  } catch (error) {
    console.error("マイクの使用に失敗しました:", error);
    alert("マイクの使用を許可してください。");
  }
});

// 録音停止ボタンを押したときの処理
document.getElementById("stopBtn").addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    document.getElementById("status").textContent = "録音停止";
  }
});

// 録音が停止されたときの処理
if (mediaRecorder) {
  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    formData.append("model", "whisper-1");

    document.getElementById("status").textContent = "文字起こし中...";

    try {
      // OpenAI APIキーを環境変数または設定ファイルから取得して利用してください
      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer YOUR_API_KEY_HERE`,
        },
        body: formData,
      });

      const data = await response.json();
      document.getElementById("result").textContent = data.text || "文字起こしに失敗しました";
      document.getElementById("status").textContent = "完了";
    } catch (error) {
      console.error("文字起こしエラー:", error);
      document.getElementById("status").textContent = "エラーが発生しました";
    }
  };
}
