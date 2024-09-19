const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { chatSystemInstruction } = require('../constant/geminiAI');
const { generateChatHistory } = require('../utils/geminiAI.utils');
const router = express.Router();

// Initialize the generative model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
	systemInstruction: chatSystemInstruction,
});

router.post('/', async (req, res) => {
	const data = req.body;

	// Validate request
	if (!data.message) {
		return res.status(400).json({ error: 'Message is required.' });
	}

	try {
		async function run() {
			const message = data.message;
			const chatHistory = generateChatHistory(data.history, data.userData);

			const chat = model.startChat({
				history: chatHistory,
				generationConfig: { maxOutputTokens: 500 },
			});

			const result = await chat.sendMessage(message);
			const response = await result.response.text();
			return response;
		}

		const output = await run();

		// Return response
		res.status(200).json({ result: output });
	} catch (error) {
		console.error('Error: ', error.message || error);
		res.status(500).json({ error: 'An error occurred. Please try again.' });
	}
});

module.exports = router;
