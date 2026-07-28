import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { HelpHomeIcon, HelpMessagesIcon, HelpQuestionIcon } from "../icons/HelpSupportNavIcons";
import supportAgentGreen from "../../assets/images/support/agent-green.png";
import supportAgentPink from "../../assets/images/support/agent-pink.png";
import supportAgentUnicorn from "../../assets/images/support/agent-unicorn.png";

const initialMessages = [
  { user: "ayxx1kn4...c85y", text: "[LINK REMOVED] Crypto SignalT", tone: "green" },
  { user: "ayxx1kn4...c85y", text: "CryptoSignalT, on tg", tone: "green" },
  { user: "ayxx17m4...tgy9", text: "BTC-Short at 62,328 $", tone: "red" },
  { user: "ayxx1fj8...4hd6", text: "got sandwiched hard here... $@sty dex", tone: "cyan" },
  { user: "ayxx1fj8...4hd6", text: "good way to loose volume", tone: "cyan" },
  { user: "ayxx1jcq...wr7z", text: "i built an app to see all people positions", tone: "green" },
  { user: "ayxx1svq...087x", text: "nexusbot, cc free signals", tone: "violet" },
] as const;

const liveMessages = [
  { user: "ayxx1m8a...p2qs", text: "who is watching BTC right now?", tone: "cyan" },
  { user: "ayxx18k2...m0df", text: "volume is picking up again", tone: "green" },
  { user: "ayxx1r4v...8nsa", text: "waiting for the next candle close", tone: "violet" },
  { user: "ayxx1z72...q4kx", text: "market looks very active today", tone: "red" },
] as const;

