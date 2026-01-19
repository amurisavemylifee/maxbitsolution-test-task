import type {
  SessionDayGroup,
  SessionDto,
  SessionTimeSlot,
} from "./session.types";

type EntityLookup = Record<number, string>;

type GroupingOptions = {
  entityLookup: EntityLookup;
  fallbackName: string;
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function formatTime(date: Date) {
  return timeFormatter.format(date);
}

function ensureDayGroup(
  map: Map<string, SessionDayGroup>,
  dateKey: string,
  dateLabel: string,
) {
  let group = map.get(dateKey);

  if (!group) {
    group = {
      dateKey,
      dateLabel,
      items: [],
    };
    map.set(dateKey, group);
  }

  return group;
}

export function groupSessionsByDate(
  sessions: SessionDto[],
  entityAccessor: (session: SessionDto) => number,
  { entityLookup, fallbackName }: GroupingOptions,
): SessionDayGroup[] {
  const groups = new Map<string, SessionDayGroup>();
  const entitiesByDate = new Map<
    string,
    Map<number, SessionDayGroup["items"][number]>
  >();

  sessions.forEach((session) => {
    const entityId = entityAccessor(session);
    const entityName = entityLookup[entityId] ?? fallbackName;

    const startDate = new Date(session.startTime);
    const isoString = startDate.toISOString();
    const separatorIndex = isoString.indexOf("T");
    const dateKey =
      separatorIndex === -1 ? isoString : isoString.slice(0, separatorIndex);
    const dateLabel = formatDate(startDate);

    const timeSlot: SessionTimeSlot = {
      id: session.id,
      startTime: session.startTime,
      timeLabel: formatTime(startDate),
    };

    const dayGroup = ensureDayGroup(groups, dateKey, dateLabel);
    let entityGroups = entitiesByDate.get(dateKey);

    if (!entityGroups) {
      entityGroups = new Map();
      entitiesByDate.set(dateKey, entityGroups);
    }

    let entityGroup = entityGroups.get(entityId);

    if (!entityGroup) {
      entityGroup = {
        entityId,
        entityName,
        slots: [],
      };
      dayGroup.items.push(entityGroup);
      entityGroups.set(entityId, entityGroup);
    }

    entityGroup.slots.push(timeSlot);
  });

  const result = Array.from(groups.values());

  result.forEach((dayGroup) => {
    dayGroup.items.sort((a, b) => a.entityName.localeCompare(b.entityName));
    dayGroup.items.forEach((item) => {
      item.slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
  });

  return result.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
}
