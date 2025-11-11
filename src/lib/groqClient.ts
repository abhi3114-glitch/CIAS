import Groq from 'groq-sdk';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
});

export interface SocraticResponse {
  question: string;
  category: 'clarification' | 'assumption' | 'evidence' | 'perspective' | 'implication';
  reasoning: string;
}

export async function generateSocraticQuestion(userThought: string): Promise<SocraticResponse> {
  try {
    const systemPrompt = `You are a Socratic dialogue assistant designed to enhance human thinking through thoughtful questioning. Your role is to:

1. Ask ONE powerful question that deepens the user's reasoning
2. Challenge assumptions without being confrontational
3. Encourage evidence-based thinking
4. Promote multiple perspectives
5. Guide toward clarity and insight

Analyze the user's thought and respond with a JSON object containing:
- question: A single Socratic question (max 20 words)
- category: One of [clarification, assumption, evidence, perspective, implication]
- reasoning: Brief explanation of why this question matters (max 30 words)

Be concise, specific, and thought-provoking. Avoid generic questions.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `User's thought: "${userThought}"\n\nGenerate a Socratic question in JSON format.` }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 200,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from API');
    }

    const parsed = JSON.parse(response) as SocraticResponse;
    return parsed;
  } catch (error) {
    console.error('Error generating Socratic question:', error);
    return {
      question: 'What evidence supports your reasoning?',
      category: 'evidence',
      reasoning: 'Encouraging critical evaluation of claims'
    };
  }
}

export async function analyzeBiasesWithAI(text: string): Promise<string[]> {
  try {
    const systemPrompt = `You are a cognitive bias detector. Analyze the text for logical fallacies and cognitive biases. Return a JSON array of detected biases, each as a string in format: "Bias Name: Brief explanation (max 15 words)". Maximum 5 biases. If no biases detected, return empty array.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 300,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return [];
    }

    const parsed = JSON.parse(response);
    return parsed.biases || [];
  } catch (error) {
    console.error('Error analyzing biases:', error);
    return [];
  }
}

export async function generateInsightSuggestion(thought: string, framework?: string): Promise<string> {
  try {
    const systemPrompt = framework
      ? `You are a thinking coach. The user is applying the "${framework}" framework. Suggest ONE key insight they should capture based on their reasoning. Be specific and actionable. Max 25 words.`
      : `You are a thinking coach. Suggest ONE key insight the user should capture from their thought process. Be specific and actionable. Max 25 words.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: thought }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.8,
      max_tokens: 100
    });

    return completion.choices[0]?.message?.content || 'Consider what you\'ve learned from this reasoning process.';
  } catch (error) {
    console.error('Error generating insight:', error);
    return 'Reflect on the key takeaway from your analysis.';
  }
}