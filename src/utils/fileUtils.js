// Converts Base64 file data to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(base64File, mimeType) {
	// Remove the data URI scheme if present
	const base64Data = base64File.replace(/^data:[a-zA-Z]*\/[a-zA-Z]*;base64,/, '');

	return {
		inlineData: { data: base64Data, mimeType },
	};
}

module.exports = { fileToGenerativePart };
