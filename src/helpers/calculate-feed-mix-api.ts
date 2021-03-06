import axios from 'axios';
import { ElLoading } from 'element-plus';

export type OpType = 'min' | 'max';

// TODO add more options to optimize - but this will be some fancy stuff
// TODO add more options ( actual lp solver options )
export function calculateFeedMix(
  constraints: any,
  variables: any,
  params: { optimize: string; opType: OpType; options: { tolerance: number } },
): Promise<any> {
  const { optimize, opType, options } = params;
  const lpProblemParams = {
    optimize,
    opType,
    constraints,
    variables,
    options,
  };
  console.info('lp problem params:', lpProblemParams);
  const loadingInstance = ElLoading.service({ fullscreen: true, lock: true });
  return (
    axios
      // TODO this should not point to the localhost
      .post('http://localhost:3000/api/calculate-feed-mix', lpProblemParams)
      // TODO add error handling here
      .then(({ data }) => data)
      .finally(() => loadingInstance.close())
  );
}
