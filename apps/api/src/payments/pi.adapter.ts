type CreateArgs = { amountPi: number; metadata?: any };
export function getPiAdapter(){
  if ((process.env.PI_ENV || 'mock') === 'mock') return mockAdapter;
  // TODO: real SDK integration here.
  return mockAdapter;
}

const mockAdapter = {
  async createPayment(args: CreateArgs){
    return { id: 'pi_'+Math.random().toString(36).slice(2), status: 'pending_approval', amountPi: args.amountPi, metadata: args.metadata };
  },
  async approvePayment(id: string){ return { id, status: 'held' }; },
  async completePayment(id: string){ return { id, status: 'completed' }; },
  async cancelPayment(id: string){ return { id, status: 'canceled' }; }
};
