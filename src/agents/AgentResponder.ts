import { OpenAI } from 'openai';

export class AgentResponder {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
  }

  async respond(summary: string): Promise<string> {
    console.log('Generating response for summary:', summary);

    const response = await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: summary }],
    });

    // Safely access the response and ensure it's not null or undefined
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Failed to generate a response from the OpenAI API');
    }

    return content;
  }
}

export default AgentResponder;
