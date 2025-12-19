import { MaterialBlock as MaterialBlockType } from "@/types";

interface MaterialBlockProps {
  block: MaterialBlockType;
  onClick: (block: MaterialBlockType) => void;
}

export default function MaterialBlock({ block, onClick }: MaterialBlockProps) {
  return (
    <button
      onClick={() => onClick(block)}
      className={`
        w-full rounded-xl p-4 transition-all duration-200
        flex items-center justify-center min-h-[80px]
        text-sm font-medium text-center
        ${block.highlight 
          ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-md' 
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
        }
      `}
    >
      <span className="whitespace-pre-line leading-snug">
        {block.label}
      </span>
    </button>
  );
}
