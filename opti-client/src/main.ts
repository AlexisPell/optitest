import * as readline from 'readline';

import { OUTPUT_MSGS } from './constants';
import { getSubStringBySpaceId } from './libs/utils';
import { ResponseHandlers } from './responseHandlers';

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const responseHandlers = new ResponseHandlers(rl);

  rl.write(OUTPUT_MSGS.WELCOME + OUTPUT_MSGS.INSTRUCTIONS);

  rl.on('line', async (answer: string) => {
    if (answer === 'cars') responseHandlers.handleGetCars();
    if (answer.startsWith('create'))
      responseHandlers.handleCreateCar(getSubStringBySpaceId(answer, 1));
    if (answer.startsWith('delete'))
      responseHandlers.handleDeleteCarById(getSubStringBySpaceId(answer, 1));
  });
};
main();
