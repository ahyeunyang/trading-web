import { useLocale, type Lang } from "../../i18n/Locale";

type PrivacyDocument = {
  title: string;
  updated: string;
  sections: Array<{ title: string; body: string }>;
};

const ko: PrivacyDocument = {
  title: "AYXX 개인정보 보호정책", updated: "최종 수정일: 2026년 8월 5일",
  sections: [
    { title: "1. 정책의 적용 범위", body: "본 정책은 AYXX 웹사이트, 애플리케이션 및 관련 서비스 이용 과정에서 처리되는 개인정보에 적용됩니다. 독립적인 제3자 서비스에는 해당 사업자의 개인정보 보호정책이 적용됩니다." },
    { title: "2. 수집하는 정보", body: "AYXX는 지갑 주소, 기기·브라우저 정보, IP 주소, 접속 기록, 서비스 이용 내역, 설정 및 고객지원 문의 내용을 수집할 수 있습니다. 서비스 운영에 필요하지 않은 개인 키나 복구 문구는 수집하지 않습니다." },
    { title: "3. 정보 수집 방법", body: "정보는 이용자가 직접 제공하거나 서비스를 이용할 때 자동으로 생성될 수 있으며, 법률이 허용하는 범위에서 분석·보안·인프라 제공업체 등으로부터 받을 수 있습니다." },
    { title: "4. 정보 이용 목적", body: "정보는 서비스 제공과 개선, 거래 인터페이스 운영, 보안 및 사기 방지, 고객지원, 법적 의무 준수, 오류 분석과 이용 통계 작성에 사용됩니다." },
    { title: "5. 처리의 법적 근거", body: "관할 법률에 따라 계약 이행, 법적 의무 준수, 정당한 이익, 동의 또는 이용자와 공공의 중요한 이익을 근거로 개인정보를 처리할 수 있습니다." },
    { title: "6. 정보의 공유", body: "AYXX는 호스팅, 분석, 보안, 고객지원 및 규정 준수를 지원하는 서비스 제공업체와 필요한 범위에서 정보를 공유할 수 있습니다. 법적 요청, 조직 개편 또는 권리 보호를 위해 공개할 수도 있습니다." },
    { title: "7. 쿠키 및 유사 기술", body: "로그인 상태 유지, 환경설정 저장, 보안 및 이용 분석을 위해 쿠키와 유사 기술을 사용할 수 있습니다. 브라우저 설정에서 쿠키를 제한할 수 있으나 일부 기능이 정상 작동하지 않을 수 있습니다." },
    { title: "8. 보관 기간", body: "개인정보는 수집 목적 달성, 법적 의무 이행, 분쟁 해결 및 권리 보호에 필요한 기간 동안 보관한 후 삭제하거나 익명화합니다. 정보 유형과 법적 요구에 따라 기간이 달라질 수 있습니다." },
    { title: "9. 보안", body: "AYXX는 개인정보를 보호하기 위해 합리적인 기술적·관리적 조치를 적용합니다. 다만 인터넷이나 블록체인을 통한 전송 및 저장의 절대적인 안전을 보장할 수는 없습니다." },
    { title: "10. 국제 이전", body: "서비스 제공 과정에서 정보가 거주 국가 외 지역에서 처리될 수 있습니다. 필요한 경우 표준계약조항 등 관련 법률이 요구하는 보호조치를 적용합니다." },
    { title: "11. 이용자의 권리", body: "관할 법률에 따라 개인정보의 열람, 정정, 삭제, 이동, 처리 제한 또는 반대, 동의 철회를 요청할 수 있습니다. 신원 확인과 법적 예외에 따라 요청이 제한될 수 있습니다." },
    { title: "12. 아동의 개인정보", body: "서비스는 법정 성년 미만의 아동을 대상으로 하지 않습니다. 아동의 개인정보가 수집된 사실을 알게 된 경우 합리적인 절차에 따라 삭제합니다." },
    { title: "13. 정책의 변경", body: "서비스 또는 법률의 변경을 반영하여 본 정책을 수정할 수 있습니다. 중요한 변경은 서비스 내 공지 등 합리적인 방법으로 안내하며 상단의 수정일을 갱신합니다." },
    { title: "14. 문의", body: "개인정보 처리 또는 권리 행사에 관한 문의는 AYXX 지원 채널을 이용해 주십시오. 정식 출시 전 운영 법인명, 주소 및 개인정보 문의 이메일이 추가됩니다." },
  ],
};

