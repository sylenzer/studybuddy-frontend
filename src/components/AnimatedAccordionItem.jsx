// components/AnimatedAccordionItem.jsx

import * as Accordion from "@radix-ui/react-accordion";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

export const AnimatedAccordionItem = ({ value, title, children }) => {
  const [open, setOpen] = useState(false);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    height: open ? "auto" : 0,
    config: { tension: 210, friction: 20 },
  });

  return (
    <Accordion.Item
      value={value}
      className="border-b border-border px-4 py-3"
      onOpenChange={setOpen}
    >
      <Accordion.Header className="text-left">
        <Accordion.Trigger className="text-lg font-semibold w-full text-left hover:underline">
          {title}
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content forceMount>
        <animated.div style={styles} className="overflow-hidden mt-2 text-muted-foreground space-y-4 text-base">
          {children}
        </animated.div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
