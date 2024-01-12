import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends Error {
  httpCode = StatusCodes.NOT_FOUND;

  constructor(docType) {
    switch (docType) {
      case 'movie':
        super('Не найден фильм');
        return;
      case 'user':
        super('Не найден пользователь');
        return;
      case 'path':
        super('Не найден путь');
        return;
      default:
        super('Не найден элемент');
        
    }
  }
}
