// my-next-app/workflows/sendEmailWorkflow.ts
import { CancellationScope } from '@temporalio/workflow';
import sendEmail from '../activities/sendEmail';

export async function sendEmailWorkflow(to: string, subject: string, body: string): Promise<void> {
  await CancellationScope.cancellable(async () => {
    // Your email sending logic
    await sendEmail(to, subject, body);
  });
}
