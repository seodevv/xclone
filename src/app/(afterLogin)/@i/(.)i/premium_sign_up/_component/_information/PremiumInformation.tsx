import styles from './i.premiumSignUp.information.module.css';
import enhanced from '../_table/enhanced.json';
import creator from '../_table/creator.json';
import verification from '../_table/verification.json';
import customize from '../_table/customization.json';
import PremiumInformationTable from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/PremiumInformationTable';

export default function PremiumInformation() {
  const enhanced_experience = enhanced;
  const creator_hub = creator;
  const verification_security = verification;
  const customization = customize;

  return (
    <div className={styles.information}>
      <div className={styles.title}>
        <span>Compare tiers & features</span>
      </div>
      <PremiumInformationTable
        className={styles.table}
        table={enhanced_experience}
      />
      <PremiumInformationTable className={styles.table} table={creator_hub} />
      <PremiumInformationTable
        className={styles.table}
        table={verification_security}
      />
      <PremiumInformationTable className={styles.table} table={customization} />
    </div>
  );
}
