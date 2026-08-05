import { useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { Modal } from "../ui/Modal";
import { CheckboxField } from "../ui/CheckboxField";

const copy: Record<Lang, {
  title: string; description: string; address: string; create: string; empty: string;
  newTitle: string; newDescription: string; walletAddress: string; privateKey: string;
  warning: string; approve: string; copyLabel: string;
}> = {
  ko: { title: "API 거래 키", description: "API 지갑은 인출 권한 없이 귀하의 계정을 대신하여 작업을 수행합니다. 정보 요청을 위해 계정의 공개 주소를 계속 사용해야 합니다.", address: "AYXX 주소", create: "새 API 키 생성", empty: "API 거래 키를 찾을 수 없습니다.", newTitle: "새 API 거래 키", newDescription: "이 API 지갑이 귀하를 대신하여 거래하도록 승인하세요. 승인하기 전에 개인 키를 안전한 곳에 저장하세요. 승인되면 더 이상 액세스할 수 없습니다.", walletAddress: "API 지갑 주소", privateKey: "개인 키", warning: "승인되면 더 이상 개인 키에 액세스할 수 없음을 이해합니다. 또한 이 키에 액세스할 수 있는 사람은 누구나 내 계정의 전체 마진을 사용하여 거래를 할 수 있음을 이해합니다.", approve: "API 키 승인", copyLabel: "복사" },
  en: { title: "API Trading Keys", description: "API wallets act on behalf of your account without withdrawal permission. Continue using your account’s public address for information requests.", address: "AYXX Address", create: "Create New API Key", empty: "No API trading keys found.", newTitle: "New API Trading Key", newDescription: "Authorize this API wallet to trade on your behalf. Save the private key securely before approval. You cannot access it again after approval.", walletAddress: "API Wallet Address", privateKey: "Private Key", warning: "I understand that I cannot access the private key again after approval and that anyone with this key can trade using the full margin of my account.", approve: "Approve API Key", copyLabel: "Copy" },
  ja: { title: "API取引キー", description: "APIウォレットは出金権限なしでアカウントを代理して操作します。情報照会にはアカウントの公開アドレスを引き続き使用してください。", address: "AYXXアドレス", create: "新しいAPIキーを作成", empty: "API取引キーがありません。", newTitle: "新しいAPI取引キー", newDescription: "このAPIウォレットが代理で取引することを承認します。承認前に秘密鍵を安全に保存してください。承認後は再表示できません。", walletAddress: "APIウォレットアドレス", privateKey: "秘密鍵", warning: "承認後は秘密鍵に再度アクセスできず、この鍵を持つ人がアカウントの全証拠金を使用して取引できることを理解します。", approve: "APIキーを承認", copyLabel: "コピー" },
  zh: { title: "API交易密钥", description: "API钱包可在没有提现权限的情况下代表您的账户执行操作。查询信息时请继续使用账户公开地址。", address: "AYXX地址", create: "创建新API密钥", empty: "未找到API交易密钥。", newTitle: "新API交易密钥", newDescription: "授权此API钱包代表您交易。批准前请将私钥安全保存；批准后将无法再次访问。", walletAddress: "API钱包地址", privateKey: "私钥", warning: "我了解批准后无法再次访问私钥，任何持有此密钥的人都可使用我账户的全部保证金进行交易。", approve: "批准API密钥", copyLabel: "复制" },
  vi: { title: "Khóa giao dịch API", description: "Ví API thay mặt tài khoản thực hiện tác vụ mà không có quyền rút tiền. Hãy tiếp tục dùng địa chỉ công khai của tài khoản để yêu cầu thông tin.", address: "Địa chỉ AYXX", create: "Tạo khóa API mới", empty: "Không tìm thấy khóa giao dịch API.", newTitle: "Khóa giao dịch API mới", newDescription: "Cho phép ví API này giao dịch thay bạn. Hãy lưu khóa riêng ở nơi an toàn trước khi duyệt; sau đó bạn không thể truy cập lại.", walletAddress: "Địa chỉ ví API", privateKey: "Khóa riêng", warning: "Tôi hiểu rằng không thể truy cập lại khóa riêng sau khi duyệt và bất kỳ ai có khóa đều có thể giao dịch bằng toàn bộ ký quỹ trong tài khoản.", approve: "Duyệt khóa API", copyLabel: "Sao chép" },
  fr: { title: "Clés de trading API", description: "Les portefeuilles API agissent pour votre compte sans droit de retrait. Continuez à utiliser l’adresse publique du compte pour les demandes d’information.", address: "Adresse AYXX", create: "Créer une clé API", empty: "Aucune clé de trading API trouvée.", newTitle: "Nouvelle clé de trading API", newDescription: "Autorisez ce portefeuille API à négocier pour vous. Enregistrez la clé privée en lieu sûr avant validation ; elle ne sera plus accessible ensuite.", walletAddress: "Adresse du portefeuille API", privateKey: "Clé privée", warning: "Je comprends que la clé privée ne sera plus accessible après validation et que toute personne la possédant pourra négocier avec la totalité de la marge du compte.", approve: "Valider la clé API", copyLabel: "Copier" },
};

const accountAddress = "ayxx1ygq9v2m4r7k8n3x6c8ah";
const apiAddress = "ayxx1qu28z3yjmujp2hnhp9wfn02rz033ntlk83fw";
const privateKey = "0x803d5ac0c43fb8f2f69ld072e357d491bd268ad2";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1600);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <button className={`api-keys-modal__copy${isCopied ? " is-copied" : ""}`} type="button" aria-label={label} onClick={() => void copyValue()}>
      {isCopied ? (
        <svg viewBox="0 0 17 17" fill="none" aria-hidden="true"><path d="m3.5 8.7 3.1 3.1 6.9-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : (
        <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.5004 6.40039H8.40039C7.29582 6.40039 6.40039 7.29582 6.40039 8.40039V13.5004C6.40039 14.605 7.29582 15.5004 8.40039 15.5004H13.5004C14.605 15.5004 15.5004 14.605 15.5004 13.5004V8.40039C15.5004 7.29582 14.605 6.40039 13.5004 6.40039Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M3.6 10.6H2.9C2.1268 10.6 1.5 9.9732 1.5 9.2V2.9C1.5 2.1268 2.1268 1.5 2.9 1.5H9.2C9.9732 1.5 10.6 2.1268 10.6 2.9V3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
      )}
    </button>
  );
}

