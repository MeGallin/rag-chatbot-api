export class AgentSummarizer {
  async summarize(documents: string[]): Promise<string> {
    console.log('Summarizing documents:', documents);
    return documents.join(' ').slice(0, 500); // Simple summarization (first 500 characters)
  }
}

export default AgentSummarizer;
