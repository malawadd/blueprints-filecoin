"use client";

import { ColorForHandle } from "@/app/workflow/_components/nodes/common";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground  !border-background !border-[3px] !border-black !w-4 !h-4 !-right-4 shadow-[2px_2px_0px_black] rounded-none",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
}
