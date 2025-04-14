"use client"
import React, { useId, useRef, useState } from 'react'
import { arrow, FloatingArrow, FloatingPortal, offset, safePolygon, shift, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { AnimatePresence,motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
//   as?: ElementType;
//   initialOpen?: boolean;
//   placement?: Placement;
}

export default function Popover({ children,className, renderPopover }: Props) {
    const arrowRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "bottom-end",
      middleware: [
        arrow({
          element: arrowRef,
        }),
        offset(2),
        shift(),
      ],
    });

    const id = useId();
    const hover = useHover(context, {
      handleClose: safePolygon(),
    });

     const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
    return (
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {renderPopover}
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className="
    fill-white 
    [&>path:first-of-type]:stroke-pink-500
    [&>path:last-of-type]:stroke-white
  "
                />
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    );
}
