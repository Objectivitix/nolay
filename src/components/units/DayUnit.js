import { formatDay } from "../../lib/dates";

import Header from "./Header";
import Unit from "./Unit";

export default function DayUnit(
  num,
  targets,
  onNew,
  onCompleteFactory,
  onDeleteFactory,
) {
  const header = Header(
    `<h2 class="unit__title">Day ${num}</h2>
      <p class="unit__date">${formatDay(num)}</p>`,
    onNew,
  );

  return Unit(header, targets, onCompleteFactory, onDeleteFactory);
}
