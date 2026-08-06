import { useState } from "react";
import { useLocale, type Lang } from "../../i18n/Locale";
import { CloseIcon } from "../icons/CloseIcon";
import { BrandLogo } from "../icons/BrandLogo";
import { Modal } from "../ui/Modal";
import { CopyButton } from "../ui/CopyButton";
import ethImage from "../../assets/images/coins/eth.png";
import avaxImage from "../../assets/images/coins/avax.png";
import solImage from "../../assets/images/coins/sol.png";
import usdcImage from "../../assets/images/coins/usdc.png";

type Network = "Ethereum" | "Base" | "Optimism" | "Arbitrum" | "Avalanche" | "Solana";

const networks: Array<{ name: Network; assets: string; tone: string; image?: string }> = [
  { name: "Ethereum", assets: "ETH, USDC", tone: "eth", image: ethImage },
  { name: "Base", assets: "ETH, USDC", tone: "base" },
  { name: "Optimism", assets: "ETH, USDC", tone: "op" },
  { name: "Arbitrum", assets: "ETH, USDC", tone: "arb" },
  { name: "Avalanche", assets: "USDC", tone: "avax", image: avaxImage },
  { name: "Solana", assets: "USDC", tone: "sol", image: solImage },
];

const copy: Record<Lang, { title: string; network: string; supported: string; approved: string; warning: (network: string, assets: string) => string; copyAddress: string }> = {
  ko: { title: "입금", network: "네트워크", supported: "지원되는 자산", approved: "승인됨", warning: (network, assets) => `${network} 네트워크에서 ${assets} 또는 지원되는 자산만 입금하세요. 지원되지 않는 자산을 다른 네트워크로 전송하면 자금 손실(최소 $50, 최대 $100만)이 발생할 수 있습니다.`, copyAddress: "입금 주소 복사" },
  en: { title: "Deposit", network: "Network", supported: "Supported assets", approved: "approved", warning: (network, assets) => `Only deposit ${assets} or supported assets on the ${network} network. Sending unsupported assets or using another network may result in loss of funds (minimum $50, maximum $1M).`, copyAddress: "Copy deposit address" },
  ja: { title: "入金", network: "ネットワーク", supported: "対応資産", approved: "対応", warning: (network, assets) => `${network}ネットワークでは${assets}または対応資産のみを入金してください。未対応資産や別ネットワークへの送金は資金損失につながる場合があります。`, copyAddress: "入金アドレスをコピー" },
  zh: { title: "充值", network: "网络", supported: "支持的资产", approved: "已批准", warning: (network, assets) => `请仅通过${network}网络充值${assets}或支持的资产。发送不支持的资产或使用其他网络可能导致资金损失。`, copyAddress: "复制充值地址" },
  vi: { title: "Nạp tiền", network: "Mạng", supported: "Tài sản được hỗ trợ", approved: "được hỗ trợ", warning: (network, assets) => `Chỉ nạp ${assets} hoặc tài sản được hỗ trợ trên mạng ${network}. Gửi tài sản không được hỗ trợ hay dùng mạng khác có thể làm mất tiền.`, copyAddress: "Sao chép địa chỉ nạp" },
  fr: { title: "Dépôt", network: "Réseau", supported: "Actifs pris en charge", approved: "approuvés", warning: (network, assets) => `Déposez uniquement ${assets} ou des actifs pris en charge sur le réseau ${network}. Un actif ou réseau non pris en charge peut entraîner une perte de fonds.`, copyAddress: "Copier l’adresse de dépôt" },
};

const depositAddress = "0xb195841805c5650C91ca6Bc661C4EAd75cD1571a";

function NetworkIcon({ image, name, tone }: { image?: string; name: Network; tone: string }) {
  if (image) return <img className="deposit-wallet-modal__network-image" src={image} alt={`${name} symbol`} />;
  return <span className={`deposit-wallet-modal__network-mark is-${tone}`}>{tone === "op" ? "OP" : tone.slice(0, 1).toUpperCase()}</span>;
}

function DepositQr() {
  const modules = Array.from({ length: 21 * 21 }, (_, index) => {
    const x = index % 21;
    const y = Math.floor(index / 21);
    const inFinder = (x < 6 && y < 6) || (x > 14 && y < 6) || (x < 6 && y > 14);
    const inCenter = x >= 7 && x <= 13 && y >= 7 && y <= 13;
    if (inFinder || inCenter || (x * 7 + y * 11 + x * y) % 5 > 1) return null;
    return <rect key={index} x={x * 6 + 17} y={y * 6 + 17} width="4" height="4" rx="1" />;
  });

  return (
    <svg className="deposit-wallet-modal__qr" viewBox="0 0 160 160" aria-label="Deposit QR code">
      <g fill="currentColor">{modules}</g>
      {[[16, 16], [112, 16], [16, 112]].map(([x, y]) => <g key={`${x}-${y}`} fill="none" stroke="currentColor" strokeWidth="6"><rect x={x} y={y} width="32" height="32" rx="5" /><rect x={x + 9} y={y + 9} width="14" height="14" rx="2" fill="currentColor" stroke="none" /></g>)}
      <BrandLogo className="deposit-wallet-modal__brand" x="61.1" y="59.7" width="37.8" height="40.6" />
    </svg>
  );
}

export function DepositModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLocale();
  const text = copy[lang];
  const [network, setNetwork] = useState<Network>("Ethereum");
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const selected = networks.find((item) => item.name === network) ?? networks[0];

  return (
    <Modal className="deposit-wallet-modal" backdropClassName="deposit-wallet-modal__backdrop" labelledBy="deposit-wallet-modal-title" onClose={onClose}>
      <header className="deposit-wallet-modal__header">
        <h2 id="deposit-wallet-modal-title">{text.title}</h2>
        <button type="button" aria-label="Close" onClick={onClose}><CloseIcon /></button>
      </header>
      <div className="deposit-wallet-modal__body">
        <div className="deposit-wallet-modal__network-wrap">
          <button className="deposit-wallet-modal__select" type="button" aria-expanded={isNetworkOpen} onClick={() => setIsNetworkOpen((open) => !open)}>
            <span><small>{text.network}</small><strong>{network}</strong></span><i />
          </button>
          {isNetworkOpen && (
            <div className="deposit-wallet-modal__network-menu">
              {networks.map((item) => (
                <button type="button" key={item.name} onClick={() => { setNetwork(item.name); setIsNetworkOpen(false); }}>
                  <span><strong>{item.name}</strong><small>{item.assets} {text.approved}</small></span>
                  <NetworkIcon image={item.image} name={item.name} tone={item.tone} />
                </button>
              ))}
            </div>
          )}
        </div>
        <section className="deposit-wallet-modal__card">
          <div className="deposit-wallet-modal__details">
            <small>{text.supported}</small>
            <div className="deposit-wallet-modal__assets">
              {selected.assets.includes("ETH") && <img src={ethImage} alt="ETH" />}
              <img src={usdcImage} alt="USDC" />
            </div>
            <div className="deposit-wallet-modal__address">
              <strong>{depositAddress.slice(0, 14)}<br />{depositAddress.slice(14, 28)}<br />{depositAddress.slice(28)}</strong>
              <CopyButton value={depositAddress} label={text.copyAddress} />
            </div>
          </div>
          <DepositQr />
        </section>
        <p className="deposit-wallet-modal__warning">{text.warning(network, selected.assets)}</p>
      </div>
    </Modal>
  );
}