const en: PrivacyDocument = {
  title: "AYXX Privacy Policy", updated: "Last updated: August 5, 2026",
  sections: [
    { title: "1. Scope", body: "This policy applies to personal information processed through AYXX websites, applications, and related services. Independent third-party services are governed by their own privacy policies." },
    { title: "2. Information We Collect", body: "AYXX may collect wallet addresses, device and browser data, IP addresses, access logs, usage activity, preferences, and support communications. We do not collect private keys or recovery phrases that are unnecessary to operate the Services." },
    { title: "3. How We Collect Information", body: "Information may be provided directly by you, generated automatically through use of the Services, or received from analytics, security, and infrastructure providers where permitted by law." },
    { title: "4. How We Use Information", body: "We use information to provide and improve the Services, operate trading interfaces, maintain security, prevent fraud, provide support, comply with law, diagnose errors, and prepare usage statistics." },
    { title: "5. Legal Bases", body: "Depending on applicable law, processing may be based on performance of a contract, legal obligations, legitimate interests, consent, or protection of important individual and public interests." },
    { title: "6. Sharing Information", body: "AYXX may share necessary information with providers supporting hosting, analytics, security, support, and compliance. Information may also be disclosed for lawful requests, corporate transactions, or protection of rights." },
    { title: "7. Cookies and Similar Technologies", body: "We may use cookies and similar technologies for sessions, preferences, security, and analytics. You can restrict cookies in your browser, but some features may not function properly." },
    { title: "8. Retention", body: "We retain personal information as needed for its collection purpose, legal compliance, disputes, and protection of rights, then delete or anonymize it. Retention periods vary by data type and legal requirement." },
    { title: "9. Security", body: "AYXX applies reasonable technical and organizational safeguards. However, no transmission or storage system, including the internet and blockchain networks, can be guaranteed absolutely secure." },
    { title: "10. International Transfers", body: "Information may be processed outside your country. Where required, we use safeguards recognized by applicable law, such as standard contractual clauses." },
    { title: "11. Your Rights", body: "Subject to local law, you may request access, correction, deletion, portability, restriction or objection to processing, and withdrawal of consent. Requests may be limited by identity verification and legal exceptions." },
    { title: "12. Children", body: "The Services are not directed to persons below the legal age of majority. If we learn that a child’s personal information was collected, we will take reasonable steps to delete it." },
    { title: "13. Changes to This Policy", body: "We may update this policy for changes to the Services or law. Material changes will be communicated by reasonable means and the updated date above will be revised." },
    { title: "14. Contact", body: "Contact AYXX support with privacy questions or rights requests. The operating entity name, address, and privacy contact email will be added before launch." },
  ],
};

