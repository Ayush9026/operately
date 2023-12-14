import React from "react";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";

interface FilledButtonProps {
  children: any;
  linkTo?: string;
  onClick?: (e: any) => Promise<boolean>;
  testId?: string;
  size?: "xxs" | "xs" | "sm" | "base" | "lg";
  type?: "primary" | "secondary";
  loading?: boolean;
  bzzzOnClickFailure?: boolean;
}

export function FilledButton(props: FilledButtonProps) {
  const [shake, setShake] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = async (e: any) => {
    if (props.loading) {
      return;
    }

    if (props.linkTo) {
      navigate(props.linkTo);
      return;
    }

    if (props.onClick) {
      const res = await props.onClick(e);

      if (res === false && props.bzzzOnClickFailure) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }
  };

  const klass = className(props.size, props.type, props.loading, shake);

  return (
    <div className={klass} onClick={handleClick} data-test-id={props.testId}>
      {props.children}
      <Spinner active={props.loading} />
    </div>
  );
}

function Spinner({ active }: { active?: boolean }) {
  return (
    <div className="inset-0 flex items-center justify-center absolute">
      {active && <PuffLoader size={24} color="var(--color-accent-1)" />}
    </div>
  );
}

function className(
  size?: "xxs" | "xs" | "sm" | "base" | "lg",
  type?: "primary" | "secondary",
  loading?: boolean,
  shake?: boolean,
) {
  size = size || "base";
  type = type || "primary";

  let result = "relative font-medium transition-all duration-100 text-center";

  if (loading) {
    result += " cursor-default";
  } else {
    result += " cursor-pointer";
  }

  if (size === "xxs") {
    result += " px-2 py-[1px] text-sm rounded-2xl";
  }

  if (size === "xs") {
    result += " px-2.5 py-0.5 text-sm rounded-2xl";
  }

  if (size === "sm") {
    result += " px-3 py-1 text-sm rounded-2xl";
  }

  if (size === "base") {
    result += " px-4 py-1 rounded-3xl";
  }

  if (size === "lg") {
    result += " px-6 py-2 text-lg rounded-3xl";
  }

  if (type === "primary") {
    result += " border-2 border-accent-1 bg-accent-1";
    if (loading) {
      result += " text-content-subtle";
    } else {
      result += " text-white-1";
    }
  }

  if (type === "secondary") {
    result += " border border-surface-outline hover:border-surface-outline ";
    if (loading) {
      result += " text-content-subtle";
    } else {
      result += " text-content-dimmed hover:text-content-accent";
    }
  }

  if (shake) {
    result += " animate-bzzz-wrong";
  }

  return result;
}
