// components/FAQCard.jsx

import ReactMarkdown from "react-markdown";
import { AnimatedAccordionItem } from "./AnimatedAccordionItem";

export const FAQCard = ({ faq }) => (
  <AnimatedAccordionItem value={faq.id} title={faq.title}>
    {faq.content.map((block, index) => {
      if (typeof block === "string") {
        return (
          <ReactMarkdown key={index} className="prose dark:prose-invert">
            {block}
          </ReactMarkdown>
        );
      }

      if (block.type === "image") {
        return (
          <img
            key={index}
            src={block.src}
            alt={block.alt}
            className="w-full max-w-md mx-auto my-4 rounded-md shadow-md"
          />
        );
      }

      return null;
    })}
  </AnimatedAccordionItem>
);