const ja: PrivacyDocument = {
  title: "AYXX プライバシーポリシー", updated: "最終更新日：2026年8月5日",
  sections: [
    { title: "1. 適用範囲", body: "本ポリシーはAYXXのウェブサイト、アプリケーションおよび関連サービスで処理される個人情報に適用されます。独立した第三者サービスには各事業者のポリシーが適用されます。" },
    { title: "2. 収集する情報", body: "ウォレットアドレス、端末・ブラウザ情報、IPアドレス、アクセス記録、利用履歴、設定およびサポートへの連絡内容を収集する場合があります。秘密鍵やリカバリーフレーズは収集しません。" },
    { title: "3. 収集方法", body: "情報は利用者から直接提供されるほか、サービス利用時に自動生成され、法令の範囲内で分析、セキュリティ、インフラ提供者から取得する場合があります。" },
    { title: "4. 利用目的", body: "サービスの提供・改善、取引画面の運営、セキュリティ、不正防止、サポート、法令遵守、障害分析および利用統計のために使用します。" },
    { title: "5. 処理の法的根拠", body: "適用法に応じて、契約の履行、法的義務、正当な利益、同意または重要な個人・公共の利益を根拠に処理します。" },
    { title: "6. 情報の共有", body: "ホスティング、分析、セキュリティ、サポートおよびコンプライアンス提供者と必要な情報を共有できます。法的要請、組織再編または権利保護のために開示する場合もあります。" },
    { title: "7. Cookie等", body: "セッション、設定、セキュリティおよび分析のためCookie等を使用できます。ブラウザで制限できますが、一部機能が正常に動作しない場合があります。" },
    { title: "8. 保存期間", body: "収集目的、法的義務、紛争および権利保護に必要な期間保存し、その後削除または匿名化します。期間は情報の種類と法的要件により異なります。" },
    { title: "9. セキュリティ", body: "AYXXは合理的な技術的・組織的対策を講じますが、インターネットやブロックチェーンを含む送信・保存の絶対的な安全性は保証できません。" },
    { title: "10. 国際移転", body: "情報は居住国外で処理される場合があります。必要に応じて標準契約条項など適用法上の保護措置を使用します。" },
    { title: "11. 利用者の権利", body: "現地法に従い、開示、訂正、削除、移転、制限、異議申立てまたは同意撤回を請求できます。本人確認や法的例外により制限される場合があります。" },
    { title: "12. 子どもの情報", body: "本サービスは法定成年未満を対象としません。子どもの個人情報を収集したと判明した場合、合理的な手続で削除します。" },
    { title: "13. ポリシーの変更", body: "サービスまたは法令の変更に応じて本ポリシーを更新できます。重要な変更は合理的な方法で通知し、上記更新日を変更します。" },
    { title: "14. お問い合わせ", body: "プライバシーに関する質問や権利請求はAYXXサポートへお問い合わせください。公開前に法人名、住所および連絡先メールを追加します。" },
  ],
};

const zh: PrivacyDocument = {
  title: "AYXX 隐私政策", updated: "最后更新：2026年8月5日",
  sections: [
    { title: "1. 适用范围", body: "本政策适用于AYXX网站、应用程序及相关服务处理的个人信息。独立第三方服务适用其各自的隐私政策。" },
    { title: "2. 我们收集的信息", body: "我们可能收集钱包地址、设备与浏览器信息、IP地址、访问日志、使用记录、偏好及客服通信。我们不会收集运营服务不需要的私钥或助记词。" },
    { title: "3. 收集方式", body: "信息可能由您直接提供、在使用服务时自动生成，或在法律允许范围内由分析、安全和基础设施提供商提供。" },
    { title: "4. 使用目的", body: "信息用于提供和改进服务、运行交易界面、保障安全、防止欺诈、提供支持、履行法律义务、分析错误及生成使用统计。" },
    { title: "5. 处理的法律依据", body: "根据适用法律，我们可能基于履行合同、法定义务、合法利益、同意或保护个人及公共重要利益处理信息。" },
    { title: "6. 信息共享", body: "AYXX可与托管、分析、安全、客服和合规服务商共享必要信息，也可能为合法要求、企业交易或保护权利而披露。" },
    { title: "7. Cookie及类似技术", body: "我们可能为会话、偏好、安全和分析使用Cookie等技术。您可在浏览器中限制Cookie，但部分功能可能无法正常使用。" },
    { title: "8. 保留期限", body: "我们在实现收集目的、遵守法律、解决争议及保护权利所需期间保留信息，随后删除或匿名化。期限因信息类型和法律要求而异。" },
    { title: "9. 安全", body: "AYXX采取合理的技术和管理措施，但无法保证互联网或区块链中的传输与存储绝对安全。" },
    { title: "10. 跨境传输", body: "信息可能在您所在国家以外处理。必要时我们会采用标准合同条款等适用法律认可的保护措施。" },
    { title: "11. 您的权利", body: "依当地法律，您可请求访问、更正、删除、转移、限制或反对处理，以及撤回同意。请求可能受身份验证和法律例外限制。" },
    { title: "12. 儿童信息", body: "服务不面向未达到法定成年年龄的人士。如发现收集了儿童个人信息，我们会采取合理措施删除。" },
    { title: "13. 政策变更", body: "我们可因服务或法律变化更新本政策。重大变更将以合理方式通知，并更新上述日期。" },
    { title: "14. 联系我们", body: "隐私问题或权利请求请联系AYXX支持。正式上线前将补充运营主体名称、地址和隐私联系邮箱。" },
  ],
};

