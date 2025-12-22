import { format } from 'date-fns';
import * as locales from 'date-fns/locale';

export function dateFilter(value, lang, dateFormat = 'd MMMM u') {
  const locale = lang !== 'en' ? locales[lang] : undefined;
  const formatted = format(value, dateFormat, { locale });
  return formatted;
}
