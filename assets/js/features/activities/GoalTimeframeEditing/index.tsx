import React from "react";

import * as People from "@/models/people";
import * as Timeframes from "@/utils/timeframes";
import * as Icons from "@tabler/icons-react";

import { GoalLink } from "@/features/Feed/shared/GoalLink";
import { Paths } from "@/routes/paths";
import { Link } from "@/components/Link";
import { Activity, ActivityContentGoalTimeframeEditing } from "@/gql";

import RichContent from "@/components/RichContent";
import { isContentEmpty } from "@/components/RichContent/isContentEmpty";

export function htmlTitle() {
  return `Goal timeframe ${extendedOrShortened}`;
}

export function Title({ activity }) {
  return (
    <>
      Timeframe {extendedOrShortened(activity)} by {days(activity)} days
    </>
  );
}

export function Content({ activity }: { activity: Activity }) {
  const content = activity.content as ActivityContentGoalTimeframeEditing;

  const oldTimeframe = Timeframes.parse(content.oldTimeframe);
  const newTimeframe = Timeframes.parse(content.newTimeframe);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 font-medium">
          <div className="border border-stroke-base rounded-md px-2 py-0.5 bg-surface-dimmed font-medium text-sm">
            {Timeframes.format(oldTimeframe)}
          </div>
        </div>

        <Icons.IconArrowRight size={16} />

        <div className="flex items-center gap-1 font-medium">
          <div className="border border-stroke-base rounded-md px-2 py-0.5 bg-surface-dimmed font-medium text-sm">
            {Timeframes.format(newTimeframe)}
          </div>
        </div>
      </div>

      {activity.commentThread && !isContentEmpty(activity.commentThread.message) && (
        <div className="mt-4">
          <RichContent jsonContent={activity.commentThread.message} />
        </div>
      )}
    </div>
  );
}

export function FeedItemTitle({ activity, content, page }) {
  const path = Paths.goalActivityPath(content.goal.id, activity.id);

  return (
    <>
      {People.shortName(activity.author)} <Link to={path}>{extendedOrShortened(activity)} the timeframe</Link> for{" "}
      <GoalLink goal={content.goal} page={page} showOnGoalPage={true} />
    </>
  );
}

function extendedOrShortened(activity: Activity) {
  const content = activity.content as ActivityContentGoalTimeframeEditing;

  const oldTimeframe = Timeframes.parse(content.oldTimeframe);
  const newTimeframe = Timeframes.parse(content.newTimeframe);

  if (Timeframes.compareDuration(oldTimeframe, newTimeframe) === 1) {
    return "extended";
  } else {
    return "shortened";
  }
}

function days(activity: Activity) {
  const content = activity.content as ActivityContentGoalTimeframeEditing;

  const oldTimeframe = Timeframes.parse(content.oldTimeframe);
  const newTimeframe = Timeframes.parse(content.newTimeframe);

  const diff = Timeframes.dayCount(newTimeframe) - Timeframes.dayCount(oldTimeframe);
  return Math.abs(diff);
}