const vi: PrivacyDocument = {
  title: "Chính sách quyền riêng tư AYXX", updated: "Cập nhật lần cuối: 5 tháng 8, 2026",
  sections: [
    { title: "1. Phạm vi", body: "Chính sách này áp dụng cho thông tin cá nhân được xử lý qua trang web, ứng dụng và dịch vụ liên quan của AYXX. Dịch vụ bên thứ ba độc lập tuân theo chính sách riêng của họ." },
    { title: "2. Thông tin chúng tôi thu thập", body: "Chúng tôi có thể thu thập địa chỉ ví, dữ liệu thiết bị và trình duyệt, IP, nhật ký truy cập, hoạt động, tùy chọn và trao đổi hỗ trợ. Chúng tôi không thu thập khóa riêng hay cụm từ khôi phục không cần thiết." },
    { title: "3. Cách thu thập", body: "Thông tin có thể do bạn cung cấp, được tạo tự động khi sử dụng Dịch vụ hoặc nhận từ nhà cung cấp phân tích, bảo mật và hạ tầng khi pháp luật cho phép." },
    { title: "4. Mục đích sử dụng", body: "Thông tin được dùng để cung cấp và cải thiện Dịch vụ, vận hành giao diện giao dịch, bảo mật, chống gian lận, hỗ trợ, tuân thủ pháp luật, phân tích lỗi và thống kê." },
    { title: "5. Cơ sở pháp lý", body: "Tùy luật áp dụng, việc xử lý dựa trên thực hiện hợp đồng, nghĩa vụ pháp lý, lợi ích chính đáng, sự đồng ý hoặc bảo vệ lợi ích quan trọng." },
    { title: "6. Chia sẻ thông tin", body: "AYXX có thể chia sẻ thông tin cần thiết với nhà cung cấp lưu trữ, phân tích, bảo mật, hỗ trợ và tuân thủ; hoặc tiết lộ theo yêu cầu pháp lý, giao dịch doanh nghiệp hay bảo vệ quyền." },
    { title: "7. Cookie và công nghệ tương tự", body: "Chúng tôi có thể dùng cookie cho phiên, tùy chọn, bảo mật và phân tích. Bạn có thể hạn chế cookie trong trình duyệt nhưng một số tính năng có thể không hoạt động." },
    { title: "8. Thời gian lưu giữ", body: "Thông tin được lưu trong thời gian cần thiết cho mục đích thu thập, nghĩa vụ pháp lý, tranh chấp và bảo vệ quyền, sau đó được xóa hoặc ẩn danh." },
    { title: "9. Bảo mật", body: "AYXX áp dụng biện pháp kỹ thuật và tổ chức hợp lý, nhưng không hệ thống truyền hoặc lưu trữ nào, kể cả internet và blockchain, được bảo đảm an toàn tuyệt đối." },
    { title: "10. Chuyển dữ liệu quốc tế", body: "Thông tin có thể được xử lý ngoài quốc gia của bạn. Khi cần, chúng tôi áp dụng biện pháp bảo vệ được luật công nhận, như điều khoản hợp đồng tiêu chuẩn." },
    { title: "11. Quyền của bạn", body: "Theo luật địa phương, bạn có thể yêu cầu truy cập, sửa, xóa, chuyển, hạn chế, phản đối xử lý hoặc rút lại đồng ý. Yêu cầu có thể bị giới hạn bởi xác minh và ngoại lệ pháp lý." },
    { title: "12. Trẻ em", body: "Dịch vụ không dành cho người dưới tuổi thành niên. Nếu biết đã thu thập thông tin của trẻ em, chúng tôi sẽ thực hiện bước hợp lý để xóa." },
    { title: "13. Thay đổi chính sách", body: "Chúng tôi có thể cập nhật chính sách khi Dịch vụ hoặc pháp luật thay đổi. Thay đổi quan trọng sẽ được thông báo hợp lý và ngày cập nhật sẽ được sửa." },
    { title: "14. Liên hệ", body: "Liên hệ hỗ trợ AYXX về quyền riêng tư hoặc yêu cầu quyền. Tên pháp nhân, địa chỉ và email riêng tư sẽ được thêm trước khi ra mắt." },
  ],
};

