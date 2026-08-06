import { useLocale, type Lang } from "../../i18n/Locale";
import "./TermsPage.scss";

type TermsDocument = {
  title: string;
  updated: string;
  notice: string;
  sections: Array<{ title: string; body: string }>;
};

const ko: TermsDocument = {
  title: "AYXX 이용약관",
  updated: "최종 수정일: 2026년 8월 5일",
  notice: "본 문서는 화면 구현을 위한 데모 초안이며 법률 자문이나 최종 약관이 아닙니다. 실제 서비스 공개 전 운영 법인과 관할 지역을 확정하고 전문 법률 검토를 받아야 합니다.",
  sections: [
    { title: "1. 약관의 목적 및 동의", body: "본 약관은 AYXX 웹사이트, 애플리케이션 및 관련 인터페이스(이하 ‘서비스’)의 이용 조건을 정합니다. 서비스를 이용하면 본 약관을 읽고 이해했으며 이에 동의한 것으로 봅니다. 동의하지 않는 경우 서비스를 이용해서는 안 됩니다." },
    { title: "2. 서비스의 성격", body: "AYXX는 디지털 자산 및 블록체인 기반 거래 기능에 접근하기 위한 인터페이스와 도구를 제공합니다. 표시되는 정보는 일반적인 정보일 뿐 투자·법률·세무 또는 재무 자문이 아닙니다." },
    { title: "3. 이용 자격", body: "이용자는 거주지 법률상 성년이고 서비스를 이용할 법적 능력이 있어야 합니다. 관련 법령, 제재 또는 지역 제한에 따라 금지된 사람은 이용할 수 없으며, 자신의 지역에서 이용이 적법한지 직접 확인해야 합니다." },
    { title: "4. 계정, 지갑 및 보안", body: "이용자는 지갑, 개인 키, 복구 문구, 비밀번호 및 API 키를 안전하게 관리해야 합니다. AYXX는 개인 키나 복구 문구를 요청하지 않으며 분실 또는 유출된 인증정보를 복구하지 못할 수 있습니다." },
    { title: "5. 금지 행위", body: "불법 거래, 자금세탁, 사기, 시장 조작, 제재 회피, 타인의 권리 침해, 취약점 악용, 무단 접근 및 서비스의 정상 운영을 방해하는 행위는 금지됩니다." },
    { title: "6. 거래와 디지털 자산의 위험", body: "디지털 자산과 파생상품은 변동성이 높아 원금 전부를 잃을 수 있습니다. 레버리지 거래에는 청산, 슬리피지, 유동성 부족 및 예상과 다른 체결 위험이 있으며 AYXX는 수익이나 자산 가치를 보장하지 않습니다." },
    { title: "7. 수수료 및 네트워크 비용", body: "거래 수수료, 자금 조달 비용, 네트워크 수수료 또는 제3자 비용이 발생할 수 있습니다. 비용은 네트워크 상태와 정책에 따라 변동하며 이미 처리된 비용은 환불되지 않을 수 있습니다." },
    { title: "8. 제3자 서비스와 링크", body: "서비스는 지갑, 블록체인 탐색기 및 데이터 제공자 등 독립적인 제3자 서비스와 연결될 수 있습니다. AYXX는 해당 서비스의 정확성, 가용성, 보안 또는 행위를 보증하지 않습니다." },
    { title: "9. 지식재산권", body: "서비스의 디자인, 상표, 문서, 소프트웨어 및 콘텐츠에 관한 권리는 AYXX 또는 정당한 권리자에게 귀속됩니다. 오픈소스 구성요소에는 각 라이선스가 적용됩니다." },
    { title: "10. 서비스 변경 및 중단", body: "AYXX는 보안, 유지보수, 법적 요구 또는 운영상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다. 통제할 수 없는 네트워크 장애 등으로 서비스가 지연될 수 있습니다." },
    { title: "11. 면책", body: "서비스는 관련 법령이 허용하는 범위에서 현재 상태 및 이용 가능한 상태로 제공됩니다. AYXX는 서비스가 항상 중단 없이 안전하거나 오류 없이 작동한다고 보증하지 않습니다." },
    { title: "12. 책임의 제한", body: "관련 법령이 허용하는 범위에서 AYXX는 간접적·우발적·특별·결과적 손해, 데이터나 수익의 손실 또는 디지털 자산 가치 하락에 책임을 부담하지 않습니다. 법률상 제한할 수 없는 책임은 제외됩니다." },
    { title: "13. 이용 제한 및 종료", body: "약관 위반, 보안 위험, 법적 요구 또는 제재 준수 필요성이 있는 경우 AYXX는 서비스 접근을 제한하거나 종료할 수 있습니다. 이용자는 언제든 이용을 중단할 수 있으며 미결 거래를 직접 확인해야 합니다." },
    { title: "14. 준거법 및 분쟁", body: "본 데모 약관의 준거법, 관할 법원 및 분쟁 해결 절차는 정식 운영 법인과 제공 지역이 확정된 후 정합니다. 분쟁 발생 시 당사자들은 우선 선의로 해결을 협의할 수 있습니다." },
    { title: "15. 문의", body: "본 약관 또는 서비스 문의는 AYXX 지원 채널을 이용해 주십시오. 정식 출시 전 운영 법인명, 소재지 및 법적 문의 이메일이 추가됩니다." },
  ],
};

