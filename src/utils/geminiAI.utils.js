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
		> User details and symptom:
		- Description: ${data.nature || 'Not provided'}
		- Appearance: ${data.appearance || 'Not provided'}
		- Duration: ${data.duration || 'Not provided'}
		- Changes: ${data.changes || 'Not provided'}
		- Age: ${data.age || 'Not provided'}
		- Gender: ${data.gender || 'Not provided'}
		> Additional details:
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

// Generates a user context string based on the user details.
const generateUserContext = (userData) => {
	return `User Details:
		- Nature of symptoms: ${userData.nature || 'Not provided'}
		- Appearance: ${userData.appearance || 'Not provided'}
		- Duration: ${userData.duration || 'Not provided'}
		- Changes: ${userData.changes || 'Not provided'}
		- Age: ${userData.age || 'Not provided'}
		- Gender: ${userData.gender || 'Not provided'}
		- Allergies: ${userData.allergies || 'Not provided'}
		- Sun exposure: ${userData.sun_exposure || 'Not provided'}
		- Dietary habits: ${userData.dietary_habit || 'Not provided'}
		- Location: ${userData.location || 'Not provided'}
		- Spread: ${userData.spread || 'Not provided'}
		- Trigger: ${userData.trigger || 'Not provided'}
		- Intensity: ${userData.intensity || 'Not provided'}
		- Medications: ${userData.medications || 'Not provided'}
		- Date: ${userData.date || 'Not provided'}`;
};

// Function to generate chat history including user context
const generateChatHistory = (history, userData) => {
	// Add user context to the chat history
	let chatHistory = history.unshift(
		{
			role: 'user',
			parts: [{ text: 'User Context: ' + generateUserContext(userData) }],
		},
		{
			role: 'model',
			parts: [{ text: 'Understood.' }],
		}
	);

	// Remove `id` from each history item
	chatHistory = chatHistory.map((item) => {
		const { id, ...rest } = item;
		return rest;
	});
	return chatHistory;
};

module.exports = { fileToGenerativePart, generatePrompt, generateUserContext, generateChatHistory };
