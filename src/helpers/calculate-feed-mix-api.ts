import axios from 'axios';

export type OpType = 'min' | 'max';

// TODO add more options to optimize
// TODO add more options ( actual lp solver options )
export function calculateFeedMix(
  constraints: any,
  variables: any,
  params: { optimize: string; opType: OpType; options: { tolerance: number } },
): Promise<any> {
  const { optimize, opType, options } = params;
  return axios.post('http://localhost:3000/api/calculate-feed-mix', {
    optimize,
    opType,
    constraints,
    variables,
    options,
  });
}
