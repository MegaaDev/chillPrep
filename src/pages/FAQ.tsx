import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Faqs } from "../data/faq";
declare global {
  type FAQItem = {
    question: string;
    answer: React.ReactNode;
  };
}

const FAQ: React.FC = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto my-12 px-6">
      <h2
        className={`text-3xl font-bold mb-8 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Frequently Asked Questions
        <p className="text-sm font-thin text-[#909090]">
          Answers reflect my personal views{" "}
        </p>
      </h2>

      <div
        className={`rounded-2xl border ${
          theme === "dark"
            ? "border-gray-700 bg-gray-900"
            : "border-gray-200 bg-white"
        } shadow-md`}
      >
        {Faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border-b last:border-b-0 cursor-pointer select-none`}
              onClick={() => toggle(idx)}
            >
              <button
                className={`
                  w-full flex justify-between items-center px-6 py-5
                  ${
                    theme === "dark"
                      ? "text-gray-200 hover:text-blue-400"
                      : "text-gray-900 hover:text-blue-600"
                  }
                  focus:outline-none
                `}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${idx}`}
                id={`faq-header-${idx}`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronRight
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-90 text-blue-500" : "text-gray-400"
                  }`}
                  size={20}
                />
              </button>

              <div
                id={`faq-content-${idx}`}
                role="region"
                aria-labelledby={`faq-header-${idx}`}
                className={`
                  px-6 pb-5 text-sm leading-relaxed transition-max-height duration-500 overflow-hidden
                  ${
                    isOpen
                      ? "max-h-screen opacity-100 pt-2"
                      : "max-h-0 opacity-0"
                  }
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
