const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { reportSystemInstruction } = require('../constant/geminiAI');
const { fileToGenerativePart, generateUserContext } = require('../utils/geminiAI.utils');
const router = express.Router();

// Initialize the generative model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro',
	generationConfig: { responseMimeType: 'application/json' },
	systemInstruction: reportSystemInstruction,
});

router.post('/', async (req, res) => {
	const data = req.body;
	const imageFile = req.files?.image;

	// Validate request
	if (!data.nature || !data.appearance || !data.duration || !data.age || !data.gender) {
		return res.status(400).json({ error: 'User details and symptom description are required.' });
	}

	try {
		async function run() {
			// Prepare prompt
			const prompt = generateUserContext(data);

			// Prepare image parts if image data is available
			let imageParts = [];
			if (imageFile && data?.mimeType) {
				imageParts = [fileToGenerativePart(imageFile, data.mimeType)];
			}

			// Generate content
			const result = await model.generateContent([prompt, ...imageParts]);
			const response = await result.response.text();
			return response;
		}

		const output = await run();

		// Return response
		res.status(200).json(output);
	} catch (error) {
		console.error('Error: ', error);
		res.status(500).json({ error: 'An error occurred. Please try again.' });
	}
});

module.exports = router;
