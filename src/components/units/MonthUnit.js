import { formatThisMonth } from "../../lib/dates";

import Header from "./Header";
import Unit from "./Unit";

export default function MonthUnit(
  targets,
  onNew,
  onCompleteFactory,
  onDeleteFactory,
) {
  const header = Header(
    `<h2 class="unit__title">${formatThisMonth()} Goals</h2>`,
    onNew,
  );

  return Unit(header, targets, onCompleteFactory, onDeleteFactory);
}
