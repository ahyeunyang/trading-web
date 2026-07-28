import { useEffect } from "react";

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="help-modal" role="dialog" aria-modal="true">
      <div className="help-modal__backdrop" onClick={onClose} />

      <div className="help-modal__panel">
        <header className="help-modal__header">
          <div className="field__control">
            <input placeholder="Search for help" aria-label="Search for help" />
            <button className="icon-btn" type="button" aria-label="search">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className="help-modal__content">
          <ul className="help-list">
            <li className="help-list__item">
              <div className="help-list__title">Onboarding</div>
              <div className="help-list__desc">
                General, Onboarding, Withdrawals and Deposits
              </div>
              <div className="help-list__meta">12 articles</div>
            </li>

            <li className="help-list__item">
              <div className="help-list__title">Introduction</div>
              <div className="help-list__desc">Introduction and Overview</div>
              <div className="help-list__meta">2 articles</div>
            </li>

            <li className="help-list__item">
              <div className="help-list__title">Onboarding</div>
              <div className="help-list__desc">
                Onboarding, withdrawals and deposits
              </div>
              <div className="help-list__meta">10 articles</div>
            </li>
          </ul>
        </div>

        <nav className="help-modal__nav" aria-label="help bottom nav">
          <button type="button" aria-label="home">
            Home
          </button>
          <button type="button" aria-label="messages">
            Messages
          </button>
          <button
            type="button"
            aria-current="page"
            className="is-active"
            aria-label="help"
          >
            Help
          </button>
        </nav>
      </div>
    </div>
  );
}

export default HelpModal;