const en: TermsDocument = {
  title: "AYXX Terms of Use", updated: "Last updated: August 5, 2026",
  notice: "This is a demo draft for interface purposes and is not legal advice or a final agreement. The operating entity and jurisdiction must be confirmed and the document reviewed by qualified counsel before launch.",
  sections: [
    { title: "1. Purpose and Acceptance", body: "These terms govern access to the AYXX website, applications, and related interfaces (the “Services”). By using the Services, you confirm that you have read, understood, and accepted these terms. Do not use the Services if you do not agree." },
    { title: "2. Nature of the Services", body: "AYXX provides interfaces and tools for accessing digital-asset and blockchain-based trading functionality. Information shown through the Services is general information and is not investment, legal, tax, or financial advice." },
    { title: "3. Eligibility", body: "You must be an adult with legal capacity in your jurisdiction. Persons prohibited by applicable law, sanctions, or geographic restrictions may not use the Services. You are responsible for confirming that your use is lawful where you are located." },
    { title: "4. Accounts, Wallets, and Security", body: "You are responsible for securing wallets, private keys, recovery phrases, passwords, and API keys. AYXX will not request private keys or recovery phrases and may be unable to recover lost or compromised credentials." },
    { title: "5. Prohibited Conduct", body: "Illegal trading, money laundering, fraud, market manipulation, sanctions evasion, infringement, exploitation of vulnerabilities, unauthorized access, and interference with the Services are prohibited." },
    { title: "6. Trading and Digital-Asset Risks", body: "Digital assets and derivatives are highly volatile and may result in total loss. Leveraged trading involves liquidation, slippage, limited liquidity, and execution risks. AYXX does not guarantee returns or asset values." },
    { title: "7. Fees and Network Costs", body: "Trading, funding, network, or third-party fees may apply. Costs may vary with network conditions and policies, and fees already processed may be non-refundable." },
    { title: "8. Third-Party Services and Links", body: "The Services may connect to independent wallets, blockchain explorers, data providers, and other third parties. AYXX does not warrant their accuracy, availability, security, or conduct." },
    { title: "9. Intellectual Property", body: "Rights in the Services’ design, trademarks, documentation, software, and content belong to AYXX or their lawful owners. Open-source components remain subject to their respective licenses." },
    { title: "10. Changes and Suspension", body: "AYXX may change or suspend any part of the Services for security, maintenance, legal, or operational reasons. Events outside AYXX’s reasonable control, including network failures, may delay or interrupt access." },
    { title: "11. Disclaimers", body: "To the extent permitted by law, the Services are provided “as is” and “as available.” AYXX does not warrant uninterrupted, secure, or error-free operation." },
    { title: "12. Limitation of Liability", body: "To the extent permitted by law, AYXX is not liable for indirect, incidental, special, or consequential loss, lost data or profits, or a decline in digital-asset value. Liability that cannot lawfully be excluded remains unaffected." },
    { title: "13. Restriction and Termination", body: "AYXX may restrict or terminate access for violations, security risks, legal requirements, or sanctions compliance. You may stop using the Services at any time and remain responsible for reviewing open transactions." },
    { title: "14. Governing Law and Disputes", body: "Governing law, courts, and dispute procedures will be set once the operating entity and service jurisdictions are confirmed. Parties may first attempt to resolve disputes through good-faith discussions." },
    { title: "15. Contact", body: "Use the AYXX support channel for questions about these terms or the Services. The legal entity name, address, and legal contact email will be added before launch." },
  ],
};

