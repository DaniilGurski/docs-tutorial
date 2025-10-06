"use client";

import React from "react";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label: string;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/60"
      )}
    >
      <span className="sr-only"> {label} </span>
      <Icon className="size-4" />
    </button>
  );
};

export default function Toolbar() {
  const { editor } = useEditorStore();

  /* NOTE: this is a matrix */
  const sections: {
    onClick: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    label: string;
  }[][] = [
    [
      {
        onClick: () => editor?.chain().focus().undo().run(),
        icon: Undo2Icon,
        label: "Undo",
      },
      {
        onClick: () => editor?.chain().focus().redo().run(),
        icon: Redo2Icon,
        label: "Redo",
      },
      {
        onClick: () => window.print(),
        icon: PrinterIcon,
        label: "Print",
      },
      {
        onClick: () => {
          // native browser spellcheck
          /* TODO: add suggestions */
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
        icon: SpellCheckIcon,
        label: "Spell Check",
      },
    ],

    [
      {
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
        icon: BoldIcon,
        label: "Bold",
      },
      {
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
        icon: ItalicIcon,
        label: "Italic",
      },
      {
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
        icon: UnderlineIcon,
        label: "Underline",
      },
    ],

    [
      {
        onClick: () => console.log("TODO: comment"),
        isActive: false /* TODO: Enable this functionality */,
        icon: MessageSquarePlusIcon,
        label: "Comment",
      },
      {
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
        icon: ListTodoIcon,
        label: "List Todo",
      },
      {
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        icon: RemoveFormattingIcon,
        label: "Remove Formatting",
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
