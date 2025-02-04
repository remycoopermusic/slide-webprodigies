"use client";

import { useMutationData } from "./use-mutation-data";
import { ReactNode, useEffect, useRef, useState } from "react";
import { editKeywords } from "@/actions/automations";
import { Input } from "@/components/ui/input";
import { useClickAway } from "@/hooks/use-click-away";

// too many unexpected behaviors ( 1/ blur on value change , 2/ multiple edit query call unexpectedly)

export const useEditKeyword = (
  automationId: string,
  keywordId: string,
  initialName: string
) => {
  const [editKeywordName, setEditKeywordName] = useState(initialName);
  const [editMode, setEditMode] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending } = useMutationData(
    ["update-keyword"],
    async (data: { name: string }) => {
      return await editKeywords(automationId, data.name, keywordId);
    },
    "automation-info"
  );

  useClickAway(containerRef, () => {
    if (editMode) {
      handleSave();
    }
  });

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);

  const handleSave = () => {
    if (editKeywordName.trim() !== initialName) {
      mutate(
        { name: editKeywordName },
        {
          onSuccess: () => {
            setEditMode(false);
          },
          onError: () => {
            setEditKeywordName(initialName);
            setEditMode(false);
          },
        }
      );
    } else {
      setEditMode(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setEditKeywordName(initialName);
      setEditMode(false);
    }
  };

  const EditContainer = ({ children }: { children: ReactNode }) => {
    const inputWidth =
      Math.min(Math.max(editKeywordName.length || 10, 2), 50) + 1;

    return (
      <div
        ref={containerRef}
        onDoubleClick={() => {
          if (!isPending) {
            setEditMode(true);
          }
        }}
        className="relative"
      >
        {editMode ? (
          <Input
            ref={inputRef}
            value={editKeywordName}
            onBlur={() => console.log("Input blurred")}
            onChange={(e) => {
              setEditKeywordName(e.target.value);
            }}
            onKeyUp={handleKeyDown}
            style={{
              width: `${inputWidth}ch`,
              maxWidth: "50ch",
            }}
            className="p-0 bg-transparent ring-0 border-none outline-none"
            disabled={isPending}
          />
        ) : (
          children
        )}
      </div>
    );
  };

  return {
    EditContainer,
    isEditing: editMode,
    isPending,
    currentValue: editKeywordName,
  };
};
