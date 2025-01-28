import { AgentRetriever } from '../agents/AgentRetriever';
import { AgentSummarizer } from '../agents/AgentSummarizer';
import { AgentResponder } from '../agents/AgentResponder';

export class Supervisor {
  private retriever: AgentRetriever;
  private summarizer: AgentSummarizer;
  private responder: AgentResponder;

  constructor() {
    this.retriever = new AgentRetriever();
    this.summarizer = new AgentSummarizer();
    this.responder = new AgentResponder();
  }

  async handleQuery(query: string): Promise<string> {
    console.log('Received query:', query);
    // Step 1: Retrieve relevant documents
    const documents = await this.retriever.retrieve(query);
    console.log('Retrieved documents:', documents);

    // Step 2: Summarize the retrieved documents
    const summary = await this.summarizer.summarize(documents);
    console.log('Generated summary:', summary);

    // Step 3: Generate a response based on the summary
    const response = await this.responder.respond(summary);
    console.log('Final response:', response);

    return response;
  }
}
export default Supervisor;
