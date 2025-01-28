import { OpenAI } from 'langchain';

export class AgentResponder {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async respond(summary: string): Promise<string> {
    console.log('Generating response for summary:', summary);
    const response = await this.openAI.generate({ prompt: summary });
    return response;
  }
}
export default AgentResponder;
