// Converts Base64 file data to a GoogleGenerativeAI.Part object.
const fileToGenerativePart = (imageFile, mimeType) => {
	// Convert image buffer to Base64 string
	const base64Image = imageFile.data.toString('base64');
	return {
		inlineData: { data: base64Image, mimeType },
	};
};

// Generates a user context string based on the user details.
const generateUserContext = (userData) => {
	return `User details and symptom:
		- Description: ${userData.nature || 'Not provided'}
		- Changes: ${userData.changes || 'Not provided'}
		- Appearance: ${userData.appearance || 'Not provided'}
		- Duration: ${userData.duration || 'Not provided'}
		- Age: ${userData.age || 'Not provided'}
		- Gender: ${userData.gender || 'Not provided'}
		- Location: ${userData.location || 'Not provided'}
		- Spread: ${userData.spread || 'Not provided'}
		- Trigger: ${userData.trigger || 'Not provided'}
		- Intensity: ${userData.intensity || 'Not provided'}
		- Recent travels: ${userData.recent_travels || 'Not provided'}
		- Dietary habits: ${userData.dietary_habit || 'Not provided'}
		- Occupational hazards: ${userData.occupational_hazards || 'Not provided'}
		- Sun exposure: ${userData.sun_exposure || 'Not provided'}
		- Medications: ${userData.medications || 'Not provided'}
		- Allergies: ${userData.allergies || 'Not provided'}
 `;
};

// Function to generate chat history including user context
const generateChatHistory = (history, userData) => {
	// Add user context to the chat history
	history.unshift(
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
	let chatHistory = history.map(({ id, ...rest }) => rest);
	return chatHistory;
};

module.exports = { fileToGenerativePart, generateUserContext, generateChatHistory };
