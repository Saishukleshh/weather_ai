const express = require('express');
const router = express.Router();

const responses = {
  'weather': 'Check the weather dashboard for current conditions and forecasts.',
  'crop': 'Visit the crop recommender for suggestions based on your location and soil type.',
  'soil': 'Soil analysis shows moisture levels and nutrient content for optimal farming.',
  'irrigation': 'Water your crops early morning or evening to reduce evaporation.',
  'fertilizer': 'Use organic fertilizers for better soil health and sustainable farming.',
  'pest': 'Monitor crops regularly and use integrated pest management techniques.',
  'harvest': 'Harvest timing depends on crop maturity and weather conditions.',
  'price': 'Check market prices in the dashboard for current crop rates.',
  'help': 'I can help with weather, crops, soil, irrigation, fertilizer, pest control, harvest, and prices.'
};
router.post('/chat', (req, res) => {
  const { message, image } = req.body;

  // Simulated AI Image Analysis
  if (image) {
    // In a real app, we would send 'image' (base64) to OpenAI Vision or Gemini API here.
    // For the hackathon demo, we return a simulated successful analysis.

    const analysisResponses = [
      "I've analyzed the image. It appears to be a healthy **Rice Crop** at the vegetative stage. No signs of pests detected.",
      "The image shows signs of **Nitrogen Deficiency** (yellowing leaves). specific recommendations: Apply urea-based fertilizer.",
      "I detected **Leaf Spot Disease** in this image. You should consider using a fungicide like Mancozeb.",
      "Great shot! This soil looks like **Clay Loam**, which strikes a good balance between moisture retention and drainage."
    ];

    // Pick a deterministic response based on message length to simulate variety, or random
    const randomResponse = analysisResponses[Math.floor(Math.random() * analysisResponses.length)];

    return res.json({
      message: `🔍 **Image Analysis Complete:**\n\n${randomResponse}`,
      timestamp: new Date().toISOString()
    });
  }

  const lowerMessage = message ? message.toLowerCase() : "";

  let response = "I'm here to help with farming questions. Try asking about weather, crops, soil, or type 'help' for more options.";

  // Find matching response
  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      response = value;
      break;
    }
  }

  res.json({
    message: response,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;