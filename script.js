(function (d) {
  "use strict";
  const accordionButtons = d.querySelectorAll("button[aria-expanded]");
  const answers = d.querySelectorAll(".js-answer");
  const questions = d.querySelectorAll(".js-question");

  const handleAccordion = (event) => {
    const currentElement = event.currentTarget;

    if (currentElement instanceof HTMLButtonElement) {
      handleButtonClick(currentElement);
    }

    if (currentElement instanceof HTMLHeadingElement) {
      handleHeadingClick(currentElement);
    }

    return;
  };

  const handleButtonClick = (button) => {
    const faqContentWrapper = button.closest(".js-faq-content");
    const answer = faqContentWrapper.querySelector(".js-answer");
    toggleContent(button, answer);
  };

  const handleHeadingClick = (heading) => {
    const faqContentWrapper = heading.closest(".js-faq-content");
    const answer = faqContentWrapper.querySelector(".js-answer");
    const button = faqContentWrapper.querySelector("button[aria-expanded]");
    toggleContent(button, answer);
  };

  const toggleContent = (button, answer) => {
    const buttonIcon = button.querySelector("use");
    const hasButtonIcon = buttonIcon.hasAttribute("href");
    const isAnswerHidden = answer.hasAttribute("hidden");

    if (hasButtonIcon) {
      const currentIcon = buttonIcon.getAttribute("href");
      toggleIcon(currentIcon, buttonIcon);
    }

    if (isAnswerHidden) {
      button.setAttribute("aria-expanded", true);
      answer.hidden = false;
    } else {
      button.setAttribute("aria-expanded", false);
      answer.hidden = true;
    }
  };

  const toggleIcon = (currentIcon, icon) => {
    const MINUS_ICON_COLOR = "#301534";
    const PLUS_ICON_COLOR = "#AD28EB";
    const g = icon.parentElement;

    if (currentIcon === "#minus") {
      icon.setAttribute("href", "#plus");
      g.setAttribute("fill", PLUS_ICON_COLOR);
    } else {
      icon.setAttribute("href", "#minus");
      g.setAttribute("fill", MINUS_ICON_COLOR);
    }
  };

  d.addEventListener("DOMContentLoaded", () => {
    answers.forEach((answer) => (answer.hidden = true));

    // Ideally, all answers are hidden.
    // But to match the design from Frontend Mentor, the first answer is
    // visible during the first visit.
    const firstAnswer = answers[0];
    firstAnswer.hidden = false;

    accordionButtons.forEach((button) => (button.hidden = false));
  });

  accordionButtons.forEach((button) =>
    button.addEventListener("click", handleAccordion)
  );

  questions.forEach((question) =>
    question.addEventListener("click", handleAccordion)
  );
})(document);