const ja: TermsDocument = {
  title: "AYXX 利用規約", updated: "最終更新日：2026年8月5日",
  notice: "本書は画面実装用のデモ草案であり、法的助言または最終規約ではありません。公開前に運営法人と管轄地域を確定し、専門家による法務確認を受ける必要があります。",
  sections: [
    { title: "1. 目的および同意", body: "本規約はAYXXのウェブサイト、アプリケーションおよび関連インターフェース（以下「本サービス」）の利用条件を定めます。本サービスを利用することで、本規約を読み、理解し、同意したものとみなされます。" },
    { title: "2. サービスの性質", body: "AYXXはデジタル資産およびブロックチェーン取引機能へアクセスするためのインターフェースとツールを提供します。表示情報は一般情報であり、投資、法律、税務または財務上の助言ではありません。" },
    { title: "3. 利用資格", body: "利用者は居住地の法律上の成年者で、法的能力を有する必要があります。法令、制裁または地域制限により禁止される者は利用できず、所在地での適法性を自ら確認する責任があります。" },
    { title: "4. アカウント、ウォレットおよびセキュリティ", body: "ウォレット、秘密鍵、リカバリーフレーズ、パスワードおよびAPIキーは利用者が安全に管理します。AYXXは秘密鍵等を要求せず、紛失した認証情報を復旧できない場合があります。" },
    { title: "5. 禁止行為", body: "違法取引、資金洗浄、詐欺、市場操作、制裁回避、権利侵害、脆弱性の悪用、不正アクセスおよびサービス運営の妨害は禁止されます。" },
    { title: "6. 取引およびデジタル資産のリスク", body: "デジタル資産とデリバティブは価格変動が大きく、全額を失う可能性があります。レバレッジ取引には清算、スリッページ、流動性および約定のリスクがあり、AYXXは利益を保証しません。" },
    { title: "7. 手数料およびネットワーク費用", body: "取引、資金調達、ネットワークまたは第三者の費用が発生する場合があります。費用は状況により変動し、処理済みの費用は返金されない場合があります。" },
    { title: "8. 第三者サービスおよびリンク", body: "本サービスは独立したウォレット、ブロックチェーンエクスプローラー、データ提供者等に接続する場合があります。AYXXはその正確性、可用性、安全性または行為を保証しません。" },
    { title: "9. 知的財産権", body: "デザイン、商標、文書、ソフトウェアおよびコンテンツの権利はAYXXまたは正当な権利者に帰属します。オープンソース部分には各ライセンスが適用されます。" },
    { title: "10. 変更および停止", body: "AYXXは安全、保守、法的または運営上の理由により本サービスを変更または停止できます。ネットワーク障害等の合理的に制御できない事象により利用が遅延する場合があります。" },
    { title: "11. 免責事項", body: "法令で認められる範囲で、本サービスは現状有姿かつ提供可能な状態で提供されます。AYXXは中断がなく、安全で、誤りがないことを保証しません。" },
    { title: "12. 責任の制限", body: "法令で認められる範囲で、AYXXは間接的、偶発的、特別または結果的損害、データ・利益の喪失、資産価値の下落について責任を負いません。排除できない責任は除きます。" },
    { title: "13. 利用制限および終了", body: "規約違反、安全上の危険、法的要請または制裁遵守のため、AYXXはアクセスを制限または終了できます。利用者はいつでも利用を終了できますが、未決済取引を確認する責任があります。" },
    { title: "14. 準拠法および紛争", body: "準拠法、裁判所および紛争手続は運営法人と提供地域の確定後に定めます。紛争時には、当事者はまず誠実な協議による解決を試みることができます。" },
    { title: "15. お問い合わせ", body: "本規約または本サービスへの質問はAYXXサポートをご利用ください。正式公開前に法人名、住所および法務連絡先を追加します。" },
  ],
};

