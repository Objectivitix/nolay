import { formatWeek } from "../../lib/dates";
import Header from "./Header";
import Unit from "./Unit";

export default function WeekUnit(
  num,
  targets,
  onNew,
  onCompleteFactory,
  onDeleteFactory,
) {
  const header = Header(
    `<h2 class="unit__title">Week ${num}</h2>
      <p class="unit__date">${formatWeek(num)}</p>`,
    onNew,
  );

  return Unit(header, targets, onCompleteFactory, onDeleteFactory);
}
