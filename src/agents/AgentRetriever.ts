import { VectorDatabase } from '../utils/VectorDatabase';

export class AgentRetriever {
  private vectorDB: VectorDatabase;

  constructor() {
    this.vectorDB = new VectorDatabase();
  }

  async retrieve(query: string): Promise<string[]> {
    console.log('Retrieving documents for query:', query);
    const results = await this.vectorDB.search(query);
    return results;
  }
}
export default AgentRetriever;