const zh: TermsDocument = {
  title: "AYXX 使用条款", updated: "最后更新：2026年8月5日",
  notice: "本文档仅为界面演示草案，不构成法律意见或最终协议。正式上线前应确认运营主体与适用司法管辖区，并由专业法律顾问审核。",
  sections: [
    { title: "1. 目的与接受", body: "本条款适用于AYXX网站、应用程序及相关界面（统称“服务”）。使用服务即表示您已阅读、理解并接受本条款；如不同意，请勿使用服务。" },
    { title: "2. 服务性质", body: "AYXX提供访问数字资产及区块链交易功能的界面和工具。服务中的信息仅供一般参考，不构成投资、法律、税务或财务建议。" },
    { title: "3. 使用资格", body: "您必须达到所在地法定成年年龄并具备法律行为能力。受法律、制裁或地域限制禁止的人士不得使用服务，您有责任确认使用行为在所在地合法。" },
    { title: "4. 账户、钱包与安全", body: "您应妥善保管钱包、私钥、助记词、密码和API密钥。AYXX不会索取私钥或助记词，也可能无法恢复丢失或泄露的凭证。" },
    { title: "5. 禁止行为", body: "禁止非法交易、洗钱、欺诈、操纵市场、规避制裁、侵犯权利、利用漏洞、未经授权访问或干扰服务正常运行。" },
    { title: "6. 交易及数字资产风险", body: "数字资产和衍生品波动剧烈，可能造成全部损失。杠杆交易存在强平、滑点、流动性不足及成交偏差风险，AYXX不保证收益或资产价值。" },
    { title: "7. 费用与网络成本", body: "可能产生交易费、资金费、网络费或第三方费用。费用会随网络状况和政策变化，已处理的费用可能无法退还。" },
    { title: "8. 第三方服务与链接", body: "服务可能连接独立的钱包、区块链浏览器、数据提供商及其他第三方。AYXX不保证其准确性、可用性、安全性或行为。" },
    { title: "9. 知识产权", body: "服务的设计、商标、文档、软件及内容权利归AYXX或合法权利人所有。开源组件仍适用各自的许可证。" },
    { title: "10. 变更与暂停", body: "AYXX可因安全、维护、法律或运营需要变更或暂停全部或部分服务。网络故障等无法合理控制的事件可能导致延迟或中断。" },
    { title: "11. 免责声明", body: "在法律允许的范围内，服务按“现状”和“可用状态”提供。AYXX不保证服务持续、安全或无错误运行。" },
    { title: "12. 责任限制", body: "在法律允许的范围内，AYXX不对间接、附带、特殊或后果性损失、数据或利润损失、数字资产贬值承担责任，但法律不得排除的责任除外。" },
    { title: "13. 限制与终止", body: "因违反条款、安全风险、法律要求或制裁合规，AYXX可限制或终止访问。您可随时停止使用，但应自行检查未完成的交易。" },
    { title: "14. 适用法律与争议", body: "适用法律、管辖法院和争议程序将在运营主体及服务地区确定后制定。发生争议时，各方可先通过善意协商解决。" },
    { title: "15. 联系方式", body: "有关本条款或服务的问题，请使用AYXX支持渠道。正式上线前将补充运营主体名称、地址和法律联系邮箱。" },
  ],
};

