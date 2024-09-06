import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    touched?: boolean;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, touched, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 mb-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            error && touched && "mb-1 border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && touched && (
          <p className="text-xs font-medium text-red-500 pl-3 mb-2">
            {error}
          </p>
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