const fr: PrivacyDocument = {
  title: "Politique de confidentialité AYXX", updated: "Dernière mise à jour : 5 août 2026",
  sections: [
    { title: "1. Champ d’application", body: "Cette politique s’applique aux données personnelles traitées via les sites, applications et services AYXX. Les services tiers indépendants sont régis par leurs propres politiques." },
    { title: "2. Informations collectées", body: "Nous pouvons collecter adresses de portefeuille, données d’appareil et navigateur, IP, journaux, activité, préférences et échanges avec l’assistance. Nous ne collectons pas les clés privées ou phrases de récupération inutiles." },
    { title: "3. Mode de collecte", body: "Les informations peuvent être fournies par vous, générées automatiquement ou reçues de fournisseurs d’analyse, sécurité et infrastructure lorsque la loi le permet." },
    { title: "4. Utilisation des informations", body: "Elles servent à fournir et améliorer les Services, exploiter les interfaces, assurer la sécurité, prévenir la fraude, assister les utilisateurs, respecter la loi, analyser les erreurs et établir des statistiques." },
    { title: "5. Bases juridiques", body: "Selon la loi applicable, le traitement repose sur le contrat, une obligation légale, l’intérêt légitime, le consentement ou la protection d’intérêts importants." },
    { title: "6. Partage", body: "AYXX peut partager les données nécessaires avec des prestataires d’hébergement, analyse, sécurité, assistance et conformité, ou les divulguer pour une demande légale, une opération d’entreprise ou la protection de droits." },
    { title: "7. Cookies", body: "Nous pouvons utiliser des cookies pour les sessions, préférences, sécurité et analyses. Vous pouvez les limiter dans votre navigateur, mais certaines fonctions pourraient ne plus fonctionner." },
    { title: "8. Conservation", body: "Les données sont conservées le temps nécessaire aux finalités, obligations légales, litiges et protection des droits, puis supprimées ou anonymisées. La durée dépend du type de données." },
    { title: "9. Sécurité", body: "AYXX applique des mesures techniques et organisationnelles raisonnables, mais aucune transmission ou conservation, y compris sur internet ou blockchain, ne peut être garantie totalement sûre." },
    { title: "10. Transferts internationaux", body: "Les données peuvent être traitées hors de votre pays. Si nécessaire, nous utilisons des garanties reconnues, comme les clauses contractuelles types." },
    { title: "11. Vos droits", body: "Selon la loi locale, vous pouvez demander accès, rectification, suppression, portabilité, limitation, opposition ou retrait du consentement. L’identité et les exceptions légales peuvent limiter ces demandes." },
    { title: "12. Enfants", body: "Les Services ne visent pas les personnes n’ayant pas l’âge légal de majorité. Si nous apprenons avoir collecté les données d’un enfant, nous prendrons des mesures raisonnables pour les supprimer." },
    { title: "13. Modifications", body: "Nous pouvons mettre à jour cette politique selon l’évolution des Services ou du droit. Les changements importants seront communiqués raisonnablement et la date ci-dessus sera révisée." },
    { title: "14. Contact", body: "Contactez l’assistance AYXX pour toute question ou demande liée à la confidentialité. Le nom, l’adresse et l’e-mail de l’entité seront ajoutés avant le lancement." },
  ],
};

const documents: Record<Lang, PrivacyDocument> = { ko, en, ja, zh, vi, fr };

export function PrivacyPage() {
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