const vi: TermsDocument = {
  title: "Điều khoản sử dụng AYXX", updated: "Cập nhật lần cuối: 5 tháng 8, 2026",
  notice: "Đây là bản dự thảo minh họa giao diện, không phải tư vấn pháp lý hay thỏa thuận cuối cùng. Trước khi ra mắt cần xác định pháp nhân vận hành, khu vực tài phán và được luật sư chuyên môn rà soát.",
  sections: [
    { title: "1. Mục đích và chấp thuận", body: "Các điều khoản này điều chỉnh việc truy cập trang web, ứng dụng và giao diện liên quan của AYXX (“Dịch vụ”). Khi sử dụng Dịch vụ, bạn xác nhận đã đọc, hiểu và chấp thuận; nếu không đồng ý, vui lòng không sử dụng." },
    { title: "2. Bản chất của Dịch vụ", body: "AYXX cung cấp giao diện và công cụ để truy cập chức năng giao dịch tài sản số và blockchain. Thông tin hiển thị chỉ mang tính chung, không phải tư vấn đầu tư, pháp lý, thuế hay tài chính." },
    { title: "3. Điều kiện sử dụng", body: "Bạn phải đủ tuổi thành niên và có năng lực pháp lý tại nơi cư trú. Người bị cấm theo pháp luật, lệnh trừng phạt hoặc giới hạn địa lý không được sử dụng; bạn tự chịu trách nhiệm xác nhận tính hợp pháp." },
    { title: "4. Tài khoản, ví và bảo mật", body: "Bạn chịu trách nhiệm bảo vệ ví, khóa riêng, cụm từ khôi phục, mật khẩu và khóa API. AYXX không yêu cầu khóa riêng hoặc cụm từ khôi phục và có thể không khôi phục được thông tin đã mất." },
    { title: "5. Hành vi bị cấm", body: "Nghiêm cấm giao dịch bất hợp pháp, rửa tiền, gian lận, thao túng thị trường, né tránh trừng phạt, xâm phạm quyền, khai thác lỗ hổng, truy cập trái phép và cản trở Dịch vụ." },
    { title: "6. Rủi ro giao dịch và tài sản số", body: "Tài sản số và phái sinh biến động mạnh và có thể mất toàn bộ vốn. Giao dịch đòn bẩy có rủi ro thanh lý, trượt giá, thiếu thanh khoản và khớp lệnh; AYXX không bảo đảm lợi nhuận." },
    { title: "7. Phí và chi phí mạng", body: "Có thể áp dụng phí giao dịch, cấp vốn, mạng hoặc bên thứ ba. Chi phí thay đổi theo điều kiện và chính sách mạng; phí đã xử lý có thể không được hoàn lại." },
    { title: "8. Dịch vụ và liên kết bên thứ ba", body: "Dịch vụ có thể kết nối với ví, trình khám phá blockchain, nhà cung cấp dữ liệu và bên thứ ba độc lập. AYXX không bảo đảm độ chính xác, khả dụng, bảo mật hoặc hành vi của họ." },
    { title: "9. Sở hữu trí tuệ", body: "Quyền đối với thiết kế, nhãn hiệu, tài liệu, phần mềm và nội dung thuộc AYXX hoặc chủ sở hữu hợp pháp. Thành phần nguồn mở tuân theo giấy phép tương ứng." },
    { title: "10. Thay đổi và tạm ngừng", body: "AYXX có thể thay đổi hoặc tạm ngừng Dịch vụ vì lý do bảo mật, bảo trì, pháp lý hoặc vận hành. Sự cố mạng ngoài khả năng kiểm soát hợp lý có thể gây chậm trễ hoặc gián đoạn." },
    { title: "11. Tuyên bố miễn trừ", body: "Trong phạm vi pháp luật cho phép, Dịch vụ được cung cấp theo hiện trạng và mức sẵn có. AYXX không bảo đảm hoạt động liên tục, an toàn hoặc không có lỗi." },
    { title: "12. Giới hạn trách nhiệm", body: "Trong phạm vi pháp luật cho phép, AYXX không chịu trách nhiệm cho thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hệ quả, mất dữ liệu, lợi nhuận hay giảm giá tài sản; trừ trách nhiệm không thể loại trừ." },
    { title: "13. Hạn chế và chấm dứt", body: "AYXX có thể hạn chế hoặc chấm dứt truy cập do vi phạm, rủi ro bảo mật, yêu cầu pháp lý hoặc tuân thủ trừng phạt. Bạn có thể ngừng sử dụng bất cứ lúc nào và phải kiểm tra giao dịch đang mở." },
    { title: "14. Luật áp dụng và tranh chấp", body: "Luật áp dụng, tòa án và thủ tục tranh chấp sẽ được xác định sau khi chốt pháp nhân và khu vực cung cấp. Các bên có thể trước tiên thương lượng thiện chí." },
    { title: "15. Liên hệ", body: "Vui lòng dùng kênh hỗ trợ AYXX cho câu hỏi về điều khoản hoặc Dịch vụ. Tên pháp nhân, địa chỉ và email pháp lý sẽ được bổ sung trước khi ra mắt." },
  ],
};

