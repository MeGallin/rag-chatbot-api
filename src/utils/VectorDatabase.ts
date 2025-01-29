import {
  Pinecone,
  type PineconeConfiguration,
} from '@pinecone-database/pinecone';

import { OpenAI } from 'openai';

export class VectorDatabase {
  private client: Pinecone;
  private openAI: OpenAI;

  constructor() {
    const config: PineconeConfiguration = {
      apiKey: process.env.PINECONE_API_KEY || '',
    };
    this.client = new Pinecone(config);
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
  }

  async search(query: string): Promise<string[]> {
    // Generate embedding vector for the query using OpenAI
    const embeddingResponse = await this.openAI.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    });

    const embeddingVector = embeddingResponse.data[0].embedding;

    const index = this.client.Index('ragchatbot'); // Replace with your index name
    const response = await index.query({
      vector: embeddingVector,
      topK: 5,
      includeMetadata: true,
    });

    // Safely handle matches and metadata
    return response.matches
      .filter((match) => typeof match.metadata?.text === 'string') // Ensure metadata.text is a string
      .map((match) => match.metadata?.text as string); // Safely cast to string
  }
}

export default VectorDatabase;
