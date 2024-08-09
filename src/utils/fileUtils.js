// Converts Base64 file data to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(imageFile, mimeType) {
	// Convert image buffer to Base64 string
	const base64Image = imageFile.data.toString('base64');

	return {
		inlineData: { data: base64Image, mimeType },
	};
}

module.exports = { fileToGenerativePart };
