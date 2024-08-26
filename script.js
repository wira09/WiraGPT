import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi API key dan model
const API_KEY = "AIzaSyCBDsAXTrgtsDSzdox5gMg2LvqA5jEqRQ4";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    const cleanedResponse = response.replace(/\*\*/g, "");
    $("#response-text").text(cleanedResponse);
    $("#copy-button").show();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

$(document).ready(function () {
  $("#search-button").on("click", async function () {
    const question = $("#search-input").val();

    if (!question) {
      alert("Silakan masukkan pertanyaan Anda.");
      return;
    }

    $("#response-text").text("Memproses pertanyaan Anda...");
    $("#copy-button").hide();

    try {
      const response = await generateContent(question);
      $("#response-text").text(response);
      $("#copy-button").show();
    } catch (error) {
      $("#response-text").text("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  });

  $("#copy-button").on("click", function () {
    const responseText = $("#response-text").text();
    navigator.clipboard.writeText(responseText).then(
      function () {
        alert("Teks telah disalin!");
      },
      function (err) {
        console.error("Gagal menyalin teks: ", err);
      }
    );
  });
});