export function StatusBar() {
  const { t } = useLocale();
  const [chatState, setChatState] = useState<"closed" | "open" | "minimized">("closed");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpTab, setHelpTab] = useState<"home" | "messages" | "help">("home");
  const [helpQuery, setHelpQuery] = useState("");
  const [isSupportConversation, setIsSupportConversation] = useState(false);
  const [selectedSupportTopic, setSelectedSupportTopic] = useState<string | null>(null);
  const [supportMessage, setSupportMessage] = useState("");
  const [sentSupportMessages, setSentSupportMessages] = useState<string[]>([]);
  const [isConversationMenuOpen, setIsConversationMenuOpen] = useState(false);
  const [isConversationExpanded, setIsConversationExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ user: string; text: string; tone: string }>>([...initialMessages]);
  const messageListRef = useRef<HTMLDivElement>(null);
  const supportComposerRef = useRef<HTMLTextAreaElement>(null);
  const nextMessageRef = useRef(0);
  const helpCollections = [
    ["helpOnboarding", "helpOnboardingDescription", "helpOnboardingCount"],
    ["helpTradingCollection", "helpTradingDescription", "helpTradingCount"],
    ["helpDeveloperDocs", "helpDeveloperDescription", "helpDeveloperCount"],
    ["helpGovernanceCollection", "helpGovernanceDescription", "helpGovernanceCount"],
    ["helpAffiliates", "helpAffiliatesDescription", "helpAffiliatesCount"],
  ] as const;
  const normalizedHelpQuery = helpQuery.trim().toLocaleLowerCase();
  const filteredHelpCollections = helpCollections.filter(([title, description]) =>
    `${t(title)} ${t(description)}`.toLocaleLowerCase().includes(normalizedHelpQuery),
  );
  const canSendSupportMessage = supportMessage.trim().length > 0;

  const sendSupportMessage = () => {
    const message = supportMessage.trim();
    if (!message) return;
    setSentSupportMessages((current) => [...current, message]);
    setSupportMessage("");
    if (supportComposerRef.current) supportComposerRef.current.style.height = "auto";
  };

  const downloadSupportTranscript = () => {
    const transcript = [
      selectedSupportTopic,
      t("supportGuide"),
      t("agentReply"),
      ...sentSupportMessages,
    ].filter(Boolean).join("\n\n");
    const url = URL.createObjectURL(new Blob([transcript], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ayxx-support-transcript.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setIsConversationMenuOpen(false);
  };

  useEffect(() => {
    if (chatState === "closed") return;
    const timer = window.setInterval(() => {
      const next = liveMessages[nextMessageRef.current % liveMessages.length];
      nextMessageRef.current += 1;
      setMessages((current) => [...current.slice(-24), next]);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [chatState]);

  useEffect(() => {
    if (chatState !== "open") return;
    const list = messageListRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [chatState, messages]);

  return (
    <footer className="status">
      <button className="status__live" type="button">
        <i />
        <span>{t("operational")}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5.07692 4.25H4.38462C3.61991 4.25 3 4.86991 3 5.63462V11.8654C3 12.6301 3.61991 13.25 4.38462 13.25H10.6154C11.3801 13.25 12 12.6301 12 11.8654V10.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8.5L13 3.5M13 3.5H9M13 3.5V7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>
      <div className={`status__chat-wrap${chatState === "closed" ? "" : " is-floating"}`}>
        {chatState === "closed" && (
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            onClick={() => setChatState("open")}
          >
            {t("chat")}
          </button>
        )}
        {chatState === "open" && (
          <section className="demo-chat" role="dialog" aria-label={t("globalChat")}>
            <header className="demo-chat__header">
              <button className="demo-chat__header-main" type="button" aria-label={t("minimizeChat")} onClick={() => setChatState("minimized")}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.2 2.5h11.6v8H8.2L5 13v-2.5H2.2v-8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M5 5.4h6M5 7.6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <strong>{t("globalChat")}</strong>
                <i />
                <span>0 {t("online")}</span>
              </button>
              <button type="button" aria-label={t("close")} onClick={() => setChatState("closed")}><CloseIcon /></button>
            </header>

            <div className="demo-chat__messages" ref={messageListRef}>
              {messages.map((message, index) => (
                <p key={`${message.user}-${index}`}>
                  <strong className={`is-${message.tone}`}>{message.user}:</strong>
                  <span>{message.text}</span>
                </p>
              ))}
            </div>

            <div className="demo-chat__unlock">
              <div><strong>{t("unlockChatWithTrades")}</strong><b>0%</b></div>
              <span><i /></span>
              <div><small>{t("tradeVolume")}: US$0</small><small>US$1k {t("unlockAt")}</small></div>
            </div>
          </section>
        )}
        {chatState === "minimized" && (
          <div className="demo-chat-minimized">
            <button className="demo-chat-minimized__main" type="button" onClick={() => setChatState("open")}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2.2 2.5h11.6v8H8.2L5 13v-2.5H2.2v-8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M5 5.4h6M5 7.6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <strong>{t("globalChat")}</strong>
              <i />
              <span>0 {t("online")}</span>
            </button>
            <button type="button" aria-label={t("close")} onClick={() => setChatState("closed")}><CloseIcon /></button>
          </div>
        )}
      </div>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isHelpOpen}
        onClick={() => setIsHelpOpen((current) => !current)}
      >
        {t("helpSupport")}
      </button>
      {isHelpOpen && createPortal(
        <section className={`help-support is-${helpTab}${isSupportConversation ? " has-conversation" : ""}${isConversationExpanded ? " is-expanded" : ""}`} role="dialog" aria-label={t("helpSupport")}>
          {helpTab === "home" && (
            <button className="help-support__close" type="button" aria-label={t("close")} onClick={() => setIsHelpOpen(false)}><CloseIcon /></button>
          )}
          <div className="help-support__scroll">
            {helpTab === "home" && <header className="help-support__hero">
            <div className="help-support__brand-row">
              <strong>AYXX<span>.trade</span></strong>
              <div className="help-support__avatars" aria-label="Support team">
                <img src={supportAgentPink} alt="" />
                <img src={supportAgentUnicorn} alt="" />
                <img src={supportAgentGreen} alt="" />
              </div>
            </div>
            <h2>{t("helpGreeting")}<br />{t("helpQuestion")}</h2>
            </header>}

            <div className="help-support__content">
            {helpTab === "home" && (
              <>
                <button className="help-support__conversation" type="button" onClick={() => setHelpTab("messages")}>
                  <span><strong>{t("startConversation")}</strong><small>{t("replyTime")}</small></span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" clipRule="evenodd" />
                  </svg>
                </button>

                <a className="help-support__card help-support__documentation" href="#" onClick={(event) => event.preventDefault()}>
                  <span>{t("chainDocumentation")}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" aria-hidden="true" viewBox="0 0 16 16">
                    <path fill="currentColor" fillRule="evenodd" d="M3 3.7h4V2H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2h-1.7v2a.3.3 0 0 1-.3.3H3a.3.3 0 0 1-.3-.3V4a.3.3 0 0 1 .3-.3M9.218 3c0 .47.38.85.85.85h1.88L8.296 7.502a.85.85 0 0 0 1.202 1.202l3.652-3.652v1.88a.85.85 0 0 0 1.7 0V3a.85.85 0 0 0-.85-.85h-3.932a.85.85 0 0 0-.85.85" clipRule="evenodd" />
                  </svg>
                </a>

                <a className="help-support__card help-support__status" href="#" onClick={(event) => event.preventDefault()}>
                  <i aria-hidden="true">✓</i>
                  <span><strong>{t("allSystemsOperational")}</strong><small>{t("statusUpdated")}</small></span>
                </a>

                <div className="help-support__card help-support__search">
                  <button className="help-support__search-trigger" type="button" onClick={() => setHelpTab("help")}>
                    <span>{t("searchHelp")}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="7.5" cy="7.5" r="4.625" stroke="currentColor" strokeWidth="1.75" />
                      <path d="M13.3813 14.6187C13.723 14.9604 14.277 14.9604 14.6187 14.6187C14.9604 14.277 14.9604 13.723 14.6187 13.3813L13.3813 14.6187ZM10.3813 11.6187L13.3813 14.6187L14.6187 13.3813L11.6187 10.3813L10.3813 11.6187Z" fill="currentColor" />
                    </svg>
                  </button>
                  <button type="button"><span>{t("helpArticleTrading")}</span><b>›</b></button>
                  <button type="button"><span>{t("helpArticleGovernance")}</span><b>›</b></button>
                  <button type="button"><span>{t("helpArticleLiquidations")}</span><b>›</b></button>
                  <button type="button"><span>{t("helpArticleConnectWallet")}</span><b>›</b></button>
                </div>
              </>
            )}

            {helpTab === "messages" && (
              <div className="help-support__messages-page">
                {!isSupportConversation ? (
                  <>
                    <header className="help-support__tab-header">
                      <h2>{t("messages")}</h2>
                      <button className="help-support__header-close" type="button" aria-label={t("close")} onClick={() => setIsHelpOpen(false)}><CloseIcon /></button>
                    </header>
                    {selectedSupportTopic ? (
                      <div className="help-support__message-list">
                        <button className="help-support__message-preview" type="button" onClick={() => setIsSupportConversation(true)}>
                          <img src={supportAgentPink} alt="" />
                          <span><strong>Hasmik</strong><small>{t("agentReply")}</small></span>
                          <time>9m</time>
                        </button>
                      </div>
                    ) : (
                      <div className="help-support__empty">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4 4.5h16v11H12l-4.5 3.5v-3.5H4v-11Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                          <path d="M8 8h8M8 11h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <strong>{t("noMessages")}</strong>
                        <span>{t("messagesWillAppear")}</span>
                        <button type="button" onClick={() => setIsSupportConversation(true)}>
                          {t("startConversation")}
                          <svg viewBox="0 0 17 16" fill="none" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`help-support__conversation-page${selectedSupportTopic ? " has-thread" : ""}`}>
                    <header>
                      <button type="button" aria-label={t("messages")} onClick={() => setIsSupportConversation(false)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M10.85 3.99984C10.85 4.21984 10.77 4.43984 10.6 4.59984L7.20005 7.99984L10.6 11.3998C10.93 11.7298 10.93 12.2698 10.6 12.5998C10.27 12.9298 9.73005 12.9298 9.40005 12.5998L4.80005 7.99984L9.40005 3.39984C9.73005 3.06984 10.27 3.06984 10.6 3.39984C10.77 3.56984 10.85 3.77984 10.85 3.99984Z" fill="currentColor" />
                        </svg>
                      </button>
                      {selectedSupportTopic ? <img src={supportAgentPink} alt="" /> : <i aria-hidden="true" />}
                      <span><strong>{selectedSupportTopic ? "Hasmik" : "Fin"}</strong><small>{selectedSupportTopic ? t("operational") : t("supportTeamCanHelp")}</small></span>
                      <div className="help-support__conversation-menu">
                        <button
                          type="button"
                          aria-label="More"
                          aria-expanded={isConversationMenuOpen}
                          onClick={() => setIsConversationMenuOpen((current) => !current)}
                        >•••</button>
                        {isConversationMenuOpen && (
                          <div role="menu">
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setIsConversationExpanded((current) => !current);
                                setIsConversationMenuOpen(false);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 7 4.5-4.5m-4 0h4v4M7 9l-4.5 4.5m4 0h-4v-4" /></svg>
                              <span>{t("expandWindow")}</span>
                            </button>
                            <button type="button" role="menuitem" onClick={downloadSupportTranscript}>
                              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.9999 13.6499C4.87949 13.6499 2.3499 11.1203 2.3499 7.9999C2.3499 4.87949 4.87949 2.3499 7.9999 2.3499C11.1203 2.3499 13.6499 4.87949 13.6499 7.9999C13.6499 11.1203 11.1203 13.6499 7.9999 13.6499ZM0.649902 7.9999C0.649902 12.0592 3.94061 15.3499 7.9999 15.3499C12.0592 15.3499 15.3499 12.0592 15.3499 7.9999C15.3499 3.94061 12.0592 0.649902 7.9999 0.649902C3.94061 0.649902 0.649902 3.94061 0.649902 7.9999Z" /><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.39886 11.4677C7.73081 11.7996 8.269 11.7996 8.60094 11.4677L10.9086 9.15999C11.2406 8.82804 11.2406 8.28985 10.9086 7.95791C10.5767 7.62596 10.0385 7.62596 9.70655 7.95791L8.8499 8.81456V5.13314C8.8499 4.6637 8.46934 4.28314 7.9999 4.28314C7.53046 4.28314 7.1499 4.6637 7.1499 5.13314V8.81456L6.29325 7.95791C5.9613 7.62596 5.42312 7.62596 5.09117 7.95791C4.75922 8.28985 4.75922 8.82804 5.09117 9.15999L7.39886 11.4677Z" /></svg>
                              <span>{t("downloadTranscript")}</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <button className="help-support__header-close" type="button" aria-label={t("close")} onClick={() => setIsHelpOpen(false)}><CloseIcon /></button>
                    </header>
                    <div className="help-support__conversation-body">
                      {!selectedSupportTopic ? (
                        <>
                          <p>{t("supportPrompt")}</p>
                          <div className="help-support__bot-message">
                            <span>{t("supportGreeting")}</span>
                            <small>Fin · AI Agent · {t("justNow")}</small>
                          </div>
                          <div className="help-support__quick-replies">
                            {[t("supportOnboard"), t("supportDepositIssue"), t("supportAffiliate"), t("supportGovernance"), t("supportApi"), t("supportBlocked"), t("supportOther")].map((reply) => (
                              <button type="button" key={reply} onClick={() => setSelectedSupportTopic(reply)}>{reply}</button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="help-support__conversation-thread">
                          <div className="is-user">{selectedSupportTopic}</div>
                          <div className="is-agent">{t("supportGuide")}</div>
                          <article>
                            <strong>{t("supportArticleTitle")}</strong>
                            <span>{t("supportArticleDescription")}</span>
                          </article>
                          <p>{t("wasHelpful")}</p>
                          <div className="help-support__new-divider"><span>New</span></div>
                          <div className="help-support__joined"><img src={supportAgentPink} alt="" /><span><strong>Hasmik</strong> {t("joinedConversation")}</span></div>
                          <div className="is-agent">{t("agentReply")}</div>
                          <small>Hasmik · 1m</small>
                          {sentSupportMessages.map((message, index) => (
                            <div className="is-user" key={`${message}-${index}`}>{message}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedSupportTopic && (
                      <form
                        className="help-support__composer"
                        onSubmit={(event) => {
                          event.preventDefault();
                          sendSupportMessage();
                        }}
                      >
                        <textarea
                          ref={supportComposerRef}
                          rows={1}
                          placeholder={t("messagePlaceholder")}
                          value={supportMessage}
                          onChange={(event) => setSupportMessage(event.target.value)}
                          onInput={(event) => {
                            const textarea = event.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = `${textarea.scrollHeight}px`;
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                              event.preventDefault();
                              sendSupportMessage();
                            }
                          }}
                        />
                        <div className="help-support__composer-tools">
                          <button type="button" aria-label="Attach file">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M7.67 2.507a.85.85 0 0 1 0 1.202L3.524 7.855a2.464 2.464 0 0 0 3.485 3.484l5.925-5.926a.836.836 0 0 0-1.181-1.182L5.87 10.113A.85.85 0 0 1 4.669 8.91l5.881-5.88a2.536 2.536 0 0 1 3.585 3.586L8.201 12.55a4.164 4.164 0 0 1-5.889-5.888l.006-.005 4.149-4.15a.85.85 0 0 1 1.202 0Z" clipRule="evenodd" /></svg>
                          </button>
                          <button type="button" aria-label="Emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.525" fill="none" stroke="currentColor" strokeWidth="1.7" /><path fill="currentColor" fillRule="evenodd" d="M5.819 7.536a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2m4.363 0a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2" clipRule="evenodd" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" d="M10 10c-.44.604-1.172 1-2 1s-1.56-.396-2-1" /></svg>
                          </button>
                          <button type="button" aria-label="GIF">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M14.259 3.7h-10a.3.3 0 0 0-.3.3h-1.7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2h1.7a.3.3 0 0 0 .3.3h10a.3.3 0 0 0 .3-.3V4a.3.3 0 0 0-.3-.3m-8.49 3.4a1.9 1.9 0 0 0-.171-.671 1.7 1.7 0 0 0-.418-.57 1.95 1.95 0 0 0-.672-.399 2.7 2.7 0 0 0-.922-.144q-.762 0-1.29.308-.526.309-.8.856-.273.543-.273 1.258v.64q0 .524.136.973.14.445.43.781.29.332.734.52.446.187 1.059.187.574 0 .988-.16.418-.165.684-.441a1.8 1.8 0 0 0 .398-.637q.13-.36.13-.75V7.81H3.64v.903h.93v.234a.84.84 0 0 1-.106.415.8.8 0 0 1-.32.308 1.1 1.1 0 0 1-.54.117q-.394 0-.636-.183a1.07 1.07 0 0 1-.348-.508 2.3 2.3 0 0 1-.105-.723V7.75q0-.66.273-1.02.273-.362.785-.363.204 0 .364.055a.86.86 0 0 1 .48.39.9.9 0 0 1 .102.29h1.25Zm2.329 3.642V5.409H6.812v5.333zM10.62 8.73v2.011H9.336V5.41h3.55v1.032h-2.265V7.73h2.059v1z" clipRule="evenodd" /></svg>
                          </button>
                          <button type="button" aria-label="Voice message">
                            <svg viewBox="-2 -1 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 9C7.66 9 9 7.66 9 6V3C9 1.34 7.66 0 6 0C4.34 0 3 1.34 3 3V6C3 7.66 4.34 9 6 9ZM10.5 5V6C10.5 8.48 8.48 10.5 6 10.5C3.52 10.5 1.5 8.48 1.5 6V5H0V6C0 9.06 2.29 11.58 5.25 11.95V14H6.75V11.95C9.71 11.58 12 9.06 12 6V5H10.5Z" fill="currentColor" /></svg>
                          </button>
                        </div>
                        <button className="help-support__composer-send" type="submit" aria-label="Send" disabled={!canSendSupportMessage}>
                          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 13 10-5L3 3l1 4 5 1-5 1-1 4Z" fill="currentColor" /></svg>
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {helpTab === "help" && (
              <div className="help-support__help-page">
                <header className="help-support__tab-header">
                  <h2>{t("helpCenter")}</h2>
                  <button className="help-support__header-close" type="button" aria-label={t("close")} onClick={() => setIsHelpOpen(false)}><CloseIcon /></button>
                </header>
                <label>
                  <input
                    type="search"
                    placeholder={t("searchHelp")}
                    value={helpQuery}
                    onChange={(event) => setHelpQuery(event.target.value)}
                  />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="7.5" cy="7.5" r="4.625" stroke="currentColor" strokeWidth="1.75" />
                    <path d="M13.3813 14.6187C13.723 14.9604 14.277 14.9604 14.6187 14.6187C14.9604 14.277 14.9604 13.723 14.6187 13.3813L13.3813 14.6187ZM10.3813 11.6187L13.3813 14.6187L14.6187 13.3813L11.6187 10.3813L10.3813 11.6187Z" fill="currentColor" />
                  </svg>
                </label>
                <div className="help-support__collection-scroll">
                  <strong className="help-support__collection-count">{t("helpCollections")}</strong>
                  <div className="help-support__collections">
                    {filteredHelpCollections.map(([title, description, count]) => (
                      <button type="button" key={title}>
                        <span><strong>{t(title)}</strong><span>{t(description)}</span><small>{t(count)}</small></span>
                        <b aria-hidden="true">›</b>
                      </button>
                    ))}
                    {filteredHelpCollections.length === 0 && (
                      <p className="help-support__no-results">{t("noHelpResults")}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>

          {!isSupportConversation && (
            <nav className="help-support__nav">
              {(["home", "messages", "help"] as const).map((tab) => (
                <button className={helpTab === tab ? "is-active" : ""} type="button" key={tab} onClick={() => setHelpTab(tab)}>
                  {tab === "home" ? <HelpHomeIcon /> : tab === "messages" ? <HelpMessagesIcon /> : <HelpQuestionIcon />}
                  <span>{t(tab === "help" ? "helpCenter" : tab)}</span>
                </button>
              ))}
            </nav>
          )}
        </section>,
        document.body,
      )}
      <span className="status__notice">
        <span>{t("openSourceNotice")}</span>
        <button type="button">{t("learnMore")}</button>
      </span>
    </footer>
  );
}