const fr: TermsDocument = {
  title: "Conditions d’utilisation AYXX", updated: "Dernière mise à jour : 5 août 2026",
  notice: "Ce document est un projet de démonstration destiné à l’interface ; il ne constitue ni un avis juridique ni un accord définitif. L’entité exploitante et les juridictions doivent être confirmées et le texte validé par un conseil juridique avant le lancement.",
  sections: [
    { title: "1. Objet et acceptation", body: "Ces conditions régissent l’accès au site, aux applications et aux interfaces AYXX (les « Services »). En utilisant les Services, vous confirmez les avoir lues, comprises et acceptées. Ne les utilisez pas si vous refusez ces conditions." },
    { title: "2. Nature des Services", body: "AYXX fournit des interfaces et outils d’accès aux fonctions de négociation d’actifs numériques et de blockchain. Les informations affichées sont générales et ne constituent pas un conseil financier, juridique, fiscal ou d’investissement." },
    { title: "3. Éligibilité", body: "Vous devez être majeur et juridiquement capable dans votre pays. Les personnes interdites par la loi, les sanctions ou les restrictions géographiques ne peuvent utiliser les Services. Vous devez vérifier la légalité de votre utilisation." },
    { title: "4. Comptes, portefeuilles et sécurité", body: "Vous devez sécuriser vos portefeuilles, clés privées, phrases de récupération, mots de passe et clés API. AYXX ne demandera jamais vos clés privées et pourra être incapable de récupérer des identifiants perdus." },
    { title: "5. Conduites interdites", body: "Sont interdits le commerce illégal, le blanchiment, la fraude, la manipulation de marché, le contournement de sanctions, l’atteinte aux droits, l’exploitation de failles, l’accès non autorisé et toute perturbation des Services." },
    { title: "6. Risques de négociation", body: "Les actifs numériques et dérivés sont très volatils et peuvent entraîner une perte totale. L’effet de levier comporte des risques de liquidation, glissement, liquidité et exécution. AYXX ne garantit aucun rendement." },
    { title: "7. Frais et coûts de réseau", body: "Des frais de négociation, financement, réseau ou tiers peuvent s’appliquer. Ils varient selon le réseau et les politiques applicables ; les frais déjà traités peuvent être non remboursables." },
    { title: "8. Services tiers et liens", body: "Les Services peuvent se connecter à des portefeuilles, explorateurs de blockchain, fournisseurs de données et autres tiers indépendants. AYXX ne garantit ni leur exactitude, ni leur disponibilité, ni leur sécurité ou conduite." },
    { title: "9. Propriété intellectuelle", body: "Les droits sur la conception, les marques, la documentation, les logiciels et le contenu appartiennent à AYXX ou à leurs titulaires légitimes. Les composants libres restent soumis à leurs licences." },
    { title: "10. Modification et suspension", body: "AYXX peut modifier ou suspendre les Services pour des raisons de sécurité, maintenance, droit ou exploitation. Des événements hors de son contrôle raisonnable, tels qu’une panne réseau, peuvent interrompre l’accès." },
    { title: "11. Exclusions de garantie", body: "Dans les limites légales, les Services sont fournis « en l’état » et « selon disponibilité ». AYXX ne garantit pas un fonctionnement continu, sécurisé ou exempt d’erreurs." },
    { title: "12. Limitation de responsabilité", body: "Dans les limites légales, AYXX n’est pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs, des pertes de données ou profits, ni de la baisse de valeur des actifs, sauf responsabilité non excluable." },
    { title: "13. Restriction et résiliation", body: "AYXX peut restreindre ou résilier l’accès en cas de violation, risque de sécurité, obligation légale ou sanctions. Vous pouvez cesser l’utilisation à tout moment et devez vérifier vos transactions ouvertes." },
    { title: "14. Droit applicable et litiges", body: "Le droit applicable, les tribunaux et procédures seront définis après confirmation de l’entité exploitante et des territoires desservis. Les parties pourront d’abord rechercher une solution amiable de bonne foi." },
    { title: "15. Contact", body: "Utilisez l’assistance AYXX pour toute question sur ces conditions ou les Services. La raison sociale, l’adresse et l’e-mail juridique seront ajoutés avant le lancement." },
  ],
};

const documents: Record<Lang, TermsDocument> = { ko, en, ja, zh, vi, fr };

export function TermsPage() {
  const { lang } = useLocale();
  const document = documents[lang];

  return (
    <main className="terms-page">
      <article className="terms-page__document">
        <header className="terms-page__header">
          <h1>{document.title}</h1>
          <p>{document.updated}</p>
        </header>
        <div className="terms-page__sections">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
