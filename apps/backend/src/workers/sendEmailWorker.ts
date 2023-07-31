import { Worker } from '@temporalio/worker';
import * as activities from '../activities/sendEmail';
import path from 'path';


async function startWorker() {
  // create an worker for send an mail
  const worker = await Worker.create({
    workflowsPath: path.parse('../workflows/sendEmailWorkflow').root,
    activities,
    taskQueue: "task-queue"
  });

  await worker.run(); 
}

startWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});
