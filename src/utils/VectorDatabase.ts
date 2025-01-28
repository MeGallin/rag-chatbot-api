import { PineconeClient } from '@pinecone-database/pinecone';

export class VectorDatabase {
  private client: PineconeClient;

  constructor() {
    this.client = new PineconeClient();
    this.client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
  }

  async search(query: string): Promise<string[]> {
    const index = this.client.Index('your-index-name');
    const response = await index.query({
      query: query,
      topK: 5,
      includeMetadata: true,
    });
    return response.matches.map((match: { metadata: { text: any; }; }) => match.metadata.text);
  }
}
export default VectorDatabase;
