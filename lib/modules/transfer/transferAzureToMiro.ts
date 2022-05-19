import { spinner } from '../../utils/spinner';
import { WorkItemType } from '../azure/entities/azure.types';
import { fetchFeature } from '../azure/infra/azureFetch';
import {
  adaptTicketToMiroTicket,
  addCard,
  MIRO_SCALE,
} from '../miro/infra/miroFetch';

export const transferAzureToMiro = async (
  workItemId: number,
  theme: string,
  workItemIndex = 0
) => {
  const DEVOPS_EDIT_URL = `${process.env.ATOM_DEVOPS_SERVER_URL}/${process.env.ATOM_DEVOPS_PROJECT}/_workitems/edit`;
  const MIRO_HEIGHT = 3000;
  const OFFSET = parseInt(process.env.ATM_MIRO_OFFSET ?? '0', 10);

  const spinnerFetch = spinner(`Fetching item #${workItemId}`);

  const [item] = await fetchFeature(workItemId);

  spinnerFetch.succeed(`Successfully item #${workItemId}`);

  if (!item) {
    return;
  }

  const url = `${DEVOPS_EDIT_URL}/${item.WorkItemId}`;

  if (item.WorkItemType === WorkItemType.Feature) {
    const featureCard = adaptTicketToMiroTicket(
      item,
      url,
      -3 * parseInt(process.env.ATM_MIRO_OFFSET ?? '1', 10),
      MIRO_HEIGHT,
      theme
    );

    const spinnerTransfer = spinner(`Creating feature card ${workItemId}`);
    await addCard(featureCard);
    spinnerTransfer.succeed(`Successfully created feature #${workItemId}`);

    for (const childIndex in item.Children) {
      await transferAzureToMiro(
        item.Children[childIndex].WorkItemId,
        theme,
        parseInt(childIndex, 10)
      );
    }
    return;
  }

  const spinnerConvertion = spinner('Converting to Miro Cards');

  const miroCards = [
    adaptTicketToMiroTicket(
      item,
      url,
      0,
      MIRO_HEIGHT + workItemIndex * OFFSET,
      theme
    ),
    ...item.Children.map((card, index) => {
      const url = `${DEVOPS_EDIT_URL}/${item.WorkItemId}`;
      return adaptTicketToMiroTicket(
        card,
        url,
        (index + 1) * OFFSET * MIRO_SCALE,
        MIRO_HEIGHT + workItemIndex * OFFSET,
        theme
      );
    }, MIRO_HEIGHT),
  ];
  spinnerConvertion.succeed(`Conversion finished`);

  const spinnerTransfer = spinner(`Creating ${miroCards.length} cards`);

  const results = await Promise.all(
    miroCards.map((miroCard) => addCard(miroCard))
  );

  spinnerTransfer.succeed(
    `${miroCards.length} card${miroCards.length > 1 ? 's' : ''} created to Miro`
  );

  return results.every((result) => result);
};