export function ApiKeysModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLocale();
  const text = copy[lang];
  const [step, setStep] = useState<"list" | "create">("list");
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const approveKey = () => {
    if (!isAcknowledged || isApproving) return;
    setIsApproving(true);
    window.setTimeout(() => {
      setIsAcknowledged(false);
      setIsApproving(false);
      setStep("list");
    }, 1400);
  };

  return (
    <Modal className="api-keys-modal" backdropClassName="api-keys-modal__backdrop" labelledBy="api-keys-modal-title" onClose={onClose}>
      <header className="api-keys-modal__header">
        <div>
          {step === "create" && <button className="api-keys-modal__back" type="button" aria-label="Back" onClick={() => setStep("list")}><svg viewBox="0 0 11 19" fill="none" aria-hidden="true"><path d="M9.5 2 2.70711 8.79289a1 1 0 0 0 0 1.41421L9.5 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></button>}
          <h2 id="api-keys-modal-title">{step === "list" ? text.title : text.newTitle}</h2>
        </div>
        <button className="api-keys-modal__close" type="button" aria-label="Close" onClick={onClose}><CloseIcon /></button>
      </header>

      {step === "list" ? (
        <>
          <p className="api-keys-modal__description">{text.description}</p>
          <div className="api-keys-modal__toolbar">
            <div className="api-keys-modal__value"><span>{text.address}</span><strong>{accountAddress.slice(0, 9)}...{accountAddress.slice(-4)}</strong><CopyButton value={accountAddress} label={text.copyLabel} /></div>
            <button className="api-keys-modal__create" type="button" onClick={() => setStep("create")}>{text.create}</button>
          </div>
          <div className="api-keys-modal__list">
            <p>{text.empty}</p>
          </div>
        </>
      ) : (
        <>
          <p className="api-keys-modal__description">{text.newDescription}</p>
          <div className="api-keys-modal__fields">
            <div className="api-keys-modal__value"><span>{text.walletAddress}</span><strong>{apiAddress}</strong><CopyButton value={apiAddress} label={text.copyLabel} /></div>
            <div className="api-keys-modal__value is-private"><span>{text.privateKey}</span><strong>{privateKey}</strong><CopyButton value={privateKey} label={text.copyLabel} /></div>
          </div>
          <CheckboxField className="api-keys-modal__warning" checked={isAcknowledged} label={text.warning} onChange={setIsAcknowledged} />
          <button
            className={`btn btn--primary btn--full api-keys-modal__approve${isApproving ? " is-loading" : ""}`}
            type="button"
            disabled={!isAcknowledged || isApproving}
            aria-live="polite"
            onClick={approveKey}
          >
            {isApproving ? <span className="api-keys-modal__loader" aria-label="Loading"><i /><i /><i /></span> : text.approve}
          </button>
        </>
      )}
    </Modal>
  );
}
