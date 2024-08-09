// GemniAI constants
const systemInstruction = `Based on the provided user details and optional image, generate a JSON object with up to 5 items for each category. The JSON object should follow this structure:
	{
		"possible_conditions": [
			{ "text": "Condition", "likeliness": 1-100 }  // Likelihood as a percentage
		],
		"possible_causes": [
			{ "text": "Cause", "likeliness": 1-100 }  // Likelihood as a percentage
		],
		"skin_care_routines": [
			{ "text": "Routine" }
		],
		"product_suggestions": [
			{ "text": "Product" }
		],
		"image_analysis": "Description of image analysis",
		"note": "Additional notes or context. (2 lines max)"
	}

	- **possible_conditions**: List potential conditions based on the input.
	- **possible_causes**: List potential causes with their likelihood.
	- **skin_care_routines**: Provide recommended skincare routines.
	- **product_suggestions**: Suggest relevant products.
	- **note**: Any extra information or observations.

If the input is ambiguous or insufficient, leave each array empty. Ensure that the structure and data types of the JSON object conform to the example provided.`;

module.exports = { systemInstruction };
