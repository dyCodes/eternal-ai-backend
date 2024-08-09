// Converts Base64 file data to a GoogleGenerativeAI.Part object.
const fileToGenerativePart = (imageFile, mimeType) => {
	// Convert image buffer to Base64 string
	const base64Image = imageFile.data.toString('base64');
	return {
		inlineData: { data: base64Image, mimeType },
	};
};

// Generates a prompt based on the user details and symptom description.
const generatePrompt = (data) => {
	return `
		User details and symptom:
		- Description: ${data.nature || 'Not provided'}
		- Appearance: ${data.appearance || 'Not provided'}
		- Duration: ${data.duration || 'Not provided'}
		- Changes: ${data.changes || 'Not provided'}
		- Age: ${data.age || 'Not provided'}
		- Gender: ${data.gender || 'Not provided'}

		Additional details:
		- Allergies: ${data.allergies || 'Not provided'}
		- Sun exposure: ${data.sun_exposure || 'Not provided'}
		- Dietary habits: ${data.dietary_habit || 'Not provided'}
		- Location: ${data.location || 'Not provided'}
		- Spread: ${data.spread || 'Not provided'}
		- Trigger: ${data.trigger || 'Not provided'}
		- Intensity: ${data.intensity || 'Not provided'}
		- Medications: ${data.medications || 'Not provided'}
	`;
};

module.exports = { fileToGenerativePart, generatePrompt };
