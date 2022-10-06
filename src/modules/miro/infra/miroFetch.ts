import fetch, { Headers } from 'node-fetch';
import { getEnvVariable } from '../../../utils/context';
import { getThemeColor } from '../../../utils/theme';
import { WorkItem, WorkItemType } from '../../azure/entities/azure.types';
import { getTitleEmoji } from '../../azure/infra/azureFetch';
import { MiroCard } from '../entities/miro.types';

export const MIRO_SCALE = 3;

export const addCard = async (card: MiroCard) => {
  const url = `${getEnvVariable('ATM_MIRO_API_URL')}/boards/${getEnvVariable(
    'ATM_MIRO_BOARD_ID'
  )}/widgets`;

  const headers = new Headers();

  headers.append(
    'Authorization',
    `Bearer ${getEnvVariable('ATM_MIRO_API_KEY')}`
  );
  headers.append('Content-Type', 'application/json; charset=utf8');

  const result = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(card),
  });

  return result.ok;
};

export const adaptTicketToMiroTicket = (
  card: WorkItem,
  url: string,
  x: number,
  y: number,
  theme: string
): MiroCard => {
  const emoji = getTitleEmoji(card.WorkItemType);
  const effort = (card.Effort || card.RemainingWork) ?? 0;
  const effortLabel = effort > 0 ? `(${effort})` : ``;

  return {
    type: 'card',
    title: `<p>${emoji} ${effortLabel} <a href="${url}">#${card.WorkItemId} |  ${card.Title}</a></p>`,
    style: {
      backgroundColor:
        card.WorkItemType === WorkItemType.Bug
          ? getThemeColor(theme, 'BUG')
          : card.State === 'Done'
          ? getThemeColor(theme, 'DONE')
          : getThemeColor(theme, 'TODO'),
    },
    x: x,
    y: y,
    scale: MIRO_SCALE,
  };
};
